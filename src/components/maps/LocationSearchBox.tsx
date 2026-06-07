import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { spacing } from '@/lib/constants/spacing';

type LocationSearchBoxProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  onUseCurrentLocation?: () => void;
};

export function LocationSearchBox({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  onUseCurrentLocation
}: LocationSearchBoxProps) {
  return (
    <View style={styles.container}>
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        error={error}
      />
      {onUseCurrentLocation ? (
        <Button title="Usar ubicacion actual" variant="outline" onPress={onUseCurrentLocation} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md
  }
});
