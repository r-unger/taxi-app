import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = () => {
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <Text>Welcome</Text>
    </SafeAreaView>
  );
};

export default Welcome;
