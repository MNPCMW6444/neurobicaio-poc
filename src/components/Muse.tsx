import useGameWrapper from "../context/useGameWrapper";
import {useContext} from "react";
import {MuseClient} from "muse-js";
import {epoch, fft, powerByBand} from "@neurosity/pipes";
import {map} from "rxjs";

const Muse = () => {

    const {setMuseState} = useContext(useGameWrapper)


    const connectToDevice = async (deviceIndex: number) => {
        const muse = new MuseClient();

        await muse.connect();
        await muse.start();

        const frequencyBands = {} as any;


        enum FrequencyBandsPoints {
            minTheta = 4,
            minAlphaLow = 8,
            minAlphaHigh = 10,
            minBetaLow = 12.5,
            minBetaMid = 16.5,
            minBetaHigh = 21,
            minGamma = 30,
            max = 60,
        }


        const FrequencyBands = {
            THETA: {
                minFrequencyiInHz: FrequencyBandsPoints.minTheta,
                maxFrequencyiInHz: FrequencyBandsPoints.minAlphaLow,
            },
            ALPHA_LOW: {
                minFrequencyiInHz: FrequencyBandsPoints.minAlphaLow,
                maxFrequencyiInHz: FrequencyBandsPoints.minAlphaHigh,
            },
            ALPHA_HIGH: {
                minFrequencyiInHz: FrequencyBandsPoints.minAlphaHigh,
                maxFrequencyiInHz: FrequencyBandsPoints.minBetaLow,
            },
            BETA_LOW: {
                minFrequencyiInHz: FrequencyBandsPoints.minBetaLow,
                maxFrequencyiInHz: FrequencyBandsPoints.minBetaMid,
            },
            BETA_MID: {
                minFrequencyiInHz: FrequencyBandsPoints.minBetaMid,
                maxFrequencyiInHz: FrequencyBandsPoints.minBetaHigh,
            },
            BETA_HIGH: {
                minFrequencyiInHz: FrequencyBandsPoints.minBetaHigh,
                maxFrequencyiInHz: FrequencyBandsPoints.minGamma,
            },
            GAMMA: {
                minFrequencyiInHz: FrequencyBandsPoints.minGamma,
                maxFrequencyiInHz: FrequencyBandsPoints.max,
            },
        };


        const freqrange = Object.values(FrequencyBands);
        const freqnames = Object.keys(FrequencyBands);


        freqnames.forEach((freqname: string, index: number) => {
            frequencyBands[freqname] = [
                freqrange[index].minFrequencyiInHz,
                freqrange[index].maxFrequencyiInHz,
            ];
        });


        frequencyBands &&
        muse.eegReadings.pipe(
            map((xy: any) => xy.samples) as any,
            epoch({duration: 256, interval: 100}) as any,
            fft({bins: 256}) as any,
            powerByBand(frequencyBands) as any
        ).subscribe(x => console.log(x));


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

