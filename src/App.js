import React from 'react';
import { createGlobalStyle } from 'styled-components';

import ChatHead from './components/ChatHead';
import ChatBody from './components/ChatBody';
import ChatTemplate from './components/ChatTemplate';
import { ChatProvider } from './ChatContext';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef
  }
`;
function App() {
  return (
    <ChatProvider>
      <GlobalStyle />
      <ChatTemplate> 
        <ChatHead /> 
        <ChatBody />
      </ChatTemplate>
    </ChatProvider>
  );
}

export default App;
