import { Component } from 'react';
import css from './Searchbar.module.css';
import { IoSearch } from 'react-icons/io5';

class Searchbar extends Component {
  state = {
    searchData: '',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ searchData: value.toLowerCase() });
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchData);
    this.setState({ searchData: '' });
  };

  render() {
    return (
      <header className={css.searchbar} onSubmit={this.handleSearch}>
        <form className={css.form}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>
              <IoSearch size={25} />
            </span>
          </button>

          <input
            className={css.input}
            type="text"
            name="searchData"
            value={this.state.searchData}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
