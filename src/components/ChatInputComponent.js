import React, {useState} from "react";
import {Button} from "@material-ui/core";
import {useStateValue} from "../StateProvider";
import db from "../firebase";
import firebase from 'firebase';
import '../styles/chatinput.css'

function ChatInputComponent({channelName, channelId}) {
    const [input, setInput] =useState('');
    const [{user}] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault();
        if(channelId) {

            db.collection('rooms')
                .doc(channelId).collection('messages')
                .add({
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: user.displayName,
                    userimage: user.photoURL
                });
        }
        setInput("");
    }

    return (
        <div className="chatInput">
            <form>
                <input
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                    placeholder={`Message #${channelName}`}
                />
                <Button type="submit" onClick={sendMessage}>Send</Button>
            </form>
        </div>
    )
}

export default ChatInputComponent;