import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';

import { colors } from '@/lib/constants/colors';
import type { Coordinates } from '@/types/common';

type DriverMarkerProps = {
  coordinate: Coordinates;
  title?: string;
};

export function DriverMarker({ coordinate, title = 'Proveedor asignado' }: DriverMarkerProps) {
  return (
    <Marker coordinate={coordinate} title={title}>
      <View style={styles.marker}>
        <Text style={styles.text}>D</Text>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  marker: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.white
  },
  text: {
    color: colors.white,
    fontWeight: '800'
  }
});
