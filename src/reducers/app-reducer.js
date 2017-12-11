import { 
    GET_CONFIG_SUCCESS,
    GET_GENRES_SUCCESS,
    SET_LANGUAGE
} from '../actions';

const initialState = {
    localization: 'en-US',
    genresMap: {},
    config: {},
}

export default function app(state = initialState, action) {
    switch (action.type) {
        case GET_CONFIG_SUCCESS:
            return Object.assign({}, state, { config: action.payload });
        case GET_GENRES_SUCCESS:
            return Object.assign({}, state, { genresMap: action.payload });
        case SET_LANGUAGE:
            return Object.assign({}, state, { localization: action.payload });
        default:
            return state;
    }
}