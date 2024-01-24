import React from "react";
import './index.scss'
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDelete, MdUpdate } from "react-icons/md";
import { useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { AddSelfMessage} from "../../redux/slices/messagesslice"
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Chats from "../Chats";
import { socket } from '../../socket'


const Chatarea = () => {

    var Message;
    const Messages = useSelector((state) => state.Messages);
    const location = useLocation();
    const chatid = location.state.chatid;
    
    useEffect(() => {
        console.log('mounted')
        socket.emit('leave-prev-chat');
        socket.emit('pv-chat', chatid)

    },[location.pathname])


    console.log('mounted')

      const handlesendarrow = () => {
            socket.emit('send-message', {
                MsgId : location.state.chatid,
                ActualMessage : Message,
                SendedBy : location.state.SendedBy,
                Timestamp : new Date().toISOString()
            } , location.state.chatid)
            document.getElementById('myTextarea').value = '';
      }

    return (
        <div className="MainChatArea">
            <div className="Navtop">
                <Loadtopnav ChatName={`${location.state.ChatName}`}/>
            </div>
            <div className="Chatarea">
                <Chats Chatid={chatid}/>
            </div>
            <div id="appending" className="Inputarea">
                <div className="outer-text-area-styling">
                    <textarea 
                    rows='1' spellCheck="false"
                    id="myTextarea" onChange={(e) => Message=e.target.value} 
                    className="inputelem" 
                    placeholder="Type a message...."
                    />
                </div>
                <IoSend onClick={handlesendarrow} className="Send-chat-button" />
            </div>
        </div>
    );
}




const Loadtopnav = ({ChatName}) => {
    return(
        <div className="maintop">
            <div className="mainpfp">
                <FaUserCircle />
            </div>
            <div className="maintopic">
                <p className="topicname">
                    {ChatName}
                </p>
                <p className="topicstatus">
                    status
                </p>
            </div>
            <div className="maindelete">
                <MdDelete />
            </div>
        </div>
    );
}

export default Chatarea;

