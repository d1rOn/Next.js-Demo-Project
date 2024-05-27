import React from 'react';

import styles from './ControlLabel.module.scss';

interface ControlLabelProps {
  label?: string;
  subLabel?: string;
  required?: boolean;
  id?: string;
}

const ControlLabel: React.FC<ControlLabelProps> = ({
  label,
  subLabel,
  required,
  id,
}) =>
  label ? (
    <>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && ' *'}
      </label>
      {subLabel && <div className={styles.subLabel}>{subLabel}</div>}
    </>
  ) : null;

export default ControlLabel;
