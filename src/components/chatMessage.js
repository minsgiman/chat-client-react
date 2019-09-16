import React from 'react'

function ChatMessage(props) {
    return (
        <div className="message_wrap">
            {props.type === 'img' && (
                <div className="img_wrap">
                    <span className="sender">{props.sender} : </span>
                    <img src={props.content} />
                </div>
            )}
            {props.type === 'text' && (
                <div className="text_wrap">
                    <p>
                        <span className="sender">{props.sender} : </span>
                        <span>{props.content}</span>
                    </p>
                </div>
            )}
            {props.type === 'noti' && (
                <div className="noti_wrap">
                    <p>
                        <span className="content">{props.content}</span>
                    </p>
                </div>
            )}
        </div>
    )
}

export default ChatMessage