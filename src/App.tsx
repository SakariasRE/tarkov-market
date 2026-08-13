import { useEffect, useState } from 'react';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Market from './pages/market';
import Inventory from './pages/inventory';

function App() {
    const [balance, setBalance] = useState(() => {
        const savedBalance = localStorage.getItem('balance');
        return savedBalance ? Number(savedBalance) : 500000;
    });

    useEffect(() => {
        localStorage.setItem('balance', balance.toString());
    }, [balance]);

    return (
        <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
            <Sidebar />

            <div className="flex flex-1 flex-col">
                <Header
                balance={balance}
                setBalance={setBalance}
                />

                
                <Inventory />
            </div>
        </div>
    );
}

export default App;
