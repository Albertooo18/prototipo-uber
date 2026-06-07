import { router } from 'expo-router';
import { Alert, StyleSheet, Text } from 'react-native';

import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { Header } from '@/components/common/Header';
import { Screen } from '@/components/common/Screen';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { useAuth } from '@/features/auth/useAuth';
import { colors } from '@/lib/constants/colors';
import { typography } from '@/lib/constants/typography';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  if (!user) {
    return (
      <Screen>
        <Header title="Perfil" showBack />
        <EmptyState title="Perfil no disponible" description="Inicia sesion para ver tus datos." />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title="Perfil" subtitle="Datos de tu cuenta" showBack />
      <ProfileInfo user={user} />
      <Text style={styles.note}>La edicion de perfil queda preparada para conectarse al backend.</Text>
      <Button
        title="Editar perfil"
        variant="outline"
        onPress={() => Alert.alert('Editar perfil', 'Pantalla pendiente para la siguiente iteracion.')}
      />
      <Button title="Cerrar sesion" variant="danger" onPress={() => void handleLogout()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  note: {
    ...typography.caption,
    color: colors.textSecondary
  }
});
