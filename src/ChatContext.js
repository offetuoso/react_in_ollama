import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useState,
} from 'react';

let isGenerating = false;

const initialChats = [
  {
    id: 1,
    isPersonal: false,
    date: '',
    time: '',
    text: '안녕, 나는 올라마야 무물!',
    done: true,
  }
];

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




function chatReducer(state, action) {
  switch (action.type) {
    case 'QUESTION': 
      if(!isGenerating){
        isGenerating = true;
      }
      return state.concat(action.chat);

    case 'ANSWER': 
      return state.concat(action.chat);

    case 'UPDATE':

      console.log(action, state)

      const map = state.map(chat =>
        chat.id === action.chat.id && chat.id === action.chat.id
          ? action.chat
          : chat
      );

      console.log(map);

      return map;

    case 'REMOVE':
      return state.filter((chat) => chat.id !== action.chat.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const ChatStateContext = createContext();
const ChatDispatchContext = createContext();
const ChatNextIdContext = createContext();
const MessagesContext = createContext();
const SetMessagesContext = createContext();

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialChats);
  const nextId = useRef(1);

  const [messages, setMessages] = useState([]);



  return (
    <SetMessagesContext.Provider value={setMessages}>
      <MessagesContext.Provider value={messages}>
        <ChatStateContext.Provider value={state}>
            <ChatDispatchContext.Provider value={dispatch}>
              <ChatNextIdContext.Provider value={nextId}>{children}</ChatNextIdContext.Provider>
            </ChatDispatchContext.Provider>
        </ChatStateContext.Provider>
      </MessagesContext.Provider>
    </SetMessagesContext.Provider>
  );
}

export function useChatState() {
  const context = useContext(ChatStateContext);
  if (!context) {
    throw new Error('Cannot find ChatProvider');
  }
  return context;
}

export function useChatDispatch() {
  const context = useContext(ChatDispatchContext);
  if (!context) {
    throw new Error('Cannot find ChatDispatchProvider');
  }
  return context;
}

export function useChatNextId() {
  const context = useContext(ChatNextIdContext);
  if (!context) {
    throw new Error('Cannot find ChatNextIdProvider');
  }
  return context;
}

export function useMessages() {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('Cannot find MessagesProvider');
  }
  return context;
}

export function useSetMessages() {
  const context = useContext(SetMessagesContext);
  if (!context) {
    throw new Error('Cannot find SetMessagesProvider');
  }
  return context;
}
