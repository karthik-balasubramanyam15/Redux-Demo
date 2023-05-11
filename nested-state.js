const redux = require('redux');
const createStore = redux.createStore;
const produce = require('immer').produce;

//Step1 : make initial State
const initialState = {
    name: 'Karthik',
    address: {
        street: '1234 main road',
        city: 'bentonville',
        state: 'AR'
    },
};

//Step2: create constant action type
const CITY_UPDATED = 'CITY_UPDATED';

//Step3: define action creator to update the state 
const updateCity = (city) => {
    return {
        type: CITY_UPDATED,
        payload: city
    }
}

//Step4: create reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CITY_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         city: action.payload
            //     }
            // }
            //its hard to keep track of nested state and here's why immer.produce comes to our aid
            return produce(state, (draft) => {
                draft.address.city = action.payload;
            })
        default: {
            return state;
        }
    }
}


//Step 5: Create store, dispatch actions
const store = createStore(reducer);
console.log('Initial state: ', store, store.getState());
const unsubscribe = store.subscribe(() => {
    console.log('Updated State: ', store.getState());
})
store.dispatch(updateCity('benton county'));
unsubscribe();

