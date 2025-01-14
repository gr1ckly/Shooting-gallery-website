import {FC, useState} from "react";
import {getRegEnumValue, RegEnum} from "../models/RegisterEnum";
import FormState from "../models/FormState";
import AuthService from "../services/AuthService.ts";
import {useDispatch, useSelector} from "react-redux";
import {selectAccessToken, selectUsername} from "../storage/AppStateSelectors.ts";
import {Navigate} from "react-router-dom";
import ActionEnum from "../models/ActionEnum.ts";

const AuthForm: FC<{mainPagePath: string}> = ({mainPagePath}) => {
    const dispatcher = useDispatch();
    const username: string | null = useSelector(selectUsername);
    const accessToken: string | null = useSelector(selectAccessToken);
    const [formState, setFormState] = useState<FormState>({username: '', password: ''});
    const [actionType, setActionType] = useState<RegEnum>(RegEnum.NONE);

    AuthService.refresh().then((response) => {
        console.log("Authorize");
        dispatcher({type: ActionEnum.SET_ACCESS_TOKEN, payload: response.token});
        dispatcher({type: ActionEnum.SET_USERNAME, payload: response.username});
    });

    if (username != null && accessToken != null){
        console.log("Authorize");
        return <Navigate to={mainPagePath}/>;
    }

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        switch (actionType){
            case RegEnum.SIGN: {
                const token = await AuthService.signIn(formState);
                if (token) {
                    console.log("Authorize");
                    dispatcher({type: ActionEnum.SET_USERNAME, payload: formState.username});
                    dispatcher({type: ActionEnum.SET_ACCESS_TOKEN, payload: token});
                }
                break;
            }
            case RegEnum.REG: {
                if (checkRepeat()) {
                    const token = await AuthService.register(formState);
                    if (token){
                        dispatcher({type: ActionEnum.SET_USERNAME, payload: formState.username});
                        dispatcher({type: ActionEnum.SET_ACCESS_TOKEN, payload: token});
                    }
                }
                break;
            }
        }
    }

    const checkRepeat = (): boolean => {
       const repeatPassword = document.getElementById("repeat-password");
       if (repeatPassword == null) return false;
       const repeatPassString: string = repeatPassword.innerText;
       if (repeatPassString.trim() == formState.password) return true;
       return false;
    };

    const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value: string = event.target.value.trim();
        setFormState({...formState, username: value})
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value: string = event.target.value.trim();
        setFormState({...formState, password: value})
    }

    const handleChangeActions = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value: RegEnum = getRegEnumValue(event.currentTarget.value);
        console.log(value);
        setActionType(value);
    }

    return (
        <form onSubmit={submit}>
            <label>
                <input type="button" value="Sign in" onClick={handleChangeActions}/>
                <input type="button" value="Register" onClick={handleChangeActions}/>
            </label>
            <label>
                Username:
                <input
                    id="username"
                    placeholder="Username"
                    type="text"
                    onChange={handleChangeUsername}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    id="password"
                    placeholder="Password"
                    type="password"
                    onChange={handleChangePassword}
                    required
                />
            </label>
            {
                actionType == RegEnum.REG &&
                <label>
                    Repeat password:
                    <input
                        id="repeat-password"
                        placeholder="Repeat password"
                        type="password"
                        required
                    />
                </label>
            }
            {
                actionType != RegEnum.NONE &&
                <label>
                    <input type="submit" value="Submit"/>
                </label>
            }
        </form>
    );
};

export default AuthForm