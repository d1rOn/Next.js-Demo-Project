import React, { ChangeEvent, MouseEvent, useId } from 'react';
import cn from 'classnames';
import { useField } from 'formik';

import styles from './Checkbox.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickHandler?: (event: MouseEvent<HTMLInputElement>) => void;
  className?: string;
  name: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label = 'Checkbox',
  onChangeHandler,
  onClickHandler,
  className,
  ...props
}) => {
  const id = useId();
  const [field, meta] = useField(props);

  const isError = meta.touched && meta.error;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeHandler?.(e);
    field.onChange(e);
  };
  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    onClickHandler?.(e);
  };
  return (
    <div
      className={cn(
        styles.checkBox,
        {
          [styles.error]: isError,
        },
        className,
      )}
    >
      <input
        type='checkbox'
        id={id}
        {...field}
        {...props}
        onChange={handleOnChange}
        onClick={handleClick}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
