import Sidebar from './components/sidebar';
import Header from './components/header';
import Market from './pages/market';

function App() {
    return (
        <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Header />
                <Market />
            </div>
        </div>
    );
}

export default App;
