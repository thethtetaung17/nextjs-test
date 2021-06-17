import Head from 'next/head';
import Image from 'next/image';
import { useRef, useState } from 'react';
import firebase from 'firebase/app';
import { users, sampleChatHistory } from '../../utils/data';
import Message from '../message';
import { useFirestoreQuery } from '../hooks/hooks';
import { v4 as uuid } from 'uuid';

const ChatCard = ({ currentUserId }: any) => {
    const db = firebase.firestore();
    const messagesRef = db.collection('messages')
    const filteredUser = users.filter(user => user.id != currentUserId);
    const [selected, setSelected] = useState(filteredUser[0]);
    const myMessages = useFirestoreQuery(messagesRef.where('senderId', '==', currentUserId).where('receiverId', '==', selected.id).orderBy('createdAt', 'desc').limit(100));
    const otherMessages = useFirestoreQuery(messagesRef.where('senderId', '==', selected.id).where('receiverId', '==', currentUserId).orderBy('createdAt', 'desc').limit(100));
    const messages = [...myMessages, ...otherMessages];
    console.log(messages);

    const [newMessage, setNewMessage] = useState('');

    const inputRef = useRef();
    const bottomListRef = useRef();

    const handleOnChange = e => {
        setNewMessage(e.target.value);
    };

    const handleOnSubmit = e => {
        e.preventDefault();

        const trimmedMessage = newMessage.trim();
        if (trimmedMessage) {
            // Add new message in Firestore
            messagesRef.add({
                id: uuid(),
                text: trimmedMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                users: [currentUserId, selected.id],
                senderId: currentUserId,
                receiverId: selected.id
            });
            // Clear input field
            setNewMessage('');
            // Scroll down to the bottom of the list
            bottomListRef?.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col w-full sm:w-5/6 h-full sm:h-5/6 sm:rounded-lg shadow-md drop-shadow-lg">
            <Head>
                <title>Chats</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="flex w-full sm:rounded-t-lg h-14 bg-blue-400 justify-start items-center p-4">
                <span className="flex text-white text-lg">Chats</span>
                {/* <span className="flex text-white text-lg w-full">{selected.name}</span> */}
            </div>
            <div className="flex flex-row w-full h-full">
                <div className="flex flex-col p-2 w-max sm:w-2/6 bg-white rounded-bl-lg">
                    {
                        filteredUser.map((user, index) =>
                            <div key={user.id}>
                                <div className="flex flex-row h-14 w-max sm:w-full px-2 my-1 items-center cursor-pointer hover:bg-gray-100 ">
                                    <Image
                                        width={50}
                                        height={50}
                                        objectFit='cover'
                                        src={user.photo}
                                        alt={user.username}
                                        className="rounded-full h-4 w-4"
                                    />
                                    <h2 className="pl-2 hidden sm:flex">{user.name}</h2>
                                </div>
                                {index < users.length && <div className="h-0.5 w-full bg-gray-200" />}
                            </div>
                        )
                    }
                </div>
                <div className="h-full w-0.5 bg-gray-200" />
                <div className="bg-white w-full h-full overflow-auto sm:rounded-br-lg p-5 h-full bg-red-100">
                    <ul>
                        {messages?.sort((first, second) =>
                            first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
                        )
                            ?.map(message => (
                                <li key={message?.id}>
                                    <Message {...message} currentUserId={currentUserId} />
                                </li>
                            ))}
                    </ul>
                    <div ref={bottomListRef} />
                    <div className="mb-6 mx-4">
                        <form
                            onSubmit={handleOnSubmit}
                            className="flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={newMessage}
                                onChange={handleOnChange}
                                placeholder="Type your message here..."
                                className="flex-1 bg-transparent outline-none"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage}
                                className="uppercase font-semibold text-sm tracking-wider text-blue-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                Send
          </button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ChatCard
