import React, { Component } from 'react';
import { 
    Page
    , Toolbar
    , ToolbarButton
    , Icon
    , Checkbox
    , ListItem
    , List
    , ListHeader
    , Button
    , Range
    , Carousel
    , CarouselItem
} from 'react-onsenui';

import RadioSelect from '../components/RadioSelect.jsx';
import SelectDurationRange from '../components/SelectDurationRange.jsx';
import SelectYearsRange from '../components/SelectYearsRange.jsx';
import Checkboxes from '../components/Checkboxes.jsx';
import SortBy from '../components/SortBy.jsx';
import MovieList from '../components/MovieList.jsx';

import api from '../api/api';
const paddingBottom = {
    paddingBottom: '50px'
}

export default class Home extends Component {
    constructor(){
        super(...arguments);
        this.getMovies = this.getMovies.bind(this);
        this.handleNext = this.handleNext.bind(this);        
        this.handleChange = this.handleChange.bind(this);      
        this.onTypeSelection = this.onTypeSelection.bind(this);
        this.onYearsSelected = this.onYearsSelected.bind(this);
        this.onDurationSelected = this.onDurationSelected.bind(this);
        this.onGenresSelected = this.onGenresSelected.bind(this);
        this.state = {
            genresMap: {},
            config: {},
            query: {
                locale: navigator.language,
                selectedType: 'movies',
                selectedGenres: [],
                selectedDurationRange: [0, 0],
                selectedYearsRange: [0, 0],
                selectedSorting: null // mostRecent, mostPopular, mostPopularCritic
            },
            carouselIndex: 0,
            isFetching: false,
            movies: []
        };
    }
    
    async componentDidMount() {
        const [ config, genresMap ] = await Promise.all([ api.getConfig(), api.getGenresMap({ locale: this.state.query.locale }) ]);
        this.setState({ config, genresMap });
    }

    getMovies(){
        this.setState({ isFetching: true });
        api.discover(this.state.query)
            .then(data => {                
                this.setState({
                    isFetching: false,
                    movies: data.results 
                });
            }).catch(reason => {
                this.setState({ isFetching: false });
            });
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className='center'>Suggest Me a Movie!</div>
            </Toolbar>
        );
    }

    handleChange(e) {
        //this.setState({ carouselIndex: e.activeIndex });
    }

    handleNext() {        
        this.setState({ carouselIndex: this.state.carouselIndex + 1 }, () => {
            if (this.state.carouselIndex === 3) { this.getMovies(); }
        });
    }

    onGenresSelected(genres) {
        const genresIds = genres.map(genre => this.state.genresMap[genre]);
        const newQuery = Object.assign({}, this.state.query, { selectedGenres: genresIds });        
        this.setState({ query:  newQuery });
    }

    onTypeSelection(selectedType) {
        const newQuery = Object.assign({}, this.state.query, { selectedType });
        this.setState({ query:  newQuery });
    }

    onYearsSelected(selectedYearsRange) {
        const newQuery = Object.assign({}, this.state.query, { selectedYearsRange });
        this.setState({ query: newQuery });
    }

    onDurationSelected(selectedDurationRange) {
        const newQuery = Object.assign({}, this.state.query, { selectedDurationRange });
        this.setState({ query: newQuery });
    }
    
    render() {
        const { innerHeight } = window;
        const carouselHeight = innerHeight - 44;
        let carouselStyle = { height: `${carouselHeight}px` };

        if(this.state.carouselIndex === 1 || this.state.carouselIndex === 2) { 
            carouselStyle = Object.assign({}, paddingBottom, carouselStyle);
        } else {
            carouselStyle = paddingBottom;
        }

        return (
            <Page renderToolbar={this.renderToolbar}>                    
                <Carousel onPostChange={this.handleChange} index={this.state.carouselIndex} overscrollable autoScroll centered style={carouselStyle}>
                    <CarouselItem>
                        <Checkboxes data={Object.keys(this.state.genresMap)} title={'Choose the genres'} onSelected={this.onGenresSelected} />
                    </CarouselItem>
                    <CarouselItem>
                        <SelectYearsRange onSelected={this.onYearsSelected} />                        
                    </CarouselItem>
                    <CarouselItem>
                        <SelectDurationRange onSelected={this.onDurationSelected} />
                    </CarouselItem>
                    <CarouselItem>
                        <MovieList movies={this.state.movies} config={this.state.config} />
                    </CarouselItem>                    
                </Carousel>
                <div style={{ display: 'flex', flexDirection: 'row', position: 'fixed', bottom:'0', width: '100%' }}>                    
                    <div style={{ margin: '6px', width: '100%'}}>
                        <Button modifier='large' disabled={ this.state.carouselIndex === 3 } onClick={this.handleNext}>Next</Button>
                    </div>
                </div>
            </Page>       
        );
    }
}
/*
<div style={{ display: 'flex', flexDirection: 'row', position: 'fixed', bottom:'0', width: '100%' }}>
    <div style={{ margin: '6px', width: '50%' }}>
        <Button modifier='large' disabled={ this.state.carouselIndex === 0 } onClick={this.handlePrev}>Prev</Button>                    
    </div>
    <div style={{ margin: '6px', width: '50%'}}>
        <Button modifier='large' disabled={ this.state.carouselIndex === 4 } onClick={this.handleNext}>Next</Button>
    </div>
</div>
*/