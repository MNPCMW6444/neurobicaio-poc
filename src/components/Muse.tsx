import useGameWrapper from "../context/useGameWrapper";
import {useContext} from "react";
import {MuseClient} from "muse-js";

const Muse = () => {

    const {setMuseState} = useContext(useGameWrapper)


    const connectToDevice = async (deviceIndex: number) => {
        const muse = new MuseClient();

        await muse.connect();
        await muse.start();

        muse.ppgReadings.subscribe(x => console.log(x))

        /* setMuseState((prevState: any) => ({
             ...prevState,
             [`device${deviceIndex}`]: muse
         }));*/
    }

    return <>
        <button onClick={() => connectToDevice(1).catch((e) => console.log(e))}>connect 1</button>
        <button onClick={() => connectToDevice(2).catch((e) => console.log(e))}>connect 2</button>
    </>
};


export default Muse;

