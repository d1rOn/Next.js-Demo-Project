import Image from 'next/image';
import classNames from 'classnames';

import styles from './Input.module.scss';

interface IconBadgeProps {
  src: string;
  alt: string;
  customClass?: string;
}

const IconBadge: React.FC<IconBadgeProps> = ({ src, alt, customClass }) => (
  <div className={classNames(styles.input__badge, customClass)}>
    <Image src={src} width={20} height={20} alt={alt} />
  </div>
);

export default IconBadge;
