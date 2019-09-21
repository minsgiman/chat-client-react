import React from 'react'

function ChatMessage({type, sender, content}) {
    return (
        <div className="message_wrap">
            {type === 'img' && (
                <div className="img_wrap">
                    <span className="sender">{sender} : </span>
                    <img src={content} />
                </div>
            )}
            {type === 'text' && (
                <div className="text_wrap">
                    <p>
                        <span className="sender">{sender} : </span>
                        <span>{content}</span>
                    </p>
                </div>
            )}
            {type === 'noti' && (
                <div className="noti_wrap">
                    <p>
                        <span className="content">{content}</span>
                    </p>
                </div>
            )}
        </div>
    )
}

export default ChatMessage