const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers


const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCK = 'CAKE_RESTOCK';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

//Action creator is a function that returns an object
function orderCake() {
    //an action is an object that has type property
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
}

//Action to restock the cake
function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCK,
        payload: qty  //renaming quantity to payload, to follow the redux convention
    }
}

//Action for icecream ordered and restocked
function orderIcecream() {
    return {
        type: ICECREAM_ORDERED,
        payload: 1
    }
}

function restockIcecream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

//application state 
//**** if the number of variables in initial state increases then the redux complexity also increases
// const initialState = {
//     numberOfCakes: 10,
//     numberOfIcecreams: 25,
// }

const initialCakeState = {
    numberOfCakes: 10,
}

const initialIcecreamState = {
    numberOfIcecreams: 20,
}


//separation of concerns
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED: return {
            ...state,
            numberOfCakes: state.numberOfCakes - 1,
        };

        //adding case for restock
        case CAKE_RESTOCK: return {
            ...state,
            numberOfCakes: state.numberOfCakes + action.payload,
        }
        default: return state;
    }
}

const icecreamReducer = (state = initialIcecreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED: return {
            ...state,
            numberOfIcecreams: state.numberOfIcecreams - 1,
        }
        case ICECREAM_RESTOCKED: return {
            ...state,
            numberOfIcecreams: state.numberOfIcecreams + action.payload,
        }
        default: return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer
})

//Even when there are multiple reducers, store can only accept 1 reducer 
//and hence we combine the reducer and pass that to the store
const store = createStore(rootReducer);
console.log('Initial State: ', store.getState());

const unsubscribe = store.subscribe(() => console.log('updated state: ', store.getState()));

const actions = bindActionCreators({
    orderCake,
    restockCake,
    orderIcecream,
    restockIcecream,
}, store.dispatch); // we can bind the actions to actionCreators and it wrapped to dispatch calls
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(5);

actions.orderIcecream();
actions.orderIcecream();
actions.restockIcecream(5);

unsubscribe();





