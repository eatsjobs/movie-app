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
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.state = {
            index: 0
        }
    }
    
    handleChange(e) {
        this.setState({ index: e.activeIndex });
    }

    renderToolbar() {
        return (<Toolbar>
            <div className='left'>
                {this.props.hasBackButton ? 
                    <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton> : null
                }
            </div>
            <div className='center'>Your Movies!</div>
            <div className='right' style={{ paddingRight: '5px' }}>{this.state.index + 1} / {this.props.movies.length }</div>
        </Toolbar>);
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <Carousel onPostChange={this.handleChange} index={this.state.index} centered swipeable autoScroll overscrollable>
                {!this.props.isFetching ? this.props.movies.map((movie, i) => {
                    const imgURL = [this.props.config.images.base_url, this.props.config.images.backdrop_sizes[0], movie.backdrop_path].join('');
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
                }) : <div style={{ textAlign: 'center' }}>Loading...</div>}
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
        config: state.appReducer.config
    };
};
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieList);
