import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return Notiflix.Notify.info(
        'The search field is empty, please try again.'
      );
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <input
            className={css.input}
            name="query"
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={css.button}>
            <span className={css.button_label}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
