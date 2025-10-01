import { useState, useRef } from "react";
import Popper from "@mui/material/Popper";
import { ingredients as skyIngredients } from "../data/skywarddata.js";
import { ingredients as echoesIngredients } from "../data/echoesdata.js";

export default function HoverPopup2({ recipe }) {
    //state and refs for popper
    const [openIndex, setOpenIndex] = useState(null);
    const anchorRefs = useRef([]);

    const setAnchorRef = (el, i) => {
        anchorRefs.current[i] = el;
    };

    //resolve function to get full ingredient details from id or return null if not found
    //flow as follows:
    /* 
        pass in an entry to resolve. Can be a full entry or an id only
        if there is no entry return null
        if the entry isnt of type object return null
        if the entry has a name property return the entry as is (assumed full)
        if the entry id is not undefined
            check if the entry has a source property
                if source is Skyward, search skyIngredients for a matching id and return it or null if not found
                if source is Echoes, search echoesIngredients for a matching id and return it or null if not found
            if no source is specified, search skyIngredients and echoesIngredients for a matching id
                if found in both, log a warning and return the skyward version
                if found in one, return that one
                if not found in either, return null
        if none of the above conditions are met, return null
    */
    const resolve = (entry) => {
        if (!entry) return null;
        if (typeof entry !== "object") return null;
        if (entry.name) return entry;
        if (entry.id !== undefined) {
            if (entry.source === "Skyward" ) {
                return skyIngredients?.find((i) => i.id === entry.id) || null;
            }
            if (entry.source === "Echoes") {
                return echoesIngredients?.find((i) => i.id === entry.id) || null;
            }
            
            const skyMatch = skyIngredients?.find((i) => i.id === entry.id);
            const echoesMatch = echoesIngredients?.find((i) => i.id === entry.id);

            if (skyMatch && echoesMatch && skyMatch !== echoesMatch) {
                console.warn(
                    `Warning: Ingredient ID ${entry.id} found in both Skyward and Echoes datasets. Using Skyward version.`
                )            
            }
            return skyMatch || echoesMatch || null;
        }
        return null;
    };

    // normalize lists (keep compact entries if present so qty is preserved)
    const listA = Array.isArray(recipe?.ingredient2) ? recipe.ingredient2 : [];
    const listB = Array.isArray(recipe?.ingredients) ? recipe.ingredients : [];
    const combined = [...listA, ...listB];

    //return statement for popups
    /*flow as follows:
      Check if combined is non-empty, if so render a ul
      map over combined and for each item and index:
        resolve the item to get full details
        determine the displayname (via resolved name, item name or fallback to stringifyed name)
        return the jsx for the list:
            create a li with the key, ref, mouse handlers and basic styling set up
            display the item name via display name and quantity if present
            create a popper that is open on mouseEnter and closed on mouseLeave
                inside the popper, display the resolved name
                display the resolved description if available
                display the resolved image if available
                display the quantity if available
                display the cost if available, with special handling for 0 cost to indicate non-purchasable
                display the sell price if available, with special handling for 0 sell to indicate non-sellable
                display the location if available
                display the shop if available
        */
    return (
        <>
            {combined.length > 0 && (
                <ul className="ingredient-list" style={{ margin: 0, paddingLeft: "1.25rem" }}>
                    {combined.map((item, idx) => {
                        const resolved = resolve(item);
                        const displayName = resolved ? resolved.name : item.name || String(item);
                        return (
                            <li
                                key={`${item?.id ?? `i-${idx}`}-${idx}`}
                                ref={(el) => setAnchorRef(el, idx)}
                                onMouseEnter={() => setOpenIndex(idx)}
                                onMouseLeave={() => setOpenIndex(null)}
                                className="font-bold text-blue-600 cursor-pointer"
                                style={{ display: "list-item", marginBottom: 6 }}
                            >
                                {displayName}
                                {item && item.qty ? <span className="small-muted"> ×{item.qty}</span> : null}
                                <Popper open={openIndex === idx} anchorEl={anchorRefs.current[idx]} placement="bottom-start">
                                    <div className="popper-content bg-white border-gray-300 rounded-md shadow-lg p-4 w-64">
                                        <div className="font-bold mb-2">{displayName}</div>
                                        <div className="mb-2">{resolved ? resolved.description : ""}</div>
                                        {resolved && resolved.image ? (
                                            <div className="mb-2">
                                                <img
                                                    src={resolved.image}
                                                    alt={displayName}
                                                    style={{ width: "50%", height: "auto", borderRadius: 4, display: "block", margin: "0 auto" }}
                                                />
                                            </div>
                                        ) : (
                                            null
                                        )}
                                        <div className="text-xs text-gray-500">
                                            {item && item.qty ? <div>Qty: {item.qty}</div> : null}
                                            {resolved && resolved.cost !== undefined ? (
                                                resolved.cost === 0 ? (
                                                    <div className="italic text-gray-400">This item cannot be purchased.</div>
                                                ) : (
                                                    <div>Cost: {resolved.cost} rupees</div>
                                                )
                                            ) : null}
                                            {resolved && resolved.sell !== 0 ? 
                                            (
                                                <div>Sell: {resolved.sell} rupees</div> 
                                            ) : ( 
                                                <div className="italic text-gray-400">This item cannot be sold.</div>
                                            )}
                                            {resolved && resolved.location ?
                                            (
                                                <div>Location: {resolved.location}</div>
                                            ) : (
                                                null
                                            )}
                                            {resolved && resolved.shop ?
                                            (
                                                <div>Shop: {resolved.shop}</div>
                                            ) : (
                                                null
                                            )}
                                        </div>
                                    </div>
                                </Popper>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}