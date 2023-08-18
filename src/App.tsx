import Game from "./components/Game";
import {GameWrapper} from "./context/useGameWrapper";
import Muse from "./components/Muse";

function App() {
    return (
        <GameWrapper>
            {/*<Game/>*/}
            <Muse/>
        </GameWrapper>
    );
}

export default App;
