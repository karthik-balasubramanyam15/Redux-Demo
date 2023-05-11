//5
const redux = require('redux');
const createStore = redux.createStore;

//6
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios');

//1
const initialState = {
    loading: false,
    users: [],
    error: ''
}

//2
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR'

//3
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersError = (error) => {
    return {
        type: FETCH_USERS_ERROR,
        payload: error
    }
}

//4
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: ''
            }
        case FETCH_USERS_ERROR:
            return {
                ...state,
                error: action.payload,
                users: [],
                loading: false
            }
        default: return {
            state
        }
    }
}

//5
const store = createStore(reducer, applyMiddleware(thunkMiddleware));


//7
const fetchUsers = () => {
    return function (dispatch) {

        dispatch(fetchUsersRequest())

        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map((user) => user.name);
                dispatch(fetchUsersSuccess(users));
            })
            .catch((error) => {
                dispatch(fetchUsersError(error.message));
            })
    }
}

store.subscribe(() => {
    console.log(store.getState())
});

store.dispatch(fetchUsers())