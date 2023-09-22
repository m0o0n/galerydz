import { Component } from "react";
import Button from "./Button";
import ImageGallery from "./ImageGallery";
import SearchBar from "./Searchbar";
const BASE_URL = 'https://pixabay.com/api/?key=38661528-d945b4671dc1d38083bff1d33&image_type=photo&orientation=horizontal&per_page=12'
export class App extends Component {
  state = {
    gallery: null,
    err: '',
    isLoading: true
  }
  async fetchImages(params) {
    const data = await fetch(BASE_URL)
    return data.json()
  }
  componentDidMount() {
    this.fetchImages().then(({ hits }) => {
      setTimeout(()=>{
        this.setState({ gallery: hits, isLoading: false })
      }, 1000)
    }).catch((err) => {
      this.setState({ err, isLoading: false })
    })
  }
  render() {
    console.log(this.state)
    return (
      <div className="App">
        <SearchBar />
        {
          this.state.isLoading
            ? <span>Loading</span>
            : (
              <>
                <ImageGallery gallery={this.state.gallery} />
                <Button isRender={this.state.gallery.length} />
              </>
            )
        }

      </div>
    );
  }

};
