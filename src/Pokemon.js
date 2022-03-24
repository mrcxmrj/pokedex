import { useState } from "react";

export const Pokemon = (props) => {
    //make sprites small when unclicked, make them scale with height when clicked (add a ruler next to the sprite)
    //maybe animate the enlargement
    const [detailsHidden, setDetailsHidden] = useState(true);

    return (
        <div
            onClick={() => setDetailsHidden((currentState) => !currentState)}
            className={"pokemon"}
        >
            <img
                className={`sprite${detailsHidden ? "" : "Large"}`}
                src={props.sprite}
                alt=""
            />
            <div className="stats">
                <h2>{props.name} </h2>
                <h4>type: {props.types}</h4>

                <div className={`moreStats${detailsHidden ? "Hidden" : ""}`}>
                    height: {props.height}
                    <br />
                    weight: {props.weight}
                </div>
            </div>
        </div>
    );
};
