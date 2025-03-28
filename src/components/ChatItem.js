import React from 'react';
import {
  MdDelete,
  MdDone,
} from 'react-icons/md';
import styled, { css } from 'styled-components';

import { useChatDispatch } from '../ChatContext';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const ChatItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

function ChatItem({ id, chatInfo }) {
  const dispatch = useChatDispatch();
  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });


  const date = new Date();
  const today = new Intl.DateTimeFormat('en-CA').format(date);

  return (
    <>         
          <div className={`${'message  new'} ${chatInfo.isPersonal ? 'message-personal': ''} ${!chatInfo.isPersonal && !chatInfo.done ? 'loading': ''}`} >
            <figure className={`avatar ${chatInfo.isPersonal ? 'hide': ''}`}>
            <img src="https://ollama.com/public/ollama.png"/></figure>
            <span>{`${!chatInfo.isPersonal && !chatInfo.done ? '': chatInfo.text }`}</span>
            <div className= {`timestamp ${ chatInfo.done ? '' : 'hide' }`} >{ today == chatInfo.date ? '' : chatInfo.date.substring(2,chatInfo.date.length)} {chatInfo.time}</div>
           {/*  <div className={`${ !chatInfo.isPersonal && chatInfo.done ? 'checkmark-sent-delivered': 'hide'}`} >✓</div>
            <div className={`${ !chatInfo.isPersonal && chatInfo.done ? 'checkmark-read': 'hide'}`} >✓</div> */}
          </div>
    </>
  );
}

export default React.memo(ChatItem);
