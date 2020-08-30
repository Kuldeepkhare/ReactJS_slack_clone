import React, {useEffect, useState} from "react";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import SidebarOptionComponent from "./SidebarOptionComponent";
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import db from '../firebase';
import {useStateValue} from "../StateProvider";

function SidebarComponent() {
    const [channels, setChannels] = useState([]);
    const [{user}] = useStateValue();
    useEffect(() => {
        // getting channel list from db
        db.collection('rooms').onSnapshot(snapshot => (
            setChannels(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name
                }))
            )
        ));
        // run it ONCE when sidebar component loads, here empty array means we wan to call this only when we have zero elements
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>MEAN Developer</h2>
                    <h3>
                        <FiberManualRecordIcon/>
                        {user?.displayName}
                    </h3>
                </div>
                <CreateIcon/>
            </div>
            <SidebarOptionComponent Icon={InsertCommentIcon} title="Thread"/>
            <SidebarOptionComponent Icon={InboxIcon} title="Mention & reactions"/>
            <SidebarOptionComponent Icon={DraftsIcon} title="Saved items"/>
            <SidebarOptionComponent Icon={BookmarkBorderIcon} title="Channel browser"/>
            <SidebarOptionComponent Icon={FileCopyIcon} title="File browser"/>
            <SidebarOptionComponent Icon={PeopleAltIcon} title="People &user groups"/>
            <SidebarOptionComponent Icon={AppsIcon} title="Apps"/>
            <SidebarOptionComponent Icon={ExpandLessIcon} title="Show less"/>
            <hr/>
            <SidebarOptionComponent Icon={ExpandMoreIcon} title="Channels"/>
            <hr/>
            <SidebarOptionComponent Icon={AddIcon} addChannelOption title="Add channel"/>
            {/*Connect to db and list all icons*/}
            {channels.map(channel => (
                <SidebarOptionComponent title={channel.name} id={channel.id} key={channel.id}/>
            ))}
        </div>
    );
}

export default SidebarComponent;