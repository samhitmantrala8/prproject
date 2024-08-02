import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from '../redux/user/userSlice';

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [chatHistory, setChatHistory] = useState([]);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        localStorage.clear();  // Clear localStorage
        dispatch(signOutUserStart());
        window.location.reload();
        console.log('Successfully signed out');
      } else {
        console.error('Sign-out failed:', res.statusText);
      }
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  // Fetch chat history when component mounts
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/user/chat-history', {
          method: 'GET',
          credentials: 'include',  // Include cookies with the request
        });
        if (res.ok) {
          const data = await res.json();
          console.log('Fetched chat history:', data);  // Check if data is as expected
          setChatHistory(data);
        } else {
          console.error('Failed to fetch chat history:', res.statusText);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error.message);
      }
    };
  
    fetchChatHistory();
  }, []);



  // Access nested user data if it exists
  const username = currentUser?.user?.username || 'Not available';
  const email = currentUser?.user?.email || 'Not available';

  return (
    <div className='p-5 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <div className='flex flex-col gap-4'>
        <p className='text-center text-lg font-semibold'>
          Username: {username}
        </p>
        <p className='text-center text-sm text-gray-500'>
          Email: {email}
        </p>
      </div>

      {/* Chat History Section */}
      <div className='mt-5 border rounded-lg bg-gray-100 p-6 h-80 overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-2'>Chat History</h2>
        <div className='space-y-2'>
          {chatHistory.map((msg, index) => (
            <div key={index} className={`message ${msg.user_email === email ? 'text-right' : 'text-left'}`}>
              {msg.user_message && (
                <div className={`p-3 rounded-lg inline-block ${msg.user_email === email ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  <p>{msg.user_message}</p>
                </div>
              )}
              {msg.bot_response && (
                <div className={`p-3 rounded-lg inline-block ${msg.user_email !== email ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
                  <p>{msg.bot_response}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center mt-5'>
        <button
          onClick={handleSignOut}
          className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
        >
          Sign Out
        </button>
      </div>
      {error && <p className='text-red-700 mt-5'>{error}</p>}
    </div>
  );
}
