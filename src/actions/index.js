import api from '../api';

export const GET_CONFIG = 'GET_CONFIG';
export const GET_CONFIG_SUCCESS = 'GET_CONFIG_SUCCESS';

export const GET_GENRES = 'GET_GENRES';
export const GET_GENRES_SUCCESS = 'GET_GENRES_SUCCESS';

export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const GET_MOVIES_ERROR = 'GET_MOVIES_ERROR';

export const SET_LANGUAGE = 'SET_LANGUAGE';

export function receivedConfig(config) {
    return {
        payload: config,
        type: GET_CONFIG_SUCCESS
    }
}

export function setLanguage(language) {
    return {
        payload: language,
        type: SET_LANGUAGE
    }
}

export function receivedGenres(genres) {
    return {
        payload: genres,
        type: GET_GENRES_SUCCESS
    }
}

export function receivedMovies(movies) {
    return {
        payload: movies,
        type: GET_MOVIES_SUCCESS
    }
}

export function getConfig() {
    return (dispatch, getState) => {
       return api.getConfig()
       .then(config => dispatch(receivedConfig(config)));
    }
}

export function getLanguage() {
    return (dispatch, getState) => {
        return api.getLanguage().then(language => {
            dispatch(setLanguage(language));
        });
    }
}


export function getGenres() {
    return (dispatch, getState) => {
        const { appReducer } = getState();
        return api.getGenresMap({ locale: appReducer.localization })
            .then(config => dispatch(receivedGenres(config)));
    }
}

export function getMovies(query) {
    return (dispatch, getState) => {
        const { appReducer } = getState();
        query.locale = appReducer.localization;
        dispatch({ type: GET_MOVIES });
        return api.discover(query)
            .then(data => {
                dispatch(receivedMovies(data.results))
            })
            .catch(reason => {
                dispatch({ type: GET_MOVIES_ERROR, payload: reason.toString() });
            });
    }
}
