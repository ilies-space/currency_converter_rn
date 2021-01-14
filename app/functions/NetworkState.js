import {useNetInfo} from '@react-native-community/netinfo';

export function getNetworkStatu() {
  return useNetInfo().isConnected;
}
