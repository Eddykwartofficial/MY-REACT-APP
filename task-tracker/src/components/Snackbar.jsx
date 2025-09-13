import { useEffect, useState } from 'react';
import useMessageStore from '../store/useMessageStore';

function Snackbar() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const unsubscribe = useMessageStore.subscribe(
      ({ message, messageType }) => {
        setMessage(message);
        setMessageType(messageType);
        const timer = setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 3000); // Message disappears after 3 seconds
        return () => clearTimeout(timer);
      }
    );

    return () => unsubscribe();
  }, []);

  if (!message) return null;

  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${
      messageType === 'success' ? 'bg-green-700' : 'bg-red-700'
    } bg-opacity-70 p-4 rounded text-white`}>
      <p>{message}</p>
    </div>
  );
}

export default Snackbar;
