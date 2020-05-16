import * as actionTypes from '../../actions/auth';
import { updateObject } from '../../../utils/common';

const initialState = {
    AUTH_TOKEN: null,
    USER: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_AUTH:
            return updateObject(state, {AUTH_TOKEN: action.token})
        case actionTypes.DELETE_AUTH:
            return updateObject(state, {AUTH_TOKEN: null})
        case actionTypes.ADD_USER:
            return updateObject(state, {USER: action.user})
        case actionTypes.DELETE_USER:
                return updateObject(state, {USER: null})
        default:
            return state;
    }
};

export default reducer;