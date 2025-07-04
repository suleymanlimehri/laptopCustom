import { useState } from 'react';
import './Chat.css';
import ChatModal from './Chat';
import ChatIcon from '@mui/icons-material/Chat';
export default function ChatButton() {
  const [open, setOpen] = useState(false);

  const toggleChat = () => {
    setOpen(!open);
  };

  return (
    <>
      <button
        className={`chat-launcher ${open ? 'open' : ''}`}
        onClick={toggleChat}
        title={open ? 'Close Chat' : 'Open Chat'}
      >
        {open ? '❌' :  <ChatIcon/>}
      </button>
      {open && <ChatModal onClose={() => setOpen(false)} />}
    </>
  );
}
