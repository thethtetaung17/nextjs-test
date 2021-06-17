import Image from 'next/image';
import { users } from '../../utils/data';


const Message = ({
    currentUserId,
    senderId,
    createdAt = null,
    text = '',
}: any) => {
    const sender = users.find(user => user.id === senderId);
    const isMyMsg = currentUserId === senderId;
    return (
        <div className={"flex flex-row p-2 m-1"}>
            { !isMyMsg ?
                <Image
                    src={sender?.photo}
                    width={50}
                    height={50}
                    objectFit="cover"
                    className="rounded-full h-4 w-4"
                /> :
                null
            }
            <div className="flex flex-col max-w-4/6 ml-2">
                <span className="text-lg text-blue-400 text-bold">{sender?.name}</span>
                <span>{text}</span>
                <span className="text-sm text-gray-200">{new Date(createdAt).toLocaleString()}</span>
            </div>
        </div>
    )
}

export default Message
