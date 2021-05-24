import initFirebase from '../firebase/initFirebase';
import ChatCard from '../components/cards';
import { useState } from 'react';
import { users } from '../utils/data';

initFirebase();

const Home = () => {
  const [loggedInUserId, setLoggedInUserId] = useState('');
  const [username, setUsername] = useState('tha');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOnSubmit = () => {
    if (username.length > 0) {
      const loggedInUser = users.find(user => user.username === username);
      if (loggedInUser) {
        setLoggedInUserId(loggedInUser.id);
        setIsLoggedIn(true);
      }
      // users.forEach(user => {
      //   if (user.username === username) {
      //     setLoggedInUserId(user.id);
      //     setIsLoggedIn(true)
      //   }
      // });
    }
  }

  return (
    <>
      <div className="flex flex-col h-screen w-full justify-center items-center bg-blue-300 ">
        {!isLoggedIn &&
          <div className="flex flex-col w-full sm:w-3/6 h-3/6 sm:rounded-lg shadow-md drop-shadow-lg justify-center items-center bg-white">
            <span className="text-3xl text-blue-500 font-serif p-2">Login</span>
            <input type='text' value={username} onChange={e => setUsername(e.target.value)} className="border p-3 w-4/5 mt-5" placeholder='Enter username' autoFocus />
            <button type='submit' className="bg-blue-500 px-5 py-2 mt-5 rounded-md w-2/6 text-white" onClick={handleOnSubmit}>Login</button>
          </div>
        }
        {isLoggedIn && <ChatCard currentUserId={loggedInUserId} />}
      </div>
    </>
  )
}

export default Home;