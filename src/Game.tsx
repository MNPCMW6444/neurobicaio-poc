import {useState} from "react";

const Game = () => {
    const [fstPlrProg, setFstPlrProg] = useState<number>(50);

    setTimeout(() => setFstPlrProg(prev => prev + (Math.random() * 5) - 2.5), 1000)

    return (<>
        <div style={{height: fstPlrProg + "vh", backgroundColor: "red"}}/>
        <div style={{height: 100 - fstPlrProg + "vh", backgroundColor: "blue"}}/>
    </>)
};


export default Game;

