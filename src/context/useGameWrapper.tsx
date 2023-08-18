import {createContext, ReactNode, useState} from "react";


const useGameWrapper = createContext<{
    fstPlrProg: number,
    setMuseState: any
}>({
    fstPlrProg: 50,
    setMuseState: {}
});

export const GameWrapper = ({
                                children,
                            }: {
    children: ReactNode;
}) => {

    const [fstPlrProg, setFstPlrProg] = useState<number>(50);
    const [museState, setMuseState] = useState<any>({});

    setTimeout(() => setFstPlrProg(prev => prev + (Math.random() * 5) - 2.5), 1000)

    return (
        <useGameWrapper.Provider
            value={{
                fstPlrProg, setMuseState
            }}
        >
            {children}
        </useGameWrapper.Provider>
    );
};

export default useGameWrapper;
