/* eslint-disable no-unreachable */

import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { SlideDown } from '~/components/UI/SlideDown/SlideDown';

import styles from './ControlMessage.module.scss';

interface ControlMessageProps {
  text: string;
  success: boolean;
}

const ControlMessage: React.FC<ControlMessageProps> = ({
  text = '',
  success = false,
}) => {
  const [lastText, setLastText] = useState(text || null);

  useEffect(() => {
    if (text) {
      setLastText(text);
    }
  }, [text]);

  return (
    // @ts-expect-error: SlideDown is js component
    <SlideDown closed={!text}>
      <div className={cn(styles.message, success && styles.message__success)}>
        {lastText}
      </div>
    </SlideDown>
  );
};

export default ControlMessage;
