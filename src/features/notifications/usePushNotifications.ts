import { useEffect, useState } from 'react';

import { registerForPushNotificationsAsync } from './notifications.service';

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    void registerForPushNotificationsAsync().then((token) => {
      if (mounted) {
        setExpoPushToken(token);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return {
    expoPushToken
  };
}
