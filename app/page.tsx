import EnrollmentCard from "./_components";
import Header from "./_layout/Header";

export default function Home() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-600 gap-y-4">
            <Header />
            <div className="flex flex-col items-center justify-center gap-y-4 p-8 flex-1">
                <h2 className="text-4xl font-bold text-white">
                    Ethereum Developer Pack
                </h2>
                <div className="text-center">
                    <h3 className="text-2xl text-white">Modulo 1 Guatemala</h3>
                    <h4 className="text-xl font-mono text-blue-400 font-bold">
                        Faucet
                    </h4>
                </div>
                <EnrollmentCard />
            </div>
        </div>
    );
}
