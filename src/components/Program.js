import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)
class Program extends Component {
  constructor(props) {
    super(props);
    this.findMovie = this.findMovie.bind(this)
    this.state = { 
      releaseDate: '',
      title: '',
      poster: '',
      overview: '',
      originalLanguage: '',
      vote_avg: '',
      votes: '',
      revenue: '',
      backdrop_path: ''
    }
    if(this.state.poster === ''){
      this.poster = ''
    }
  }

  componentDidMount(){
    const wrap = document.querySelector('.bg_content')
    wrap.style.background = 'none'
  }

  componentDidUpdate(){
    const wrap = document.querySelector('.bg_content')
    wrap.style.background = 'rgba(0,0,0,0.9)'
    const link = 'https://image.tmdb.org/t/p/original'
    document.body.style.background = `url(${link + this.state.backdrop_path})`  
  }

  

     findMovie(e) {
       e.preventDefault()
       const query = e.target.elements.movietitle.value
       console.log(query)
       const key = '188e606615465574c8298e6540d0f219'
       fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=1&include_adult=false`)
       .then(res => res.json())
       .then(data =>{
         this.setState({ 
           releaseDate: data.results[1].release_date,
           title: data.results[1].original_title,
           poster: data.results[1].poster_path,
           overview: data.results[0].overview,
           originalLanguage: data.results[0].original_language,
           vote_avg: data.results[1].vote_average,
           votes: data.results[1].vote_count,
           revenue: data.revenue,
           backdrop_path:data.results[1].backdrop_path
         })
         
       })
     }
     
     
  render() { 
    const poster = 'https://image.tmdb.org/t/p/w400' + this.state.poster
    console.log(this.state.backdrop_path)
    return ( 
      <div>
      <div className="container-fluid navBar p-2">
        <form onSubmit={this.findMovie}>
          <div className="input-group xs">
          <input type="text" className="form-control searchbar" placeholder="Search for movies" name="movietitle" />
          <button type="submit" className="btn searchbtn">
          <FontAwesomeIcon icon="search" className="xl text-light" />
          </button>
          </div>
        </form>
      </div>
      <div className="container mt-5 text-white">
        <div className="row">
          <div className="col-md-5 text-right pr-0">
             <img src={this.state.poster? poster : ''} />
          </div>
          <div className="col-md-5 pt-5 bg_content">
            <h1 className="display-3 black movie_title pt-5 text-center">{this.state.title ? this.state.title : 'Search for a movie!'}</h1>
            <label className="d-block text-center">{this.state.releaseDate ? 'Release Date' : ''}</label>
            <h4 className="text-center black pt-3">{this.state.releaseDate ? this.state.releaseDate : ''}</h4>
            <label className="pt-4 d-block justify text-center">{this.state.overview ? 'Description' : ''}</label>
            <h5 className="pt-4 bold justify">{this.state.overview}</h5>
            <span className="row justify-content-around">
            <h4 className="pt-4 d-inline">{this.state.originalLanguage
               ? 'Language: ' + this.state.originalLanguage.toUpperCase() : ''}</h4>
            <h4 className="pt-4 d-inline">{this.state.vote_avg ? 'Rating: '+this.state.vote_avg : ''} <small className="bold text-success"> {this.state.votes ? 'based on '+this.state.votes+'votes' : ''} </small></h4>
            </span>
          </div>
        </div>
      </div>
      <small className="fixed-bottom text-center text-light">Erikas Turskis - 2019</small>
      </div>
     );
  }
}
 
export default Program;


// // 
//         <h2>{this.state.title}</h2>
//         <p>{this.state.releaseDate}</p>
//         