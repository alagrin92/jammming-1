import React from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {

  constructor(props)
  {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    Spotify.getAccessToken();
  }

  addTrack(track)
  {
    let tracks = this.state.playlistTracks;

    if (tracks.includes(track)) {
      console.log('Already in playlist.');
    } else {

      console.log('ready to PUSH');

      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track)
  {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks})
  }

  updatePlaylistName(name)
  {
    this.setState({playlistName: name});
  }


  savePlaylist()
  {
    const trackUris = this.state.playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }


  search(term) {
    Spotify.search(term).then(
      searchResult => {this.setState({searchResults:searchResult})
    });
  }

  render() {
    return (
      <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>

            <div className="App">
              <SearchBar onSearch={this.search}/>
                <div className="App-playlist">

                  <SearchResults
                    searchResults ={this.state.searchResults}
                    onAdd={this.addTrack}
                    isRemoval={false}
                  />

                  <Playlist
                    playlistName = {this.state.playlistName}
                    playlistTracks ={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist}
                    isRemoval={true}
                  />
                </div>
            </div>
      </div>
    );
  }
}

export default App;
