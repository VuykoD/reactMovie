import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import './App.css';

class App extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      renderLoader:false,
      popular: null,
      inputValue:''
    }
  }


  componentDidMount() {
    this.takeFirstData();
  }

  takeFirstData(){
    this.setState ({
      renderLoader:true,
    })
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=03b96ac61ca771f70dc412e781c3361e&language=en-US`)
      .then((response) => {
          this.genres=response;
      })
      .catch(function (error) {
        //console.log(error);
      });

    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=03b96ac61ca771f70dc412e781c3361e&language=en-US&page=1`)
      .then((response) => {
        setTimeout(()=>
        this.setState ({
          popular:response,
          renderLoader:false,
        }), 500)
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  fetchMovies=(query)=>{
    this.setState ({
      renderLoader:true,
    })

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=03b96ac61ca771f70dc412e781c3361e&language=en-US&page=1&include_adult=false&query=${query}`)
    .then((response) => {
      setTimeout(()=>
        this.setState ({
          popular:response,
          renderLoader:false,
        }), 500)
    })
    .catch(function (error) {
      //console.log(error);
    });
  };

  render() {

    return (
      <div className="App">
        <Search
          fetchMovies={this.fetchMovies}
        />

        {(this.state.renderLoader) &&
          <Loader type="ThreeDots" color="#somecolor" height={80} width={40} />
        }
        <p/>
        {(this.state.popular && !this.state.renderLoader)&&
          <div>

            <List
              list={this.state.popular}
              genres={this.genres}
              >
              </List>
          </div>
        }


      </div>
    );
  }
}

class Search extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      inputValue:''
    }
  }


  onChange(e){
    this.setState({
      inputValue:e.target.value
    })
    this.props.fetchMovies(e.target.value)
  }

  render(){
    return (
      <input
        value={this.state.inputValue}
        onChange={(e)=>this.onChange(e)}
        />
    )
  }
}

class List extends Component {

  render(){
    return(

      <div>
        {(this.props.list.data) &&
          <div>

            <span>Всего фильмов - {this.props.list.data.total_results}</span>
            {this.props.list.data.results.map((movie, index) =>
              <div key={movie.id}>
                <MovieCard
                  movie={movie}
                  genres={this.props.genres}
                />


              </div>
            )}
          </div>
        }
      </div>
    )
  }
}

class MovieCard extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      image_path:''
    }
  }

  genres(genre_ids, index){
    this.genreName(genre_ids);
    return(
      <span key={index}>
         {this.genre},{" "}
      </span>
    )
  }

  genreName(genre_ids){
    const genre=this.props.genres.data.genres;

    for (let i = 0; i < genre.length; i++ ){
      if (genre[i].id === genre_ids) return this.genre=genre[i].name
    }

  }

  getImages(id){

    axios.get(`https://api.themoviedb.org/3/movie/`+id+`/images?api_key=03b96ac61ca771f70dc412e781c3361e&height=720`)
      .then((response) => {
        this.setState({
          image_path:response.data.posters[0].file_path
        });
      })
      .catch(function (error) {

      });
  }

  render() {
    const movie=this.props.movie;
    this.getImages(movie.id)
    return (
      <div>
        { this.state.image_path &&
          <img
            src={`https://image.tmdb.org/t/p/w185${this.state.image_path}`}
            alt={movie.title}
          />
        }
        <p>
          {movie.title} -{" "}
          {movie.genre_ids.map((genre_ids, index)=>this.genres(genre_ids, index))}
        </p>
      </div>

    )
  }
}

export default App;
