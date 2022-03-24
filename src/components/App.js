import "../css/App.css";
import { useEffect, useState } from "react";
import { PokemonList } from "./PokemonList";
import { Loader } from "./Loader";

// cache only stores 20 first pokemons
const getCachedPokemons = () => JSON.parse(localStorage.getItem("pokemonList"));

const fetchPokemons = async (url) => {
    console.log("fetching pokemons");

    const response = await fetch(url).catch((error) => console.error(error));
    if (!response.ok) {
        console.error(response);
        return null;
    }
    const data = await response.json();

    let detailedResults = await Promise.all(
        data.results.map((pokemon) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                .then((response) => response.json())
                .catch((error) => console.error(error))
        )
    );
    console.log(detailedResults);
    return detailedResults;
};

function App() {
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [pokemons, setPokemonList] = useState(getCachedPokemons() || []);

    const loadMorePokemons = async () => {
        console.log("fetching more pokemons");
        const offset = pokemons.length;
        setLoadingMore(true);

        const newPokemons = await fetchPokemons(
            `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`
        );

        setPokemonList((list) => [...list, ...newPokemons]);
        setLoadingMore(false);
    };

    useEffect(() => {
        const cachedPokemons = getCachedPokemons();
        if (!cachedPokemons) {
            setLoading(true);
            fetchPokemons(`https://pokeapi.co/api/v2/pokemon`).then(
                (result) => {
                    localStorage.setItem("pokemonList", JSON.stringify(result));
                    setPokemonList(result);
                    setLoading(false);
                }
            );
        }
    }, [setLoading, setPokemonList]);

    return (
        <div className="container">
            <h1 className="title">Pokedex</h1>
            {loading ? <Loader /> : <PokemonList list={pokemons} />}

            <div className="footer">
                {loadingMore ? (
                    <Loader />
                ) : (
                    <button className="loadButton" onClick={loadMorePokemons}>
                        load more
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
