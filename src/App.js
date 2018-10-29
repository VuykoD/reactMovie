import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner'
import './App.css';

class App extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      renderLoader:false,
      popular: null,
      genres:null,
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
          this.setState ({
            genres:response,
          })
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
  }

  render() {
    return (
      <div className="App">

        <p className="App-intro">

        </p>
        <Search
          fetchMovies={this.fetchMovies}
        />
        {(this.state.renderLoader)&&
        <Loader type="Audio" color="#somecolor" height={80} width={80} />
        }
        <p/>
        {(this.state.popular && !this.state.renderLoader)&&
          <div>

            <List
              list={this.state.popular}
              genres={this.state.genres}
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

  genreName(genre_ids){
    const genre=this.props.genres.data.genres;

    for (let i = 0; i < genre.length; i++ ){
      if (genre[i].id === genre_ids) return this.genre=genre[i].name
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

  render(){

    return(

      <div>
        {(this.props.list.data) &&
          <div>
            <span>Всего фильмов - {this.props.list.data.total_results}</span>
            {this.props.list.data.results.map((string, index) =>
              <p key={index}>{string.title} -{" "}
                {string.genre_ids.map((genre_ids, index)=>this.genres(genre_ids, index))}
                </p>
            )}
          </div>
        }
      </div>
    )
  }
}

export default App;