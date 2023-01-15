import './App.css';
import { Main } from './main/Main';
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <div className="App-body">
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<Main />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
