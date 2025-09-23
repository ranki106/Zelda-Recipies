import Header from '../components/Header.jsx'
import { tearsRecipes } from '../data/tearsData.js'
import Recipes from '../components/Recipies.jsx'

export default function Tears() {
    return (
        <>
            <Header />
            <Recipes recipes={tearsRecipes} />
            <h4> Tears of the Kingdom </h4>

        </>
    )
}