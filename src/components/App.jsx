import { Component } from 'react';
import css from './App.module.css';
import { fetchImages } from './Helpers/images-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';

let page = 0;

export class App extends Component {
  state = {
    searchData: '',
    imagesList: [],
    totalHits: 0,
    loading: false,
  };

  handleSubmit = async searchData => {
    page = 1;
    try {
      const { totalHits, hits } = await fetchImages(searchData, page);
      console.log(hits);
      if (hits.length < 1) {
        alert('No Images found');
      } else {
        this.setState({
          imagesList: hits,
          searchData,
          totalHits,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleNextPage = async () => {
    try {
      this.setState({ loading: true });
      const { hits } = await fetchImages(this.state.searchData, (page += 1));
      this.setState(prevState => ({
        imagesList: [...prevState.imagesList, ...hits],
        loading: false,
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const { imagesList, totalHits, loading } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery items={imagesList} />
        {loading && <Loader />}
        {totalHits > 12 && totalHits > imagesList.length && (
          <Button onClick={this.handleNextPage} />
        )}
      </div>
    );
  }
}
