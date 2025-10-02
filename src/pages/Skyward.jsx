import Header from '../components/Header.jsx'
import { skywardPotions } from '../data/skywarddata.js'
import Recipes from '../components/Recipies.jsx'
import Memo from '../components/memo.jsx'
import SearchBar from '../components/recipeSearch.jsx'

export default function Skyward() {
    return (
        <>
            <Header />
            <Memo />
            <Recipes recipes={skywardPotions} />
        </>
    )
}