import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './main.scss';

const cx = classNames.bind(styles);

const Button = ({ btnStyle, handleClick, label }) => (
  <button className={cx('btn', { [`btn--${btnStyle}`]: true })} type="button" onClick={handleClick} data-testid="button">{label}</button>
);

Button.propTypes = {
  btnStyle: PropTypes.string,
  handleClick: PropTypes.func,
  label: PropTypes.string
};

Button.defaultProps = {
  btnStyle: 'primary',
  handleClick: () => {},
  label: ''
};

export default Button;
