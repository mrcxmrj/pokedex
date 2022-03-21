import "./App.css";
import { useEffect, useState } from "react";

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
    const [pokemonList, setPokemonList] = useState(getCachedPokemons() || []);

    const loadMorePokemons = async () => {
        console.log("fetching more pokemons");
        const offset = pokemonList.length;
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
                    setPokemonList(result);
                    setLoading(false);
                }
            );
        }
    }, [setLoading, setPokemonList]);

    return (
        <div className="container">
            <h1>Pokedex</h1>
            <div className="list">
                <Searchbox />
                <ul>
                    {loading
                        ? "loading..."
                        : pokemonList.map((el) => (
                              <li key={el.name}>
                                  <Pokemon
                                      name={el.name}
                                      sprite={el.sprite}
                                      type={el.type}
                                      height={el.height}
                                      weight={el.height}
                                  />
                              </li>
                          ))}
                    {loadingMore ? (
                        "loading..."
                    ) : (
                        <button onClick={loadMorePokemons}>load more</button>
                    )}
                </ul>
            </div>
        </div>
    );
}

const Pokemon = (props) => {
    return (
        <>
            name: {props.name}, type: {props.types}{" "}
            <img src={props.sprite} alt="" />
        </>
    );
};

const Searchbox = (props) => {
    return <>search, sort by</>;
};

export default App;
