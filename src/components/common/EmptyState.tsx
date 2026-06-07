import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

import { Button } from './Button';

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function EmptyState({ title, description, actionLabel, onActionPress }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {actionLabel && onActionPress ? (
        <Button title={actionLabel} onPress={onActionPress} style={styles.button} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.md
  },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.muted,
    borderWidth: 1,
    borderColor: colors.border
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    textAlign: 'center'
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center'
  },
  button: {
    marginTop: spacing.sm,
    alignSelf: 'stretch'
  }
});
