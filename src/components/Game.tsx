import {useContext,} from "react";
import useGameWrapper from "../context/useGameWrapper";

const Game = () => {

    const {fstPlrProg} = useContext(useGameWrapper);
    return <>
        <div style={{height: fstPlrProg + "vh", backgroundColor: "red"}}/>
        <div style={{height: 100 - fstPlrProg + "vh", backgroundColor: "blue"}}/>
    </>
};


export default Game;

