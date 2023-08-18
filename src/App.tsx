import Game from "./components/Game";
import {GameWrapper} from "./context/useGameWrapper";

function App() {
    return (
        <GameWrapper>
            <Game/>
        </GameWrapper>
    );
}

export default App;
