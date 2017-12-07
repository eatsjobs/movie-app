const endPoint = 'https://api.themoviedb.org/3';
const apiKey = 'e16756f3e61bb58735bb4df43930bde7';

// https://api.themoviedb.org/3/discover/movie?api_key=e16756f3e61bb58735bb4df43930bde7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1
async function discover(query) {
    try {
        const searchParams = new URLSearchParams('sort_by=popularity.desc&include_adult=false&include_video=true&page=1');
        searchParams.set('vote_average.gte', 6);
        searchParams.set('api_key', apiKey);
        searchParams.set('language', `${query.locale}-${query.locale.toUpperCase()}`);
        searchParams.set('with_genres', query.selectedGenres.join(','));
        searchParams.set('primary_release_date.gte', query.selectedYearsRange[0]);
        searchParams.set('primary_release_date.lte', query.selectedYearsRange[1]);
        searchParams.set('with_runtime.gte', query.selectedDurationRange[0]);
        searchParams.set('with_runtime.lte', query.selectedDurationRange[1]);
    
        const response = await fetch(`${endPoint}/discover/movie?${searchParams.toString()}`);
        const data = response.json();
        return data;
    } catch(e) {
        console.log(e);
    }
}

async function getConfig() {
    const searchParams = new URLSearchParams();
    searchParams.set('api_key', apiKey);
    const response = await fetch(`${endPoint}/configuration?${searchParams.toString()}`);
    return response.json();
}

async function getGenresMap(query) {
    const searchParams = new URLSearchParams();
    searchParams.set('api_key', apiKey);
    searchParams.set('language', query.locale);
    const response = await fetch(`${endPoint}/genre/movie/list?${searchParams.toString()}`);
    const responseParsed = await response.json();
    return responseParsed.genres.reduce((accumulator, current) => { accumulator[current.name] = current.id; return accumulator; }, {});
}

export default {
    getConfig,
    getGenresMap,
    discover,
}
