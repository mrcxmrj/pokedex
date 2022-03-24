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

    const toggleTheme = () => {
        const r = document.querySelector(":root");

        if (r.style.getPropertyValue("--background-color") === "#fff") {
            r.style.setProperty("--primary-color", "#EEEEEE");
            r.style.setProperty("--secondary-color", "#393E46");
            r.style.setProperty("--background-color", "#222831");
        } else {
            r.style.setProperty("--primary-color", "#000");
            r.style.setProperty("--secondary-color", "#cfcfcf");
            r.style.setProperty("--background-color", "#fff");
        }
    };

    return (
        <div className="content">
            <ul className="pokemonList">
                <div className="settingBar">
                    <div>
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
                    </div>
                    <div>
                        <button onClick={toggleTheme}>change theme</button>
                    </div>
                </div>
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
