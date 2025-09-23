import Header from '../components/Header.jsx'
import { echoesRecipes } from '../data/echoesdata.js'
import Recipes from '../components/Recipies.jsx'

export default function Echoes() {
    return (
        <>
            <Header />
            <Recipes recipes={echoesRecipes} />
            <h4> Echoes of Wisdom </h4>
        </>
    )
}