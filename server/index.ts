import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { isAddress, verifyMessage } from "viem";
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia, mainnet } from "viem/chains";
import { enrollmentContract } from "@/config/contracts";
import abi from "@/config/abi/edp";

export const appRouter = router({
    hello: publicProcedure.query(() => "Hello World"),

    verifyAndCall: publicProcedure
        .input(
            z.object({
                signature: z
                    .string()
                    .refine(
                        (val): val is `0x${string}` => val.startsWith("0x"),
                        {
                            message:
                                "Signature must start with '0x' and be a valid address",
                        }
                    ),
                address: z
                    .string()
                    .refine(
                        (val): val is `0x${string}` =>
                            val.startsWith("0x") && isAddress(val),
                        { message: "Address must start with '0x'" }
                    ),
            })
        )
        .mutation(async ({ input }) => {
            // Verify the signature
            const isValid = await verifyMessage({
                message:
                    "I am enrolling to the Ethereum Developer Pack Course for a bit of FREE TESTNET ETH",
                signature: input.signature,
                address: input.address,
            });

            if (!isValid) {
                throw new Error("Invalid signature");
            }

            // Create a wallet client using the owner's private key
            const account = privateKeyToAccount(
                process.env.OWNER_PK as `0x${string}`
            );
            const client = createWalletClient({
                account,
                chain: arbitrumSepolia,
                transport: http(),
            });

            // Make the contract call
            const hash = await client.writeContract({
                address: enrollmentContract,
                abi: abi, // Your contract ABI
                functionName: "approveUser",
                args: [input.address], // Your function arguments
            });

            return { transactionHash: hash };
        }),
});

export type AppRouter = typeof appRouter;
