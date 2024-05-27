import React from 'react';
import cn from 'classnames';
import { FormikErrors, FormikValues } from 'formik';

import styles from './FormMessage.module.scss';

interface FormMessageProps {
  errors: FormikErrors<FormikValues>;
  status?: {
    sended: string;
  };
  errorMessage: string;
  successMessage: string;
}

const FormMessage: React.FC<FormMessageProps> = ({
  errors,
  status,
  errorMessage,
  successMessage,
}) => (
  <div
    className={cn(styles.message, {
      [styles.message_error]: !!errors.serverResponse,
      [styles.message_success]: status !== undefined && !!status.sended,
    })}
  >
    {errors.serverResponse ? errorMessage : successMessage}
  </div>
);

export default FormMessage;
