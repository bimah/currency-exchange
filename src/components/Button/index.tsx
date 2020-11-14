import React, { FunctionComponent } from 'react';
import classNames from 'classnames/bind';

import styles from './main.scss';

const cx = classNames.bind(styles);

type ButtonProps = {
  btnStyle?: string,
  handleClick?: (arg0: React.MouseEvent) => void,
  label?: string,
  disabled?: boolean
}

const Button:FunctionComponent<ButtonProps> = ({
  btnStyle,
  handleClick,
  label,
  disabled
}) => (
  <button
    className={cx('btn', { [`btn--${btnStyle}`]: true })}
    type="button"
    onClick={handleClick}
    disabled={disabled}
    data-testid="button"
    title={btnStyle}
  >
    {label}
  </button>
);

Button.defaultProps ={
  btnStyle: 'primary',
  disabled: false,
  handleClick: () => null,
  label: null
};

export default Button;
