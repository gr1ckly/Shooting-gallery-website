import {FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./Header.tsx";
import AuthForm from "./AuthForm.tsx";
import MainPage from "./MainPage.tsx";

const App: FC = () =>{
    return(
        <div>
        <Header/>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<AuthForm mainPagePath={"/points"}/>}/>
                <Route path={"/points"} element={<MainPage loginPagePath={"/"}/>}/>
            </Routes>
        </BrowserRouter>
        </div>
    )
};

export default App;