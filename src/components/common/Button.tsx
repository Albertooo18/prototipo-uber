import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';

import { colors } from '@/lib/constants/colors';
import { radius, spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

function getTextColor(variant: ButtonVariant): string {
  if (variant === 'outline' || variant === 'ghost') {
    return colors.primary;
  }

  return colors.white;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  isLoading = false,
  leftIcon,
  style
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor(variant)} />
      ) : (
        <View style={styles.content}>
          {leftIcon}
          <Text style={[styles.text, { color: getTextColor(variant) }]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm
  },
  primary: {
    backgroundColor: colors.primary
  },
  secondary: {
    backgroundColor: colors.accent
  },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary
  },
  ghost: {
    backgroundColor: 'transparent'
  },
  danger: {
    backgroundColor: colors.error
  },
  disabled: {
    opacity: 0.55
  },
  pressed: {
    opacity: 0.85
  },
  text: {
    ...typography.button
  }
});
