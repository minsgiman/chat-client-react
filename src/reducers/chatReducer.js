import * as types from './../actions/types'

const INITIAL_STATE = {
    userId: null,
    currentRoom: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.USER_ID_CHANGE:
            return {
                ...state, userId: action.userId
            };
        case types.CURRENT_ROOM_CHANGE:
            return {
                ...state, currentRoom: action.currentRoom
            };
        default:
            return state;
    }
}