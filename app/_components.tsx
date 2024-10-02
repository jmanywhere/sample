"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
    useAccount,
    useReadContracts,
    useWriteContract,
    useSignMessage,
    useSimulateContract,
    useConfig,
} from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { trpc } from "@/app/api/trpc/[trpc]/_trpc/client";
import abi from "@/config/abi/edp";
import { formatEther, zeroAddress } from "viem";
import { useEffect, useState } from "react";
import { enrollmentContract } from "@/config/contracts";

export default function EnrollmentCard() {
    const [loading, setLoading] = useState(false);
    const { address } = useAccount();
    const { writeContract, isPending } = useWriteContract();
    const config = useConfig();
    const { signMessageAsync } = useSignMessage();
    const {
        mutate,
        isPending: isEnrolling,
        data: txHash,
    } = trpc.verifyAndCall.useMutation({
        onSuccess: (hash) => {
            toast({
                title: "Enrollment Transaction Sent",
                description: `Transaction Hash: ${hash.transactionHash}`,
            });
        },
    });
    const { toast } = useToast();

    const { data: enrollmentStatus, refetch: refetchEnrollmentStatus } =
        useReadContracts({
            contracts: [
                {
                    address: enrollmentContract,
                    abi: abi,
                    functionName: "getUserStatus",
                    args: [address || zeroAddress],
                },
                {
                    address: enrollmentContract,
                    abi: abi,
                    functionName: "distributionAmount",
                },
            ],
            query: {
                enabled: !!address,
            },
        });

    const {
        data: simulate,
        failureReason,
        error,
    } = useSimulateContract({
        address: enrollmentContract,
        abi: abi,
        functionName: "claim",
    });
    console.log({
        simulate,
        failureReason,
        error,
    });

    useEffect(() => {
        const waitForReceipt = async () => {
            if (txHash) {
                setLoading(true);
                const receipt = await waitForTransactionReceipt(config, {
                    hash: txHash.transactionHash,
                });
                setLoading(!(receipt.status === "success"));
                refetchEnrollmentStatus();
            }
        };
        waitForReceipt();
    }, [txHash, config, refetchEnrollmentStatus]);

    const isEnrolled = enrollmentStatus?.[0]?.result?.[0] || false;
    const hasClaimed = enrollmentStatus?.[0]?.result?.[1] || false;
    const distributionAmount = enrollmentStatus?.[1]?.result || 0n;

    const handleEnroll = async () => {
        try {
            const message =
                "I am enrolling to the Ethereum Developer Pack Course for a bit of FREE TESTNET ETH";
            const signature = await signMessageAsync({ message });

            // Send the signed message to the tRPC endpoint
            await mutate({ signature, address: address || zeroAddress });
        } catch (error) {
            console.error("Error during enrollment:", error);
            toast({
                title: "Enrollment Failed",
                description: "An error occurred during enrollment.",
                variant: "destructive",
            });
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Enrollment Status</CardTitle>
                <CardDescription>
                    Check your current enrollment status
                </CardDescription>
            </CardHeader>
            <CardContent>
                {!address ? (
                    <>
                        <p className="mb-4">
                            Please connect to view your enrollment status.
                        </p>
                        <w3m-button />
                    </>
                ) : !isEnrolled ? (
                    <>
                        <p className="mb-4">
                            You are connected but not enrolled.
                        </p>
                        <Button
                            onClick={handleEnroll}
                            className="w-full"
                            disabled={isEnrolling || loading}
                        >
                            {isEnrolling || loading ? "Enrolling..." : "ENROLL"}
                        </Button>
                    </>
                ) : (
                    <>
                        <p className="text-green-600 font-semibold mb-4">
                            You are enrolled!
                        </p>
                        {!hasClaimed ? (
                            <>
                                <p className="mb-2">
                                    Available to claim:{" "}
                                    {formatEther(distributionAmount)} ETH
                                </p>
                                <Button
                                    onClick={() => {
                                        writeContract(
                                            {
                                                address: enrollmentContract,
                                                abi: abi,
                                                functionName: "claim",
                                            },
                                            {
                                                onSuccess: async (data) => {
                                                    toast({
                                                        title: "Claim Transaction Sent",
                                                        description: `Transaction Hash: ${data}`,
                                                    });
                                                    setLoading(true);
                                                    const receipt =
                                                        await waitForTransactionReceipt(
                                                            config,
                                                            {
                                                                hash: data,
                                                            }
                                                        );
                                                    setLoading(
                                                        !(
                                                            receipt.status ===
                                                            "success"
                                                        )
                                                    );
                                                    refetchEnrollmentStatus();
                                                },
                                            }
                                        );
                                    }}
                                    className="w-full"
                                    disabled={isPending || loading}
                                >
                                    {isPending || loading
                                        ? "Claiming..."
                                        : "CLAIM"}
                                </Button>
                            </>
                        ) : (
                            <p className="text-green-600 font-semibold">
                                All claimed! Have fun!
                            </p>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}
