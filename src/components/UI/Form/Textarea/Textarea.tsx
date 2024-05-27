import React, { useId } from 'react';
import cn from 'classnames';
import { useField } from 'formik';

import ControlLabel from '~/components/UI/Form/ControlLabel/ControlLabel';
import ControlMessage from '~/components/UI/Form/ControlMessage/ControlMessage';

import styles from './Textarea.module.scss';

const TEXTAREA_MINIMUM_HEIGHT = 3;

interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  autoGrow?: boolean;
  label?: string;
  showSuccessMessage?: boolean;
  successMessage?: string;
  name: string;
}

const Textarea: React.FC<TextareaProps> = ({ autoGrow = false, ...props }) => {
  const id = useId();
  const [field, meta] = useField(props);

  const changeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    field.onChange(e);

    if (!autoGrow) {
      return;
    }

    textarea.style.height = '1px';
    textarea.style.height = `${TEXTAREA_MINIMUM_HEIGHT + textarea.scrollHeight}px`;
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
        className={cn(styles.Textarea, {
          [styles.error]: error,
        })}
      >
        <textarea
          {...field}
          {...props}
          className={styles.textarea}
          onChange={changeHandler}
          placeholder={
            props.placeholder
              ? `${props.placeholder}${props.required && !props.label ? ' *' : ''}`
              : undefined
          }
          required={false}
          title={error || success || ''}
          id={id}
        />
      </div>
      <ControlMessage text={error || success || ''} success={!!success} />
    </>
  );
};

export default Textarea;
