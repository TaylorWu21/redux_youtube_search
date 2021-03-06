import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

const youtube = "AIzaSyCFOpZM5Evm5c9wxx42EK9AQfka1sa4o4w";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch = (term) => {
    YTSearch({key: youtube, term: term}, videos => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce(term => {this.videoSearch(term)}, 300);
    return(
      <div>
        <SearchBar 
          onSearchTermChange={videoSearch}
        />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList  
          videos={this.state.videos} 
          onVideoSelect={ selectedVideo => this.setState({ selectedVideo }) }
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
