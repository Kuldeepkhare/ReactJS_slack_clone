import React from "react";
import '../styles/login.css';
import {Button} from "@material-ui/core";
import {auth, provider} from "../firebase";
import {useStateValue} from "../StateProvider";
import {actionTypes} from "../reducer";
import FavoriteIcon from '@material-ui/icons/Favorite';

function LoginComponent() {
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                });
            })
            .catch((error) => {
                console.log('error is here', error);
            })
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt=""/>
                <h1> Sign in to my custom Slack</h1>

                <br/>
                <p> Built with love by Kuldeep Khare<FavoriteIcon/></p>
                <Button onClick={signIn}>Sign in with Google</Button>
                <p>*This is real-time google authentication</p>
            </div>
        </div>
    )
}

export default LoginComponent;