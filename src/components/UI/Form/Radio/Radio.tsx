import React, { useId } from 'react';
import cn from 'classnames';

import styles from './Radio.module.scss';

interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  customClass?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

const Radio: React.FC<RadioProps> = ({
  label = 'radio button',
  onChange,
  customClass,
  ...props
}) => {
  if (props.value === undefined)
    throw new Error('Radio should have value prop');
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange?.(e, props.value);

  return (
    <div className={cn(styles.radioButton, customClass && customClass)}>
      <input type='radio' id={id} {...props} onChange={handleChange} />
      <label htmlFor={id} className={styles.radioLabel}>
        {label}
      </label>
    </div>
  );
};

export default Radio;
