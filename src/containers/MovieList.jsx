import React, { Component } from 'react';
import { 
    Card
    , Button
    , List
    , ListHeader
    , ListItem
    , Icon
    , Page
    , Toolbar
    , Carousel
    , CarouselItem
    , BackButton
} from 'react-onsenui';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../actions';

export class MovieList extends Component {
    constructor() {
        super(...arguments);
        this.handleChange = this.handleChange.bind(this);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.currentPage = 1;
        this.state = {
            itemsPerPage: 20,
            prevIndex: -1,
            index: 0
        }
    }
    
    handleChange(e) {
        
        this.setState({ index: e.activeIndex, prevIndex: this.state.index }, () => {
            // Every 20 items
            if ( (this.state.index + 1) % this.state.itemsPerPage === 0) {
                // if I swipe right
                if (this.state.index > this.state.prevIndex) {
                    this.currentPage += 1;
                    if(this.currentPage > this.props.lastPageLoaded) {
                        this.props.actions.getMovies(this.props.lastPageLoaded + 1);
                    }
                // swipe left
                } else {
                    this.currentPage -= 1;
                }
            }
            //console.log("currentPage",this.currentPage, "currentIndex", this.state.index + 1, "lastPageLoaded", this.props.lastPageLoaded);
        });
    }

    renderToolbar() {
        return (<Toolbar>
            <div className='left'>
                {this.props.hasBackButton ? 
                    <BackButton onClick={() => { 
                            this.props.actions.resetMovies();
                            this.props.navigator.popPage();
                        }
                    }>Back</BackButton> : null
                }
            </div>
            <div className='center'>Your Movies!</div>
            <div className='right' style={{ paddingRight: '5px' }}>{(this.state.index + 1)} / {(this.props.totalResults)}</div>
        </Toolbar>);
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <Carousel onPostChange={this.handleChange} index={this.state.index} centered swipeable autoScroll overscrollable autoRefresh onOverscroll={() => console.log('overscroll')}>
                {this.props.movies.map((movie, i) => {
                    const imgURL = [this.props.config.images.secure_base_url, this.props.config.images.backdrop_sizes[0], movie.backdrop_path].join('');
                    return (
                    <CarouselItem key={`card_${i}`}>
                        <Card>
                            <img src={imgURL} style={{ width: '100%' }} />
                            <div className="title right">{movie.title}</div>
                            <div className="content">
                                {movie.overview}
                            </div>
                        </Card>
                    </CarouselItem>);
                })}
                </Carousel>
            </Page>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(Actions, dispatch)
    };
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.moviesReducer.isFetching,
        movies: state.moviesReducer.movies,
        config: state.appReducer.config,
        totalResults: state.moviesReducer.totalResults,
        lastPageLoaded: state.moviesReducer.page
    };
};
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieList);
