import { Component } from 'react';
import css from './App.module.css';
import { fetchImages } from './Helpers/images-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    searchData: '',
    imagesList: [],
    totalHits: 0,
    loading: false,
    page: 1,
  };

  handleSubmit = async searchData => {
    try {
      const { totalHits, hits } = await fetchImages(searchData, 1);
      console.log(hits);
      if (hits.length < 1) {
        alert('No Images found');
        return;
      } else {
        this.setState({
          imagesList: hits,
          searchData,
          totalHits,
          page: 1,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleNextPage = async () => {
    try {
      this.setState({ loading: true });
      const { hits } = await fetchImages(
        this.state.searchData,
        this.state.page + 1
      );
      this.setState(prevState => ({
        imagesList: [...prevState.imagesList, ...hits],
        loading: false,
        page: prevState.page + 1,
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
