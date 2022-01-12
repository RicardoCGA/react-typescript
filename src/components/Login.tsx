import React, {SyntheticEvent, useState} from "react";
import { AuthService } from "../services/AuthService";
import {User} from "../model/Model";
import {NavigateFunction, useNavigate} from 'react-router-dom';

interface LoginProps {
    authService: AuthService,
    setUser: (user:User) => void
}
/*
interface LoginState {
    userName: string,
    password: string,
    loginAttempted: boolean,
    loginSuccessful: boolean
}*/

interface CustomEvent {
    target: HTMLInputElement;
}

  const Login = (props:LoginProps) => {

    const [loginState, setLoginState] = useState ({
        userName: '',
        password: '',
        loginAttempted: false,
        loginSuccessful: false
    });

    const setUserName = (event: CustomEvent) => {
        console.log('Setting: '+event.target.name);
        setLoginState({...loginState,userName:event.target.value});
    }

    const setPassword =  (event: CustomEvent) => {
        console.log('Setting: '+event.target.name);
        setLoginState({...loginState,password:event.target.value});

    }

    const handleSubmit = async ( event: SyntheticEvent, navigate: NavigateFunction) => {
        event.preventDefault();
        setLoginState({...loginState, loginAttempted: true});
        const result = await props.authService.login(
            loginState.userName,
            loginState.password
        );

        if (result){
            setLoginState({...loginState, loginSuccessful: true});
            props.setUser(result);
            navigate('/profile');
        }else{
            setLoginState({...loginState, loginSuccessful: false});
        }
    }

    let loginMessage: any;
    let navigate = useNavigate();
    if ( loginState.loginAttempted)
       if (loginState.loginSuccessful)
           loginMessage = <label>Login Success</label>
       else
           loginMessage = <label>Login Failed</label>

        return (
            <div>
                <h2>
                    Please Log !
                </h2>
                <form>
                    <input value={loginState.userName} name="userName" onChange={e => setUserName(e)}/><br/>
                    <input value={loginState.password} name = "password" type="password" onChange={e => setPassword(e)} /><br/>
                    <input type="submit" value="Log" onClick={e => handleSubmit(e, navigate)}/><br/>
                </form>
                {loginMessage}
            </div>
        )
    }

    export default Login;