import React from 'react'
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie'
import { ChannelContainer,ChannelListContainer,Auth} from './components';
import './App.css'


//used to initialize the chat
const apiKey='3nsmrbmwhfqt';

// instance of a stream chat
const client = StreamChat.getInstance(apiKey);

const authToken=false;
const App = () => {

    if(!authToken) return <Auth/>
    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer

                />

                <ChannelContainer

                />
            </Chat>
        </div>
    )
}

export default App
