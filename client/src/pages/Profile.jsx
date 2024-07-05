import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from '../redux/user/userSlice';

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
  try {
    const res = await fetch('/api/auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Optionally include any necessary body data if required
    });
    if (res.ok) {
      // Clear client-side session data (e.g., localStorage, cookies)
      localStorage.clear();  // Example: Clear localStorage
      // Redirect or update state to reflect signed-out state
      console.log('Successfully signed out');
    } else {
      console.error('Sign-out failed:', res.statusText);
    }
  } catch (error) {
    console.error('Error signing out:', error.message);
  }
};

  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <div className='flex flex-col gap-4'>
        <p className='text-center text-lg font-semibold'>
          Username: {currentUser.username}
        </p>
        <p className='text-center text-sm text-gray-500'>
          Email: {currentUser.email}
        </p>
      </div>
      <div className='flex justify-center mt-5'>
        <button
          onClick={handleSignOut}
          className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
        >
          Sign Out
        </button>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
    </div>
  );
}
