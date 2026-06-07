import type { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle
} from 'react-native';

import { colors } from '@/lib/constants/colors';
import { radius, spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  helperText?: string;
  rightElement?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export function Input({
  label,
  error,
  helperText,
  rightElement,
  containerStyle,
  style,
  multiline,
  ...props
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputWrapper, error ? styles.inputError : null, multiline ? styles.multiline : null]}>
        <TextInput
          placeholderTextColor={colors.textSecondary}
          multiline={multiline}
          style={[styles.input, multiline ? styles.multilineInput : null, style]}
          {...props}
        />
        {rightElement}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {!error && helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs
  },
  label: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '700'
  },
  inputWrapper: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    color: colors.text,
    ...typography.body
  },
  multiline: {
    minHeight: 118,
    alignItems: 'flex-start',
    paddingVertical: spacing.md
  },
  multilineInput: {
    minHeight: 92,
    textAlignVertical: 'top'
  },
  inputError: {
    borderColor: colors.error
  },
  error: {
    ...typography.caption,
    color: colors.error
  },
  helper: {
    ...typography.caption,
    color: colors.textSecondary
  }
});
