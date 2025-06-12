import Messages from "./Messages"

const MessageContainer = () => {
    return (
        <div className='md:min-w-[450px] flex-col flex'>
            <>
                {/* Header */}
                <div className='label-text'>To:
                    <span className='text-gray-900 font-bold'>Username</span>
                </div>

                <Messages />
            </>

        </div>
    )
}

export default MessageContainer