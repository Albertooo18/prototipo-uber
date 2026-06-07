import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

type HeaderProps = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightElement?: ReactNode;
};

export function Header({ title, subtitle, showBack = false, rightElement }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack ? (
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>{'<'}</Text>
          </Pressable>
        ) : null}
        <View style={styles.copy}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {rightElement}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md
  },
  copy: {
    flex: 1,
    gap: spacing.xs
  },
  title: {
    ...typography.subtitle,
    color: colors.text
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  backText: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '700'
  }
});
