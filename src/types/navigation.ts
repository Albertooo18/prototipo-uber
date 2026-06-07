export type AppRoute =
  | '/(auth)/login'
  | '/(auth)/register'
  | '/(auth)/forgot-password'
  | '/(client)/home'
  | '/(client)/request-service'
  | '/(client)/service-tracking'
  | '/(client)/service-history'
  | '/(client)/profile'
  | '/(client)/support'
  | '/(client)/payment-methods';

export type ServiceDetailRouteParams = {
  id: string;
};
