import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/App.sass";
import Header from "./Components/Header/Header";
import Agencies from "./Components/Pages/Agencies/Agencies";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path='/agencies'
                    element={<Agencies />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
