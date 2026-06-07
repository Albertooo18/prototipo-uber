export type PaymentMethodType = 'cash' | 'yappy' | 'bank_transfer' | 'future_card';

export type PaymentMethod = {
  id: PaymentMethodType;
  label: string;
  description: string;
  enabled: boolean;
  comingSoon?: boolean;
};
