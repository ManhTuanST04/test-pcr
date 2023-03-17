import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from 'menu/Menu';
import { TestPCRMainForm } from 'component/pcr/TestPCRMainForm';
import BillMainForm from 'component/bill/BillMainForm';
import MainLoyout from 'layout/MainLoyout';

function App() {
    return (
        <div className="App">
            <div className="App-body">
                <Router>
                    <Menu />
                    <Routes>
                        <Route path="*" element={<MainLoyout component={TestPCRMainForm} />} />
                        <Route path="/test-pcr" element={<MainLoyout component={TestPCRMainForm} />} />
                        <Route path="/bill" element={<MainLoyout component={BillMainForm}/>} />
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
