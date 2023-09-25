import { fetchImages } from "api/api";
import { Component } from "react";
import Button from "./Button";
import ImageGallery from "./ImageGallery";
import { Loader } from "./Loader";
import SearchBar from "./Searchbar";
export class App extends Component {
  state = {
    gallery: null,
    filtedGalery: null,
    query: '',
    page: 1,
    err: '',
    isLoading: true
  }
  handleLoadMore = () => {
    this.setState((prev) => ({ page: prev.page + 1 }))
  }

  hangleSearch = (e) => { 
    this.setState({query: e, page: 1})
  }

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page ) {
      fetchImages(this.state.page, this.state.query).then((data) => {
        this.setState((prev) => ({ gallery: [...prev.gallery, ...data.hits] }))
      })
      
    } else if(prevState.query !== this.state.query){
      fetchImages(this.state.page, this.state.query).then(({ hits }) => {
        this.setState({ gallery: hits })
      })
    }
  }

  componentDidMount() {
    fetchImages(this.state.page).then(({ hits }) => {
      setTimeout(() => {
        this.setState({ gallery: hits, isLoading: false })
      }, 1000)
    }).catch((err) => {
      this.setState({ err, isLoading: false })
    })
  }
  render() {
    return (
      <div className="App">
        <SearchBar
          hangleSearch={this.hangleSearch}
         />
        {
          this.state.isLoading
            ? <Loader />
            : (
              <>
                <ImageGallery gallery={this.state.gallery} />
                <Button
                  loadMore={this.handleLoadMore}
                  isRender={this.state.gallery.length}
                  page={this.state.page}
                />
              </>
            )
        }

      </div>
    );
  }

};
