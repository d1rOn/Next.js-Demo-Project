/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ChangeEvent, useId, useRef } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { useField } from 'formik';

import ControlLabel from '~/components/UI/Form/ControlLabel/ControlLabel';
import ControlMessage from '~/components/UI/Form/ControlMessage/ControlMessage';

import styles from './FileInput.module.scss';

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  showSuccessMessage?: boolean;
  successMessage?: string;
  label?: string;
  name: string;
}

const FileInput: React.FC<FileInputProps> = ({ placeholder, ...props }) => {
  const id = useId();

  const [field, meta, helpers] = useField(props);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (field.value) return null;
    if (!inputRef.current) return null;
    return inputRef.current.click();
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    helpers.setTouched(true);
    if (e.currentTarget.files?.length) {
      helpers.setValue(e.currentTarget.files[0]);
    }
  };
  const onClearFile = () => {
    helpers.setValue(null);
  };
  const error = meta.touched && meta.error;
  const success =
    meta.touched &&
    !meta.error &&
    props.showSuccessMessage &&
    props.successMessage;
  const inputPlaceholder = `${placeholder || 'Choose File'}${props.required && !props.label ? ' *' : ''}`;

  // eslint-disable-next-line spellcheck/spell-checker
  const fakePath = 'fakepath\\';
  return (
    <>
      <ControlLabel {...props} id={id} />
      <div
        onClick={handleClick}
        className={cn(styles.fileInput, { [styles.error]: error })}
        title={error || success || ''}
      >
        <div className={styles.fileInput__fileName}>
          {field.value?.name?.split(fakePath).at(-1) ||
            (inputPlaceholder && (
              <span className={styles.fileInput__placeholder}>
                {inputPlaceholder}
              </span>
            ))}
        </div>
        <div className={styles.fileInput__input}>
          {field.value ? (
            <Image
              src='/images/icons/close.svg'
              width={30}
              height={30}
              alt='Clear file'
              className={styles.fileInput__clear}
              onClick={onClearFile}
            />
          ) : (
            <Image
              src='/images/icons/upload_file.svg'
              alt='upload file'
              width={30}
              height={20}
            />
          )}
        </div>
        <input type='file' ref={inputRef} onChange={onInputChange} id={id} />
      </div>
      <ControlMessage text={error || success || ''} success={!!success} />
    </>
  );
};

export default FileInput;
