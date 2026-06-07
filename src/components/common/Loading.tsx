import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

type LoadingProps = {
  message?: string;
};

export function Loading({ message = 'Cargando...' }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.background,
    padding: spacing.xl
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center'
  }
});
