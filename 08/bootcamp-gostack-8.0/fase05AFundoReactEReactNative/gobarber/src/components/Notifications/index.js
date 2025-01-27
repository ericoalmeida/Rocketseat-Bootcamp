import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    () => !!notifications.find(notification => notification.lido === false),
    [notifications]
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notificacao');

      const data = response.data.map(notificacao => ({
        ...notificacao,
        timeDistance: formatDistance(
          parseISO(notificacao.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));

      setNotifications(data);
    }

    loadNotifications();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notificacao/${id}`);

    setNotifications(
      notifications.map(notification =>
        notification._id === id ? { ...notification, lido: true } : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>
      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.lido}>
              <p>{notification.conteudo}</p>
              <time>{notification.timeDistance}</time>
              {!notification.lido && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Marcar como lido
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
