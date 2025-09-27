import Header from '../components/Header.jsx'

export default function Home() {
    return (
        <>
            <Header />
            <h4 className="text-5xl font-bold underline"> Home Page </h4>
            <p className='text-2xl font-bold text-gray-700'> Welcome to the Zelda Recipe Site! Select a game from the menu above to view recipes. </p>
        </>
    )
}