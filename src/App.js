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
            <h1>Pokedex</h1>
            <div className="list">
                {loading ? "loading..." : <PokemonList list={pokemons} />}

                {loadingMore ? (
                    "loading..."
                ) : (
                    <button onClick={loadMorePokemons}>load more</button>
                )}
            </div>
        </div>
    );
}

//sortBy === "" || "name" || "type"
const PokemonList = ({ list }) => {
    const [sortBy, setSortBy] = useState("");

    const sortList = (listToSort) => {
        console.log("sorting");
        switch (sortBy) {
            case "name":
                console.log(list);
                return listToSort.sort((a, b) =>
                    a[sortBy].localeCompare(b[sortBy])
                );
            case "type":
                return listToSort.sort((a, b) =>
                    a.types[0].type.name.localeCompare(b.types[0].type.name)
                );
            default:
                return listToSort;
        }
        /* if (sortBy !== "default") {
            //sorts the list by comparing either name or type property alphabetically
            if (sortBy === "name") {
                list.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
            } else {
                list.sort((a, b) =>
                    a.types[0].type.name.localeCompare(b.types[0].type.name)
                );
            }
        } */
    };

    return (
        <ul>
            sort by:
            <select onChange={(e) => setSortBy(e.target.value)}>
                <option value={""} hidden>
                    -
                </option>
                <option value={"name"}>name</option>
                <option value={"type"}>type</option>
            </select>
            {sortList(list).map((el) => (
                <li key={el.name}>
                    <Pokemon
                        name={el.name}
                        sprite={el.sprites.front_default}
                        types={el.types
                            .map((typesElement) => typesElement.type.name)
                            .join(", ")}
                        height={el.height}
                        weight={el.weight}
                    />
                </li>
            ))}
        </ul>
    );
};

const Pokemon = (props) => {
    //make sprites small when unclicked, make them scale with height when clicked (add a ruler next to the sprite)
    //maybe animate the enlargement
    return (
        <div style={{ display: "flex" }}>
            <div className="textbox">
                <h2>{props.name}</h2>
                type: {props.types}
            </div>{" "}
            <img src={props.sprite} alt="" />
        </div>
    );
};

//probably not necessary
/* const Searchbox = (props) => {
    return <>search, sort by</>;
}; */

export default App;
