import { useState } from "react";
import { Pokemon } from "./Pokemon";
import "../css/PokemonList.css";

//sortBy === "" || "name" || "type"
export const PokemonList = ({ list }) => {
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
    };

    return (
        <div className="content">
            <ul className="pokemonList">
                <label htmlFor="sortSelect">sort by:</label>
                <select
                    id="sortSelect"
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value={""} hidden>
                        -
                    </option>
                    <option value={"name"}>name</option>
                    <option value={"type"}>type</option>
                </select>
                {sortList(list).map((el) => (
                    <li key={el.name} className="pokemonListElement">
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
        </div>
    );
};
