const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators


const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCK = 'CAKE+RESTOCK';

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

//application state
const initialState = {
    numberOfCakes: 10,
}



//reducer
// (previousState, action) => newState

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED: return {
            ...state, //there can be multiple states in initialState and in this scenario we are only 
            //changing 1 properties value, so we first copy the state value as it is and then change 
            //whatever property value required for this switch case.
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

//Redux Store
//1. Holds application state
//2. allows access to state via getState()
//3. allows state to be updated via dispatch(action)
//4. registers listeners via subscribe(listener)
//5. handles unregistering of listeners via the method returned by the subscribe(listeners)
const store = createStore(reducer);
console.log('Initial State: ', store.getState());

const unsubscribe = store.subscribe(() => console.log('updated state: ', store.getState()));

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actions = bindActionCreators({ orderCake, restockCake }, store.dispatch); // we can bind the actions to actionCreators and it wrapped to dispatch calls
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(5);

unsubscribe();





