import React, {useEffect, useState} from "react";
import '../styles/chat.css';
import {useParams} from "react-router-dom";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoIcon from '@material-ui/icons/Info';
import db from '../firebase';
import MessagesComponent from "./MessagesComponent";
import ChatInputComponent from "./ChatInputComponent";

function ChatComponent() {
    // useParams is a hook and is only useful in functional component
    const {id} = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);

    useEffect(() => {
        let roomDetailsWithIdentifier;
        if (id) {
            db.collection('rooms')
                .doc(id)
                .onSnapshot(snapshot => {
                    roomDetailsWithIdentifier = {
                        name: snapshot.data()?.name,
                        id: snapshot.id
                    }
                    setRoomDetails(roomDetailsWithIdentifier)
                })
        }
        db.collection('rooms').doc(id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot =>
                setRoomMessages(
                    snapshot.docs.map(doc => doc.data())
                )
            )
    }, [id]);
    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__headerLeft">
                    <h4 className="chat__channelName">
                        <strong># {roomDetails?.name}</strong>
                        <StarBorderIcon/>
                    </h4>
                </div>
                <div className="chat__headerRight">
                    <p>
                        <InfoIcon/> Details
                    </p>
                </div>
            </div>
            <div className="chat_messages">
                {roomMessages.map(({message, timestamp, user, userimage}, index) => (
                    <MessagesComponent
                        key={index}
                        message={message}
                        timestamp={timestamp}
                        user={user}
                        userimage={userimage}
                    />
                ))}
            </div>
            <ChatInputComponent channelName={roomDetails?.name} channelId={roomDetails?.id}/>
        </div>
    )
}

export default ChatComponent;