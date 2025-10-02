import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import resolve from "./resolveIngredients.js";

// Enables searching through recipes by name, description, effects, and ingredients
// Accepts a list of recipes
// Returns the current query, a function to set the query, the filtered list of recipes,
// the fuse instance for advanced usage, and the indexed list used for searching
export default function recipeSearch(recipes = []) {
    // Query state to hold the current search input
    const [query, setQuery] = useState("");

    // Memoize the fuse instance and indexed list based on the recipes prop
    // Make safeRecipes based on if there are recipes or not
    // map through all the recipes to create a list for fuse
    // for each recipe, gather all the ingredients into a single array based on the type of ingredient field
    // resolve our ingredients to get their names and other data
    // return our recipe along with name, description, effects, and a new field ingredientsText 
    // which is an array of ingredient names
    const { fuse, indexedList } = useMemo(() => {
        const safeRecipes = Array.isArray(recipes) ? recipes : [];

        const list = safeRecipes.map((recipe, idx) => {
            const allIngredients = [];

            if (Array.isArray(recipe.ingredients)) {
                for (const ing of recipe.ingredients) {
                const resolved = resolve(ing);
                if (resolved && resolved.name) allIngredients.push(resolved.name);
                }
            }

            if (recipe.ingredient1) {
                const ing = recipe.ingredient1;
                const resolved = ing.name ? ing : resolve(ing);
                if (resolved && resolved.name) allIngredients.push(resolved.name);
            }

            if (Array.isArray(recipe.ingredient2)) {
                for (const ing of recipe.ingredient2) {
                const resolved = ing.name ? ing : resolve(ing);
                if (resolved && resolved.name) allIngredients.push(resolved.name);
                }
            }

            return {
                recipe,
                name: recipe.name || "",
                description: recipe.description || "",
                effects: recipe.effects || "",
                ingredientsText: allIngredients, // ✅ CHANGE: array for extended search
                __idx: idx,
            };
        });

        // Set the fuse options
        // Set keys with name, description, effects, and ingredientsText
        // Use extended search for ingredientsText to allow exact matches
        // Adjust threshold for fuzziness as needed
        // fuuzzyness set to 0.35 to allow for some typos but not too many
        //returns our new fuse instance and indexed list
        const options = {
            keys: [
                { name: "name", weight: 0.7 },
                { name: "description", weight: 0.2 },
                { name: "effects", weight: 0.2 },
                { name: "ingredientsText", weight: 0.6 },
            ],
            includeScore: true,
            threshold: 0.35,            
            useExtendedSearch: true,     
        };

        return { fuse: new Fuse(list, options), indexedList: list };
    }, [recipes]);


    // Memoize the filtered results based on the query
    // If query is empty, return all recipes
    // Otherwise, perform a search using fuse and return the matched recipes
    const filtered = useMemo(() => {
        const q = (query || "").trim();
        if (!q) return recipes || [];

        const searchQuery = {
        $or: [
            { name: q },
            { description: q },
            { effects: q },
            { ingredientsText: `'${q}` },
        ],
        };

        const results = fuse.search(searchQuery);
        return results.map((result) => result.item.recipe);
    }, [fuse, recipes, query]);

    // Return the query, setQuery function, filtered results, fuse instance, and indexed list for use elsewhere
    return { query, setQuery, filtered, fuse, indexedList };
}
