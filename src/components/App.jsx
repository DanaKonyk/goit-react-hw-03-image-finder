import { Component } from 'react';
import css from './App.module.css';
import { fetchImages } from '../Helpers/images-api';
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

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchData !== this.state.searchData ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true });
        const { totalHits, hits } = await fetchImages(
          this.state.searchData,
          this.state.page
        );

        if (hits.length < 1) {
          alert('No images found');
          this.setState({ loading: false });
          return;
        }

        this.setState(prevState => ({
          imagesList:
            prevState.page === 1 ? hits : [...prevState.imagesList, ...hits],
          totalHits,
          loading: false,
        }));
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  handleSubmit = searchData => {
    this.setState({
      searchData,
      imagesList: [],
      page: 1,
    });
  };

  handleNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { imagesList, totalHits, loading } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} />

        {imagesList.length > 0 && <ImageGallery items={imagesList} />}

        {loading && <Loader />}

        {totalHits > 12 && totalHits > imagesList.length && !loading && (
          <Button onClick={this.handleNextPage} />
        )}
      </div>
    );
  }
}
