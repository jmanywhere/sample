import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { arbitrum } from "@reown/appkit/networks";
import { CaipNetwork } from "@reown/appkit";

// Get projectId from https://cloud.reown.com
export const projectId = "5b3561f6a7c0319d2fcf6a9d20d6b1e8";

if (!projectId) {
    throw new Error("Project ID is not defined");
}

export const sepoliaArbitrum: CaipNetwork = {
    id: "eip155:421614",
    chainId: 421614,
    chainNamespace: "eip155",
    name: "Sepolia Arbitrum",
    currency: "ETH",
    explorerUrl: "https://sepolia.arbiscan.io",
    rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
};

export const networks = [arbitrum, sepoliaArbitrum];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
    transports: {
        [arbitrum.id]: http(),
        [sepoliaArbitrum.id]: http(sepoliaArbitrum.rpcUrl),
    },
    storage: createStorage({
        storage: cookieStorage,
    }),
    ssr: true,
    projectId,
    networks,
});

export const config = wagmiAdapter.wagmiConfig;
