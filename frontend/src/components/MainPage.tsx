import {FC} from "react";
import {useSelector} from "react-redux";
import {selectAccessToken, selectUsername} from "../storage/AppStateSelectors.ts";
import {Navigate} from "react-router-dom";

const MainPage: FC<{loginPagePath: string}> = ({loginPagePath}) => {
    const username = useSelector(selectUsername);
    const token = useSelector(selectAccessToken);

    console.log("Lol, its main");
    if (username == null || token == null){
        return <Navigate to={loginPagePath}/>;
    }

    if (token == null || username == null){
        return <Navigate to={loginPagePath}/>;
    }

    return(
        <main>

        </main>
    )
};

export default MainPage;