import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Game from './src/components/game';

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <StatusBar style='light'/>
        <Game />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

