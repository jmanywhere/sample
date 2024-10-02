"use client";

import { wagmiAdapter, projectId, sepoliaArbitrum, networks } from "@/config";
import { createAppKit } from "@reown/appkit/react";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

if (!projectId) {
    throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
    name: "appkit-example-scroll",
    description: "AppKit Example - Scroll",
    url: "https://scrollapp.com", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal
createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: networks,
    defaultNetwork: sepoliaArbitrum,
    metadata: metadata,
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
    },
    allowUnsupportedChain: true,
});

function ContextProvider({
    children,
    cookies,
}: {
    children: ReactNode;
    cookies: string | null;
}) {
    const initialState = cookieToInitialState(
        wagmiAdapter.wagmiConfig as Config,
        cookies
    );

    return (
        <WagmiProvider
            config={wagmiAdapter.wagmiConfig as Config}
            initialState={initialState}
        >
            {children}
        </WagmiProvider>
    );
}

export default ContextProvider;
