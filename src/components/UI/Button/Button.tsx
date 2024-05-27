import React, { useRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Spinner from '~/components/UI/Spinner/Spinner';

import style from './Button.module.scss';

import isSameSite from '~/functions/isSameSite';
import preprocessURI from '~/functions/preprocessURI';

interface ButtonProps {
  text?: string;
  disabled?: boolean;
  transparent?: boolean;
  squared?: boolean;
  circle?: boolean;
  customClassName?: string | false;
  customIconClassName?: string | false;
  url?: string;
  icon?: React.ReactNode;
  white?: boolean;
  handlerClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  tag?: 'button' | 'a';
  pending?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // To handle any additional props
}

const Button: React.FC<ButtonProps> = ({
  text = 'button',
  disabled = false,
  transparent = false,
  squared = false,
  circle = false,
  customClassName = false,
  customIconClassName = false,
  url,
  icon,
  white,
  handlerClick,
  tag = 'button',
  pending = false,
  ...props
}) => {
  const preprocessedURI = preprocessURI(url);
  const sameSite = isSameSite(preprocessedURI);
  const nodeRef = useRef(null);
  const Tag = !sameSite ? 'a' : tag;
  const component = (
    <Tag
      className={classNames(
        {
          [style.disabled]: tag === 'a' && disabled,
          [style.primary]: true,
          [style.transparent]: transparent,
          [style.squared]: squared,
          [style.circle]: circle,
          [style.white]: white,
          [style.pending]: pending,
        },
        customClassName && customClassName,
      )}
      {...props}
      disabled={disabled}
      onClick={handlerClick}
      target={(Tag === 'a' && !sameSite && '_blank') || props.target}
    >
      {icon ? (
        <div
          className={classNames(
            style.icon,
            customIconClassName && customIconClassName,
          )}
        >
          {icon}
        </div>
      ) : (
        <span>{text}</span>
      )}
      <CSSTransition in={pending} nodeRef={nodeRef} timeout={100} unmountOnExit>
        <div className='spinner' ref={nodeRef}>
          <Spinner customClass={style.spinner} />
        </div>
      </CSSTransition>
    </Tag>
  );

  return preprocessedURI ? (
    <Link href={preprocessedURI}>{component}</Link>
  ) : (
    component
  );
};

export default Button;
