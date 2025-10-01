import { useState, useRef } from "react";
import Popper from "@mui/material/Popper";

export default function HoverPopup({ recipe }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  return (
    <>
      <span
        ref={anchorRef}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="font-bold text-blue-600 cursor-pointer"
      >
        {recipe.ingredient1.name}
      </span>

      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start">
        <div className="popper-content bg-white border-gray-300 rounded-md shadow-lg p-4 w-64">
          <div className="font-bold mb-2">{recipe.ingredient1.name}</div>
          <div className="mb-2">{recipe.ingredient1.description}</div>
          <div className="text-xs text-gray-500">
            {recipe.ingredient1.cost === 0 ?  <div className="italic text-gray-400">This item cannot be purchased. </div> : <div> Cost: {recipe.ingredient1.cost} rupees </div>}
            <div>Sell: {recipe.ingredient1.sell} rupees</div>
          </div>
        </div>
      </Popper>
    </>
  );
}
