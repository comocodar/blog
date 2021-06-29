import Image from 'next/image';

import styles from './styles.module.scss';

type Props = {
  name: string
  picture: string
  imageSize?: number;
}

export function Avatar({ name, picture, imageSize = 48 }: Props) {
  return (
    <div className={styles.avatharContainer}>
      <Image
        src={picture}
        width={imageSize}
        height={imageSize}
        alt={name}
      />
      <div>{name}</div>
    </div>
  )
}
