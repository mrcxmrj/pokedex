import "./App.css";
import { useEffect, useState } from "react";

const getCachedPokemons = () => JSON.parse(localStorage.getItem("pokemonList"));

function App() {
    const [loading, setLoading] = useState(false);
    const [pokemonList, setPokemonList] = useState(getCachedPokemons());

    useEffect(() => {
        const cachedPokemons = getCachedPokemons();

        if (!cachedPokemons) {
            setLoading(true);
            fetch("https://pokeapi.co/api/v2/pokemon")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw response;
                    }
                })
                .then((data) => {
                    console.log(data);
                    localStorage.setItem("pokemonList", JSON.stringify(data));
                    setPokemonList(data.results);
                    setLoading(false);
                })
                .catch((error) => console.error(error));
        }
    }, [setLoading, setPokemonList]);

    return loading ? (
        "loading..."
    ) : (
        <div className="container">
            <h1>Pokedex</h1>
            <div className="list">
                <Searchbox />
                <ul>
                    <li>
                        <Pokemon />
                    </li>
                    <li>
                        <Pokemon />
                    </li>
                    <li>
                        <Pokemon />
                    </li>
                </ul>
                {JSON.stringify(pokemonList)}
                <button>load more</button>
            </div>
        </div>
    );
}

const Pokemon = (props) => {
    return <>name, type, sprite</>;
};

const Searchbox = (props) => {
    return <>search, sort by</>;
};

export default App;
