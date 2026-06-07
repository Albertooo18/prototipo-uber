import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/common/Card';
import type { User } from '@/features/user/user.types';
import { colors } from '@/lib/constants/colors';
import { spacing } from '@/lib/constants/spacing';
import { typography } from '@/lib/constants/typography';

type ProfileInfoProps = {
  user: User;
};

export function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <Card>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user.fullName.slice(0, 1).toUpperCase()}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.text}>{user.email}</Text>
        <Text style={styles.text}>{user.phone}</Text>
        {user.defaultAddress ? <Text style={styles.text}>{user.defaultAddress}</Text> : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary
  },
  avatarText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 28
  },
  info: {
    gap: spacing.xs
  },
  name: {
    ...typography.subtitle,
    color: colors.text
  },
  text: {
    ...typography.body,
    color: colors.textSecondary
  }
});
