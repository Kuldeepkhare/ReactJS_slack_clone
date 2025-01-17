import React from "react";
import {useHistory} from 'react-router-dom';

import db from '../firebase';

function SidebarOptionComponent({Icon, title, id, addChannelOption}) {
    const history = useHistory();
    const selectChannel = () => {
        if (id) {
            history.push(`/room/${id}`);
        } else {
            history.push(title);
        }
    }
    const addChannel = () => {
        const channelName = prompt('Please enter channel name')
        if (channelName) {
            db.collection('rooms').add({
                name: channelName
            });
        }
    };

    return (
        <div className="sidebarOption"
             onClick={addChannelOption ? addChannel : selectChannel}>
            {Icon && <Icon className="sidebarOption__icon"/>}
            {Icon ? (
                <h3 className="sidebarOption__channel">{title}</h3>
            ) : <h3 className="sidebarOption__channel">
                <span className="sidebarOption__hash"># {title}</span>
            </h3>}
        </div>
    );

}

export default SidebarOptionComponent;