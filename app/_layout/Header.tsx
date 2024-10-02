"use client";

export default function Header() {
    return (
        <header className="w-full p-4 bg-gray-800">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white font-mono">
                    EDP - GT
                </h1>
                <w3m-button />
            </div>
        </header>
    );
}
