import { FC } from 'react';
import dynamic from 'next/dynamic';

// Internal Import
import { useNetworkConfiguration } from 'contexts/NetworkConfigurationProvider';
import NetworkSwitcherSVG from './SVG/NetworkSwitcherSVG'; // Adjusted the import

const LocalNetworkSwitcher: FC = () => {
  const { networkConfiguration, setnetworkConfiguration } = useNetworkConfiguration();

  return (
    <> 
      <input type="checkbox" id="checkbox" />
      <label className="switch"> 
        <select
          value={networkConfiguration}
          onChange={(e) => setnetworkConfiguration(e.target.value || "devnet")}
          className="select max-w-xs border-none bg-transparent outline-0"
        >
          <option value="mainnet-beta">main</option>
          <option value="devnet">dev</option>
          <option value="testnet">test</option>
        </select>
      </label>
      <NetworkSwitcherSVG />
    </>
  );
};

export default dynamic(() => Promise.resolve(LocalNetworkSwitcher), { ssr: false });
