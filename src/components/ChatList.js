import React from 'react';
import styled from 'styled-components';
import ChatItem from './ChatItem';
import { useChatState } from '../ChatContext';



function ChatList() {
  const chats = useChatState();

  return (
    <div id="mCSB_1_container" className="chatMessagesBlock mCSB_container mCS_y_hidden mCS_no_scrollbar_y"  dir="ltr">

      {chats.map((chatInfo) => (
        <ChatItem key={chatInfo.id} chatInfo={chatInfo} />
      ))}

    </div>

    
  );
}

export default ChatList;
