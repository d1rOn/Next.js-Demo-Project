import React from 'react';
import cn from 'classnames';

import s from './Spinners.module.scss';

interface SpinnerProps {
  customClass?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ customClass }) => (
  <div className={cn(s.loader, customClass && customClass)}>Loading...</div>
);

export default Spinner;
