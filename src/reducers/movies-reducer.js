import { 
    GET_MOVIES,
    GET_MOVIES_SUCCESS
} from '../actions';

const initialState = {
    isFetching: false,
    queryHistory: [],
    query: {
        selectedGenres: [],
        selectedDurationRange: [0, 180],
        selectedYearsRange: [1960, new Date().getFullYear()],
        selectedSorting: null // mostRecent, mostPopular, mostPopularCritic
    },
    movies: []
}

export default function app(state = initialState, action) {
    switch (action.type) {
        case GET_MOVIES:
            return Object.assign({}, state, { isFetching: true });
        case GET_MOVIES_SUCCESS:
            return Object.assign({}, state, { movies: action.payload, isFetching: false });
        default:
            return state;
    }
}