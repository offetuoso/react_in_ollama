import React,{useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import ChatList from './ChatList';

import {
  useChatDispatch,
  useChatNextId,
  useChatState,
  useMessages,
  useSetMessages,
} from '../ChatContext';


let isGenerating = false; 

const ChatBodyBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};


let list = [];
function ChatBody() {
  const chats = useChatState();

  const [value, setValue] = useState('');
  
  const dispatch = useChatDispatch();
  const nextId = useChatNextId();
  const messages = useMessages();
  const setMessages = useSetMessages();

  console.log([], messages)

  

  function question(chat){

    isGenerating = true;
    const chatId = generateAnwser('ANSWER', false, '', null, false);

    messages.unshift({
      "role": "user",
      "content": chat.text
    });

    setMessages(messages);

    axios.post(`${process.env.REACT_APP_AI_URL}:${process.env.REACT_APP_AI_PORT}/api/chat`, {
      "model" : "llama3.1",
      "stream" : false,
      "messages": messages
    })
    .then(response => {
      console.log('응답:', response.data);
      isGenerating = false;

      
      // 2025-03-25T07:42:28.1370468Z
      let created_at = response.data.created_at;
      created_at = created_at.split('.')[0];

      const date = created_at.split('T')[0];
      const time = created_at.split('T')[1].substring(0,5);
      

      const param = {
        type: 'UPDATE',
        chat: {
          id: chatId,
          isPersonal: false,
          text: response.data.message.content,
          date: date,
          time: time,
          done: true,
        },
      };

      dispatch(param);

    })
    .catch(error => {
      console.error('에러:', error);
      const param = {
        type: 'REMOVE',
        id:chatId,
        chat: {
          id: chatId
        },
      };
      dispatch(param);
      isGenerating = false;
    });
  }


  function generateAnwser(type, isPersonal, value, now, done){

    nextId.current += 1;
  
    const param = {
      type: type,
      chat: {
        id: nextId.current,
        isPersonal: isPersonal,
        text: value,
        date: now ? formatDate(now) : '',
        time: now ? formatTime(now) : '',
        done: done,
      },
    };
    
    dispatch(param);
    setValue('');
  
    if(type ===  'QUESTION'){
      question(param.chat);
    }
  
    return nextId.current;
  
  }

  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지

    const now = new Date();
    generateAnwser('QUESTION', true, value, now, true);

  };

  const onChange = (e) => {

    setValue(e.target.value);
  };

  return (
    <div className="chat">
      <div className="chat-title">
        <h1>Ollama</h1>
        <h2>Meta</h2>
      </div>
      <div className="messages">
        <div className="messages-content">
          <div className="mCustomScrollBox">

            <ChatList/>

          </div>
        </div>
      </div>
      <div className="message-box">
        <form onSubmit={onSubmit}>
          <textarea type="text" className="message-input" placeholder="Type message..." value={value} onChange={onChange}></textarea>
          <button type="submit" className="message-submit">Send</button>
        </form>

      </div>
    </div>
  );
}

export default ChatBody;
