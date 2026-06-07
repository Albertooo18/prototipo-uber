import { useCallback, useEffect, useState } from 'react';

import { paymentsApi } from './payments.api';
import type { PaymentMethod } from './payments.types';

export function usePayments() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPaymentMethods = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await paymentsApi.getPaymentMethods();
      setPaymentMethods(response.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPaymentMethods();
  }, [loadPaymentMethods]);

  return {
    paymentMethods,
    isLoading,
    loadPaymentMethods
  };
}
