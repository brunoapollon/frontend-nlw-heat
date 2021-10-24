import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg';

export function MessageList() {
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile2021 2021" />
      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>Texto texto texto textp</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/brunoapollon.png"
                alt=" Bruno lopes "
              />
            </div>
            <span>Bruno Lopes</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>Texto texto texto textp</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/brunoapollon.png"
                alt=" Bruno lopes "
              />
            </div>
            <span>Bruno Lopes</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>Texto texto texto textp</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/brunoapollon.png"
                alt=" Bruno lopes "
              />
            </div>
            <span>Bruno Lopes</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
