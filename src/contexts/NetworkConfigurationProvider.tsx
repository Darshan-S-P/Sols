import { useLocalStorage } from "@solana/wallet-adapter-react";
import  { createContext,FC, ReactNode, useContext } from "react";

export interface NetworkConfigurationState{
    networkConfiguration: string;
    setnetworkConfiguration(networkConfiguration: string): void;
}

export const NetworkConfigurationContext = createContext<NetworkConfigurationState>(
    {} as NetworkConfigurationState
);

export function useNetworkConfiguration(): NetworkConfigurationState{
    return useContext(NetworkConfigurationContext);
}

export const NetworkConfigurationProvider: FC<{children: ReactNode}> =({
    children,

}) =>{
    const [networkConfiguration, setnetworkConfiguration] = useLocalStorage(
        "network",
        "devnet"
    );
    return(
        <NetworkConfigurationContext.Provider value ={{networkConfiguration, setnetworkConfiguration}}  > 
            {children}
        </NetworkConfigurationContext.Provider>
    );
};
