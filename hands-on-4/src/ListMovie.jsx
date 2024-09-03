import axios from 'axios';
import React from 'react';

export default class ListMovie extends React.Component {
state = {
  movies :[]
};

componentDidMount(){
  this.fetchMovies()
}

componentDidUpdate(prevProps){
if(this.props.search !== prevProps.search){
  if(!this.props.search){
    this.fetchMovies()
    return;
  }



axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d64465f835d027114fd469afd4e2de72&query=${this.props.search}`)
.then(response=>{
  this.setState({
    movies: response.data.results
  })
})
}
}

componentWillUnmount(){
  this.setState({
    movies:[]
  })
}

fetchMovies (){
  axios.get('https://api.themoviedb.org/3/movie/popular?api_key=d64465f835d027114fd469afd4e2de72')
  .then(response=>{
    this.setState({
      movies: response.data.results
    })
  })
}

  render() {
    return (
      <div className="container">
        {this.state.movies.map(movie=>(
          <div className='card' key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <div>
              <h5>{movie.title}</h5>
              <p>{movie.overview.slice(0,120)}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
