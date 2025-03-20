import CustomButton from '@/components/CustomButton';
import { icons } from '@/constants';
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import { Image, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { user } = useUser()
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/log-in");
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <Text>Home</Text>
      <SignedIn>
        <Text>Hello</Text>
        <Text>{user?.emailAddresses[0].emailAddress}</Text>
        <CustomButton
          title="Ausloggen"
          className="mt-5 w-full shadow-none"
          IconLeft={() => (
            <Image
              source={icons.out}
              resizeMode="contain"
              className="w-5 h-5 mx-2"
            />
          )}
          bgVariant="outline"
          textVariant="primary"
          onPress={handleSignOut}
        />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/log-in">
          <Text>Log in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </SafeAreaView>
  );
};

export default Home;
