import React from 'react';
import './App.css';
import './styles/header.css';
import './styles/sidebar.css';
import './styles/sidebaroption.css';
import HeaderComponent from './components/HeaderComponent'
import SidebarComponent from "./components/SidebarComponent";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ChatComponent from "./components/ChatComponent";
import LoginComponent from "./components/LoginComponent";
import {useStateValue} from "./StateProvider";

function App() {
    const [{user}] = useStateValue();
    function checkWhetherToLog() {
        const isWindowObjectAvailable = typeof window !== 'undefined';
        const shouldLogWarning = isWindowObjectAvailable && window.console && typeof console.log === 'function';
        if(shouldLogWarning && !!window.chrome) {
            logWarningMessage();
        }
    }
    function logWarningMessage() {
        const flame = String.fromCodePoint(0x1F525);
        const headerStyle = [
            'color: white',
            'text-shadow: 2px 2px purple',
            'background: rgb(63 15 64)',
            'font-size: 3em',
            'border: 1px solid white',
            'padding: 20px',
            'font-family: effra-bold',
            'text-transform: uppercase'
        ].join(';');
        const stopStyle = [
            'color:red',
            'font-size:4rem',
            'font-weight:bold',
            'text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF'
        ].join(';');
        const warningText = [
            'color: red',
            'font-family:sans-serif',
            'font-size: 20px'
        ].join(';');
        console.log("%cWARNING!",stopStyle);
        console.log(`%cThis feature is only intended for developers...\nUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS....\nDO NOT ENTER or PASTE code that you do not understand ${flame} ${flame} ${flame} ${flame}`, warningText);
        console.log('%cKuldeep Khare', headerStyle);
    }
    checkWhetherToLog();
    return (
        <div className="App">
            <Router>
                {!user ? (
                    <LoginComponent/>
                ) : (
                    <>
                        <HeaderComponent/>
                        <div className="app__body">
                            <SidebarComponent/>
                            <Switch>
                                <Route path="/room/:id">
                                    <ChatComponent/>
                                </Route>
                                <Route path="/">
                                    <h1>Hello</h1>
                                </Route>
                            </Switch>
                        </div>
                    </>
                )}

            </Router>
        </div>
    );
}

export default App;
