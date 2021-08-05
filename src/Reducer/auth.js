import { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SIGN_IN_FAILURE,
    SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE } from '../Constants/actiontype';

const initialState = {
    auth: false,
    username: '',
    errorMsg: '',
}

export default function AuthReducer (state = initialState, action) {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return Object.assign({}, state, {
                username: initialState.username.concat(action.payload.username),
                auth: !initialState.auth,
            });
        case SIGN_UP_SUCCESS:
            return Object.assign({}, state, {
                username: initialState.username.concat(action.payload.username),
                auth: !initialState.auth,
            });
        case SIGN_IN_FAILURE:
            return Object.assign({}, state, {
                errorMsg: initialState.errorMsg.concat(action.payload)
            });
        case SIGN_UP_FAILURE:
            return Object.assign({}, state, {
                errorMsg: initialState.errorMsg.concat(action.payload)
            });
        case SIGN_OUT_SUCCESS:
            return initialState;
        case SIGN_OUT_FAILURE:
            return Object.assign({}, state, {
                errorMsg: initialState.errorMsg.concat(action.payload)
            });
    };

    return state;
}