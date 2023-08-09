import { useRef, useState } from 'react';
import axios from "axios";
import { youtube_parser } from './utils';
import logo from './youtube.png';
import './App.css';


function App() {

  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value);
    // connecting to API
    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': 'c93799809cmsh31c8bb66433bca9p1693f9jsne8e160be8cd3',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }

    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))

    inputUrlRef.current.value = '';
  }

  return (
    <div className="app">
      <nav className="navbar bg-danger ">
        <div className="container-fluid ">
          <a className="navbar-brand text-light">
            Youtube Downloader
          </a>
        </div>
      </nav>
      <div className="container w-75">
        <div className="d-flex p-5 flex-column">
          <div className="content-title m-1">
            <img className="youtubeImg" src={logo} />
            <h1>Youtube TO MP3</h1>
          </div>
          <div className="content_description mb-2">
            <p>Convert YouTube videos to MP3s in just few secounds!</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input ref={inputUrlRef} type="text" className="form-control mw-50 mb-4" placeholder='Paste link here ...' />
            <button type="submit" className="btn btn-danger">Search</button>
          </form>
          {urlResult ?
            <div className="download-link">
              <a target="_blank" rel='noreferrer' href={urlResult} className='badge text-bg-dark mt-5'>Download MP3</a>
            </div> : ''}
        </div>
      </div>
      <footer className="py-3 ">
        <p className="text-center text-muted">
          © Made by <a id="github-link" href='https://github.com/mehdi-kve'> M3hdi.kve</a>
        </p>
      </footer>
    </div>
  )
}

export default App
