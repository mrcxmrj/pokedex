import "./App.css";
import { useEffect, useState } from "react";

// cache only stores 20 first pokemons
const getCachedPokemons = () => JSON.parse(localStorage.getItem("pokemonList"));

function App() {
    const [loading, setLoading] = useState(false);
    const [pokemonList, setPokemonList] = useState(getCachedPokemons());

    const fetchMorePokemons = async () => {
        console.log("fetching more pokemons");
        const offset = pokemonList.length;
        setLoading(true);
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`
        );
        if (!response.ok) throw response;
        const data = await response.json();

        setPokemonList((list) => [...list, ...data.results]);
        setLoading(false);
        return data.results;
    };

    useEffect(() => {
        console.log("fetching pokemons");
        const cachedPokemons = getCachedPokemons();
        if (!cachedPokemons) {
            fetch(`https://pokeapi.co/api/v2/pokemon`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw response;
                    }
                })
                .then((data) => {
                    console.log(data.results.length);
                    localStorage.setItem("pokemonList", JSON.stringify(data));
                    setPokemonList(data.results);
                })
                .catch((error) => console.error(error));
        }
    }, [setLoading, setPokemonList]);

    return (
        <div className="container">
            <h1>Pokedex</h1>
            <div className="list">
                <Searchbox />
                <ul>
                    {pokemonList.map((el) => (
                        <li key={el.name}>
                            <Pokemon text={JSON.stringify(el)} />
                        </li>
                    ))}
                    {loading ? (
                        "loading..."
                    ) : (
                        <button onClick={fetchMorePokemons}>load more</button>
                    )}
                </ul>
            </div>
        </div>
    );
}

const Pokemon = (props) => {
    return <>{props.text}</>;
};

const Searchbox = (props) => {
    return <>search, sort by</>;
};

export default App;
