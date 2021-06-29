import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';

type Props = {
  dateString: string
}

export function DateFormatter({ dateString }: Props) {
  const date = parseISO(dateString);

  return (
    <time className={styles.dateTimeContainer} dateTime={dateString}>
      {format(date, 'd MMM yy', { locale: ptBR })}
    </time>
  );
}
