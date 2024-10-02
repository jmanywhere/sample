import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TRPCProvider } from "@/app/api/trpc/[trpc]/_trpc/TRPCProvider";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { config } from "@/config";
import Web3ModalProvider from "./_layout/Web3Provider";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Ethereum Developer Pack - Guatemala MODULO 1",
    description: "Ethereum Developer Pack - Guatemala MODULO 1",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookies = headers().get("cookie");
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Web3ModalProvider cookies={cookies}>
                    <TRPCProvider>{children}</TRPCProvider>
                </Web3ModalProvider>
            </body>
        </html>
    );
}
