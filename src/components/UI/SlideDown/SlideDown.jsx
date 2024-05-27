/* eslint-disable react/destructuring-assignment */
import React, { Component, forwardRef } from 'react';

import styles from './slidedown.module.scss';

class SlideDownContent extends Component {
  constructor(props) {
    super(props);
    this.outerRef = null;
    this.state = {
      children: props.children,
      childrenLeaving: false,
    };
    this.closedClassName = props.closedClassName || styles.closed;

    this.handleRef = (ref) => {
      /* Handle both the internal and forwardedRef and maintain correct types */
      this.outerRef = ref;

      if (this.props.forwardedRef) {
        if (typeof this.props.forwardedRef === 'function') {
          this.props.forwardedRef(ref);
        } else if (typeof this.props.forwardedRef === 'object') {
          const { forwardedRef } = this.props;
          forwardedRef.current = ref;
        } else {
          throw new Error(`Invalid forwardedRef ${this.props.forwardedRef}`);
        }
      }
    };

    this.handleTransitionEnd = (event) => {
      if (event.target !== this.outerRef || event.propertyName !== 'height') {
        return;
      }

      if (this.state.childrenLeaving) {
        this.setState(
          { children: null, childrenLeaving: false },
          this.endTransition,
        );
      } else {
        this.endTransition();
      }
    };
  }

  componentDidMount() {
    if (!this.outerRef) {
      return;
    }

    if (this.props.closed || !this.props.children) {
      this.outerRef.classList.add(this.closedClassName);
      this.outerRef.style.height = '0px';
      return;
    }

    if (this.props.transitionOnAppear) {
      this.startTransition('0px');
    } else {
      this.outerRef.style.height = 'auto';
    }
  }

  getSnapshotBeforeUpdate() {
    /* Prepare to re-size */
    return this.outerRef
      ? `${this.outerRef.getBoundingClientRect().height}px`
      : null;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.children) {
      return {
        children: props.children,
        childrenLeaving: false,
      };
    }
    if (state.children) {
      return {
        children: state.children,
        childrenLeaving: true,
      };
    }
    return null;
  }

  componentDidUpdate(_prevProps, _prevState, snapshot) {
    if (this.outerRef) {
      this.startTransition(snapshot);
    }
  }

  endTransition() {
    this.outerRef.classList.remove(styles.transitioning);
    this.outerRef.style.transitionProperty = 'none';
    this.outerRef.style.height = this.props.closed ? '0px' : 'auto';

    if (this.props.closed || !this.state.children) {
      this.outerRef.classList.add(this.closedClassName);
    }
  }

  startTransition(prevHeight) {
    let endHeight = '0px';

    if (
      !this.props.closed &&
      !this.state.childrenLeaving &&
      this.state.children
    ) {
      this.outerRef.classList.remove(this.closedClassName);
      this.outerRef.style.height = 'auto';
      endHeight = getComputedStyle(this.outerRef).height;
    }

    if (
      parseFloat(endHeight).toFixed(2) !== parseFloat(prevHeight).toFixed(2)
    ) {
      this.outerRef.classList.add(styles.transitioning);
      this.outerRef.style.height = prevHeight;
      // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
      this.outerRef.offsetHeight; // force repaint
      this.outerRef.style.transitionProperty = 'height';
      this.outerRef.style.height = endHeight;
    }
  }

  render() {
    const {
      as = 'div',
      children,
      className,
      closed,
      closedClassName,
      transitionOnAppear,
      forwardedRef,
      ...rest
    } = this.props;
    const containerClassName = className
      ? `${styles['react-slidedown']} ${className}`
      : `${styles['react-slidedown']}`;

    return React.createElement(
      as,
      {
        ref: this.handleRef,
        className: containerClassName,
        onTransitionEnd: this.handleTransitionEnd,
        ...rest,
      },
      this.state.children,
    );
  }
}

SlideDownContent.defaultProps = {
  transitionOnAppear: true,
  closed: false,
};

export const SlideDown = forwardRef((props, ref) => (
  <SlideDownContent {...props} forwardedRef={ref} />
));

export default SlideDown;
