import React, { useId } from 'react';
import cn from 'classnames';
import { useField } from 'formik';

import ControlLabel from '~/components/UI/Form/ControlLabel/ControlLabel';
import ControlMessage from '~/components/UI/Form/ControlMessage/ControlMessage';
import Radio from '~/components/UI/Form/Radio/Radio';

import styles from './RadioGroup.module.scss';

interface RadioGroupProps {
  children: React.ReactNode;
  customClass?: string;
  showSuccessMessage?: boolean;
  successMessage?: string;
  className?: string;
  label?: string;
  required?: boolean;
  name: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  customClass,
  ...props
}) => {
  const id = useId();
  const [field, meta, helpers] = useField(props);

  const onRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    helpers.setValue(value);
    helpers.setTouched(true);
    field.onChange(e);
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
        {...props}
        className={cn(
          styles.radioGroup,
          {
            [styles.error]: error,
          },
          customClass && customClass,
        )}
        title={error || success || ''}
      >
        <div className={styles.radios}>
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) {
              return null; // Skip non-element children
            }
            if (child.type !== Radio)
              throw new Error(
                'RadioGroup only accepts Radio components as children',
              );

            const radioProps = {
              ...child.props,
              name: props.name,
              onChange: onRadioChange,
            };

            return React.cloneElement(child, radioProps);
          })}
        </div>
        <ControlMessage text={error || success || ''} success={!!success} />
      </div>
    </>
  );
};

export default RadioGroup;
