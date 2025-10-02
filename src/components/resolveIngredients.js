import { ingredients as skyIngredients } from "../data/skywarddata";
import { ingredients as echoesIngredients } from "../data/echoesdata";

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

export default resolve;