/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Loader from 'react-loader-spinner';
import './App.css';

class App extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      renderLoader: false,
      popular: null,
    };
  }

  componentDidMount() {
    this.takeFirstData();
  }

  fetchMovies = (query) => {
    this.setState({
      renderLoader: true,
    });

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=03b96ac61ca771f70dc412e781c3361e&language=en-US&page=1&include_adult=false&query=${query}`)
      .then((response) => {
        setTimeout(() => this.setState({
          popular: response,
          renderLoader: false,
        }), 500);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  takeFirstData() {
    this.setState({
      renderLoader: true,
    });
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=03b96ac61ca771f70dc412e781c3361e&language=en-US')
      .then((response) => {
        this.genres = response;
      })
      .catch((error) => {
        // console.log(error);
      });

    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=03b96ac61ca771f70dc412e781c3361e&language=en-US&page=1')
      .then((response) => {
        setTimeout(() => this.setState({
          popular: response,
          renderLoader: false,
        }), 500);
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  render() {
    const loader = this.state.renderLoader;
    const { classes } = this.props;

    return (
      <div className="App">
        <TextField
          id="standard-dense"
          label="movie name"
        />
        <Button variant="contained" color="primary">
          Search
        </Button>
        <Search
          fetchMovies={this.fetchMovies}
        />
        {loader
          && <Loader type="ThreeDots" color="#somecolor" height={80} width={40} />
        }
        {(this.state.popular && !this.state.renderLoader) &&
          <div>
            <List
              list={this.state.popular}
              genres={this.genres}
            />
          </div>
        }
      </div>
    );
  }
}

class Search extends Component {
  static propTypes = {
    fetchMovies: PropTypes.func,
  };

  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      inputValue: '',
    };
  }

  onChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
    this.props.fetchMovies(e.target.value);
  }

  render() {
    return (
      <input
        value={this.state.inputValue}
        onChange={(e) => this.onChange(e)}
      />
    );
  }
}

class List extends Component {
  static propTypes = {
    genres: PropTypes.shape({}),
    list: PropTypes.shape({
      data: PropTypes.shape({
        total_results: PropTypes.number,
        results: PropTypes.array,
      }),
    }),
  };

  render() {
    return (
      <div>
        {(this.props.list.data) &&
          <div>
            <span>
              {'Всего фильмов - '}
              {this.props.list.data.total_results}
            </span>
            {this.props.list.data.results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                genres={this.props.genres}
              />))
            }
          </div>
        }
      </div>
    );
  }
}

class MovieCard extends Component {
  static propTypes = {
    movie: PropTypes.shape({}),
    genres: PropTypes.shape({
      data: PropTypes.shape({
        genres: PropTypes.array,
      }),
    }),
  };

  genres(genre_ids, index) {
    this.genreName(genre_ids);
    return (
      <span key={index}>
        {this.genre}
        {', '}
      </span>
    );
  }

  genreName(genre_ids) {
    const genre = this.props.genres.data.genres;

    for (let i = 0; i < genre.length; i++) {
      if (genre[i].id === genre_ids) return this.genre = genre[i].name;
    }
  }

  render() {
    const movie = this.props.movie;

    return (
      <div>
        <p>
          {movie.title}
          {' - '}
          {movie.genre_ids.map((genre_ids, index) => this.genres(genre_ids, index))}
        </p>
        <img
          // src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
    );
  }
}

export default App;
