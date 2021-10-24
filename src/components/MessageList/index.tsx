import { api } from '../../services/api';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg';

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    api.get<Message[]>('/message/last3').then(response => {
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile2021 2021" />
      <ul className={styles.messageList}>
        {messages.length !== 0 &&
          messages.map(messageElement => (
            <li key={messageElement.id} className={styles.message}>
              <p className={styles.messageContent}>{messageElement.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img
                    src={messageElement.user.avatar_url}
                    alt={messageElement.user.name}
                  />
                </div>
                <span>{messageElement.user.name}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
