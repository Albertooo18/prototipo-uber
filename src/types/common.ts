export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type SelectOption<TValue extends string = string> = {
  label: string;
  value: TValue;
};

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
