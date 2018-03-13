import { 
    GET_MOVIES,
    GET_MOVIES_SUCCESS,
    SET_DURATION_RANGE,
    SET_YEARS_RANGE,
    SET_SELECTED_GENRES,
} from '../actions';

const initialState = {
    isFetching: false,
    queryHistory: [],
    page: 1,
    query: {
        selectedGenres: [],
        selectedDurationRange: [0, 180],
        selectedYearsRange: [1960, new Date().getFullYear()],
        selectedSorting: null // mostRecent, mostPopular, mostPopularCritic
    },
    movies: []
}


export default function app(state = initialState, action) {
    let newQuery = {};
    switch (action.type) {
        case SET_DURATION_RANGE:
            newQuery = Object.assign({}, state.query, { selectedDurationRange: action.payload });
            return Object.assign({}, state, { query: newQuery });
        case SET_SELECTED_GENRES:
            newQuery = Object.assign({}, state.query, { selectedGenres: action.payload });
            return Object.assign({}, state, { query: newQuery });
        case SET_YEARS_RANGE:
            newQuery = Object.assign({}, state.query, { selectedYearsRange: action.payload });
            return Object.assign({}, state, { query: newQuery });
        case GET_MOVIES:
            return Object.assign({}, state, { isFetching: true });
        case GET_MOVIES_SUCCESS:
            return Object.assign({}, state, {
                page: action.payload.page,
                movies: [...state.movies, ...action.payload.results],
                isFetching: false, 
                totalPages: action.payload.total_pages, 
                totalResults: action.payload.total_results 
            });
        default:
            return state;
    }
}