import {createContext, ReactNode, useState} from "react";


const useGameWrapper = createContext<{
    fstPlrProg: number
}>({
    fstPlrProg: 50
});

export const GameWrapper = ({
                                children,
                            }: {
    children: ReactNode;
}) => {

    const [fstPlrProg, setFstPlrProg] = useState<number>(50);

    setTimeout(() => setFstPlrProg(prev => prev + (Math.random() * 5) - 2.5), 1000)

    return (
        <useGameWrapper.Provider
            value={{
                fstPlrProg
            }}
        >
            {children}
        </useGameWrapper.Provider>
    );
};

export default useGameWrapper;
