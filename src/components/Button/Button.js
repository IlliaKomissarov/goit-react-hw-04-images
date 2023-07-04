import PropTypes from 'prop-types';
import css from './Button.module.css'

const Button = ({ onClick }) => {
  return (
    <button className={css.button_load__more} onClick={onClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;