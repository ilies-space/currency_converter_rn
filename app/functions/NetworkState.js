import {useNetInfo} from '@react-native-community/netinfo';

export function getNetworkStatu() {
  const isConnected = useNetInfo().isConnected;
  return isConnected;
}
