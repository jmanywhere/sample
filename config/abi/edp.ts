const abi = [
    { type: "constructor", inputs: [], stateMutability: "nonpayable" },
    {
        type: "function",
        name: "approveUser",
        inputs: [{ name: "_user", type: "address", internalType: "address" }],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "claim",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "distributionAmount",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "distributionSet",
        inputs: [],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getUserStatus",
        inputs: [{ name: "_user", type: "address", internalType: "address" }],
        outputs: [
            { name: "isApproved", type: "bool", internalType: "bool" },
            { name: "hasClaimed", type: "bool", internalType: "bool" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "owner",
        inputs: [],
        outputs: [{ name: "", type: "address", internalType: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "setDistribution",
        inputs: [
            { name: "_distAmount", type: "uint256", internalType: "uint256" },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "totalUsersAdded",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "users",
        inputs: [{ name: "", type: "address", internalType: "address" }],
        outputs: [
            { name: "isApproved", type: "bool", internalType: "bool" },
            { name: "hasClaimed", type: "bool", internalType: "bool" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "withdrawAllBalance",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "event",
        name: "UserApproved",
        inputs: [
            {
                name: "user",
                type: "address",
                indexed: true,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "UserClaimed",
        inputs: [
            {
                name: "user",
                type: "address",
                indexed: true,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    { type: "error", name: "EDP__DistributionAlreadySet", inputs: [] },
    { type: "error", name: "EDP__InsufficientFunds", inputs: [] },
    { type: "error", name: "EDP__NoBalanceToWithdraw", inputs: [] },
    { type: "error", name: "EDP__OnlyOwnerCanCall", inputs: [] },
    { type: "error", name: "EDP__TransferFailed", inputs: [] },
    { type: "error", name: "EDP__UserAlreadyApproved", inputs: [] },
    { type: "error", name: "EDP__UserAlreadyClaimed", inputs: [] },
    { type: "error", name: "EDP__UserNotApproved", inputs: [] },
    { type: "error", name: "EDP__ZeroDistributionAmount", inputs: [] },
] as const;

export default abi;
