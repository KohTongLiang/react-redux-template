import { put, takeEvery, call } from 'redux-saga/effects'
import { AsyncStorage } from 'AsyncStorage'
import axios from 'axios'
import { SIGN_IN, SIGN_UP, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    SIGN_OUT_FAILURE, SIGN_OUT_SUCCESS, SIGN_OUT, CHECK_AUTH } from '../Constants/actiontype'

export default function* AuthSaga() {
    yield takeEvery(SIGN_UP, handleSignUp)
    yield takeEvery(SIGN_IN, handleSignIn)
    yield takeEvery(SIGN_OUT, handleSignOut)
    yield takeEvery(CHECK_AUTH, handleCheckAuth)
}

const api_url = process.env.REACT_APP_API_ENDPOINT

// make a call to authentication server and get back a JWT.
function* handleSignIn(action) {
    try {
        const resp = yield call(() => axios.post(`${api_url}/auth/login`, {
            username: action.payload.username,
            password: action.payload.password,
        }).then(function (data) {
            return data;
        }));

        if (resp.data.success) {
            yield call(storeToken, resp.data.token)
            yield put({
                type: SIGN_IN_SUCCESS, payload: {
                    username: action.payload.username,
                }
            });
        } else {
            yield put({ type: SIGN_IN_FAILURE, payload: "Error authentication user." });
        }
    } catch (err) {
        yield put({ type: SIGN_IN_FAILURE, payload: err.message });
    }
}

// Handler to perform sign up action. Takes input by user and create a user account on firebase authentication service
function* handleSignUp(action) {
    try {
        const resp = yield call(() => axios.post(`${api_url}/auth/register`, {
            email: action.payload.email,
            name: action.payload.username,
            password: action.payload.password,
        }).then(function (data) {
            return data;
        }));

        if (resp.data.success) {
            yield call(storeToken, resp.data.token)
            yield put({
                type: SIGN_UP_SUCCESS, payload: {
                    username: action.payload.username,
                }
            });
        } else {
            yield put({ type: SIGN_UP_FAILURE, payload: "Error registering user." });
        }
    } catch (err) {
        yield put({ type: SIGN_UP_FAILURE, payload: err.message });
    }
}

function* handleSignOut(action) {
    try {
        let token = yield call(getToken)
        const resp = yield call(() => axios.get(`${api_url}/auth/logout`,
            {
                headers: { 'Authorization': `Bearer ${token}`}
            }
        ).then(data => {
            return data
        }))

        if (resp.data.success) {
            yield call(storeToken, '')
            yield put({ type: SIGN_OUT_SUCCESS })
        }
    } catch (err) {
        yield put({ type: SIGN_OUT_FAILURE, payload: err.message })
    }
}

function* handleCheckAuth(action) {
    try {
        let token = yield call(getToken)
        const resp = yield call(() => axios.get(`${api_url}/auth/me`,
            {
                headers: { 'Authorization': `Bearer ${token}`}
            }
        ).then(data => {
            return data
        }).catch(err => { 
            return null
        }))
        
        if(resp !== null) {
            yield put({
                type: SIGN_IN_SUCCESS, payload: {
                    username: resp.data.username,
                }
            });
        }
    } catch (err) {
        console.log(err)
        yield put({ type: SIGN_IN_FAILURE, payload: err.message })
    }
}

async function storeToken(token) {
    try {
        await AsyncStorage.setItem('token', token)
    } catch (err) {
        console.log('Error storing token ', err)
    }
}

async function getToken() {
    try {
        return await AsyncStorage.getItem('token')
    } catch (err) {
        console.log('Error retrieving token ', err)
    }
}