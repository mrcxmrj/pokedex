import { useState } from "react";

export const Pokemon = (props) => {
    //make sprites small when unclicked, make them scale with height when clicked (add a ruler next to the sprite)
    //maybe animate the enlargement
    const [detailsHidden, setDetailsHidden] = useState(true);

    return (
        <div
            onClick={() => setDetailsHidden((currentState) => !currentState)}
            style={{ display: "flex" }}
        >
            <div className="textbox">
                <h2>{props.name}</h2>
                type: {props.types}
            </div>{" "}
            <img src={props.sprite} alt="" />
            {detailsHidden ? null : (
                <div className="stats">
                    weight: {props.weight}
                    height: {props.height}
                </div>
            )}
        </div>
    );
};
