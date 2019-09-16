const eventBus = {
        events: {},
        dispatch: function (event, data) {
            if (!this.events[event]) return;
            this.events[event].forEach(callbackObj => callbackObj.callback(data))
        },
        subscribe: function (event, callbackObj) {
            if (!this.events[event]) this.events[event] = [];
            this.events[event].push(callbackObj);
        },
        unsubscribe: function (event, callbackId) {
            if (!this.events[event]) return;
            let i, len = this.events[event].length;
            for (i = 0; i < len; i+=1) {
                if (this.events[event][i].id === callbackId) {
                    this.events[event].splice(i, 1);
                    return;
                }
            }
        }
    }, EVENT = {
        LOGIN_RESULT : 'login-result',
        GET_ROOM_LIST : 'get-room-list',
        CREATE_ROOM : 'create-rooom',
        ENTER_ROOM : 'enter-room',
        LEAVE_ROOM : 'leave-room',
        CHAT_MESSAGE_PUSH : 'chat-message-push',
        CHAT_MESSAGE_RES : 'chat-message-res',
        INVITE_PUSH : 'invite-push',
        INVITE_RES : 'invite-res',
        INVITE_ACCEPT : 'invite-accept'
    };

export { eventBus, EVENT };