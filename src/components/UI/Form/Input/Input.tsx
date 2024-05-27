import React, { useId, useState } from 'react';
import cn from 'classnames';
import { useField } from 'formik';

import ControlLabel from '~/components/UI/Form/ControlLabel/ControlLabel';
import ControlMessage from '~/components/UI/Form/ControlMessage/ControlMessage';
import IconBadge from './IconBadge';

import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  showSuccessMessage?: boolean;
  successMessage?: string;
  required: boolean;
  disabled?: boolean;
  label: string;
  name: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, icon, ...props }, ref) => {
  const id = useId();
  const [field, meta] = useField(props);
  const [isFocused, setIsFocused] = useState(false);

  const onFocusHandler = () => setIsFocused(true);
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    props.onBlur?.(e);
    field.onBlur.call(e.target, e);
    setIsFocused(false);
  };
  const error = meta.touched && meta.error;
  const success =
    meta.touched &&
    !meta.error &&
    props.showSuccessMessage &&
    props.successMessage;

  return (
    <>
      <ControlLabel {...props} id={id} />
      <div
        title={error || success || ''}
        className={cn(styles.input, className, {
          [styles.focused]: isFocused,
          [styles.disabled]: props.disabled,
          [styles.error]: error,
          [styles.success]: success,
        })}
      >
        <input
          {...field}
          {...props}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          placeholder={
            props.placeholder
              ? `${props.placeholder}${props.required && !props.label ? ' *' : ''}`
              : undefined
          }
          required={false}
          ref={ref}
          id={id}
        />
        {icon ? (
          <IconBadge
            src={icon}
            alt='input'
            customClass={styles['input__badge-custom']}
          />
        ) : (
          <>
            <IconBadge
              src='/images/icons/error_icon.svg'
              alt='error'
              customClass={styles['input__badge-error']}
            />
            <IconBadge
              src='/images/icons/success_icon.svg'
              alt='success'
              customClass={styles['input__badge-success']}
            />
          </>
        )}
      </div>
      <ControlMessage text={error || success || ''} success={!!success} />
    </>
  );
});

export default Input;
