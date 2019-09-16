import * as types from './types'

function idChange(id) {
    return {
        type: types.USER_ID_CHANGE,
        userId: id
    };
}

function roomChange(roomObj) {
    return {
        type: types.CURRENT_ROOM_CHANGE,
        currentRoom: roomObj
    }
}

export {idChange, roomChange}