import React, { Component } from 'react';
import { 
    Card
    , Button
    , List
    , ListHeader
    , ListItem
    , Icon
} from 'react-onsenui';

export class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() {
        return (
            <div>
                {this.props.movies.map((movie, i) => {
                    console.log([this.props.config.images.base_url, this.props.config.images.poster_sizes[3], movie.poster_path].join(''));
                    return (<Card key={`card_${i}`}>
                        <img src={[this.props.config.images.base_url, this.props.config.images.backdrop_sizes[0], movie.backdrop_path].join('')} style={{width: '100%'}} />
                        <div className="title right">{movie.title}</div>
                        <div className="content">
                            {movie.overview}
                        </div>
                    </Card>);
                })}
            </div>
        )
    }
}
 
export default MovieList;