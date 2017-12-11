import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Page
    , Toolbar
    , ToolbarButton
    , Icon
    , ListItem
    , List
    , ListHeader
    , Button
    , Carousel
    , CarouselItem
} from 'react-onsenui';

import * as Actions from '../actions';

import Checkboxes from '../components/Checkboxes.jsx';
import RadioSelect from '../components/RadioSelect.jsx';
import SelectDurationRange from '../components/SelectDurationRange.jsx';
import SelectYearsRange from '../components/SelectYearsRange.jsx';
import MovieList from './MovieList.jsx';

const paddingBottom = {
    paddingBottom: '50px'
}

export class Home extends Component {
    constructor() {
        super(...arguments);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.onTypeSelection = this.onTypeSelection.bind(this);
        this.onYearsSelected = this.onYearsSelected.bind(this);
        this.onDurationSelected = this.onDurationSelected.bind(this);
        this.onGenresSelected = this.onGenresSelected.bind(this);
        this.getMovies = this.getMovies.bind(this);
        this.state = {
            query: {
                selectedGenres: [],
                selectedDurationRange: [0, 60 * 4],
                selectedYearsRange: [1900, new Date().getFullYear()],
                selectedSorting: null // mostRecent, mostPopular, mostPopularCritic
            },
            carouselIndex: 0
        };
    }

    handleNext() {        
        this.setState({ carouselIndex: this.state.carouselIndex + 1 });
    }

    onGenresSelected(genres) {
        const genresIds = genres.map(genre => this.props.genresMap[genre]);
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

    getMovies() {
        const { navigator } = this.props;
        this.props.actions.getMovies(this.state.query);
        navigator.pushPage(
            { component: MovieList, key: 'MOVIES_PAGE' }
        );
        // this.setState({ carouselIndex: 0 });
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className='center'>Suggest Me a Movie!</div>
            </Toolbar>
        )
    }

    render() {
        const { innerHeight } = window;
        const carouselHeight = innerHeight - 44;
        let carouselStyle = { height: `${carouselHeight}px` };

        if(this.state.carouselIndex !== 0) { 
            carouselStyle = Object.assign({}, paddingBottom, carouselStyle);
        } else {
            carouselStyle = paddingBottom;
        }
        return (
            <Page renderToolbar={this.renderToolbar}>
                <Carousel onPostChange={this.handleChange} index={this.state.carouselIndex} overscrollable autoScroll centered style={carouselStyle}>
                    <CarouselItem>
                        <Checkboxes data={Object.keys(this.props.genresMap)} title={'Choose the genres'} onSelected={this.onGenresSelected} />
                    </CarouselItem>
                    <CarouselItem>
                        <SelectYearsRange onSelected={this.onYearsSelected} />                        
                    </CarouselItem>
                    <CarouselItem>
                        <SelectDurationRange onSelected={this.onDurationSelected} />
                    </CarouselItem>                    
                </Carousel>
                <div style={{ display: 'flex', flexDirection: 'row', position: 'fixed', bottom:'0', width: '100%' }}>                    
                    <div style={{ margin: '6px', width: '100%'}}>
                        {
                        (this.state.carouselIndex === 2) ? 
                        <Button modifier='large' onClick={this.getMovies}>Get Movies!</Button> :
                        <Button modifier='large' onClick={this.handleNext}>Next</Button>
                        }
                    </div>
                </div>
            </Page>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(Actions, dispatch)
    };
};

const mapStateToProps = (state) => {
    return {
        genresMap: state.appReducer.genresMap,
    };
};
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);