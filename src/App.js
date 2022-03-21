import logo from "./logo.svg";
import "./App.css";

function App() {
    return (
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
            </div>
        </div>
    );
}

const Pokemon = (props) => {
    return <>name, type, sprite</>;
};

const Searchbox = (props) => {
    return <>search, sort by, filter</>;
};

export default App;
