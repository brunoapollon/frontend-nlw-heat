import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { api } from '../../services/api';

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

const messageQueue: Message[] = [];

const socket = io('http://localhost:3333');

socket.on('new_messgae', (newMessage: Message) => {
  messageQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messageQueue.length > 0) {
        setMessages(prevState =>
          [messageQueue[0], prevState[0], prevState[1]].filter(Boolean),
        );
      }
    }, 3000);
  }, []);

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
