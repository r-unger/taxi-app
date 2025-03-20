import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { Link, useRouter } from "expo-router";
import * as React from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo'

const LogIn = () => {

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  // Begin of Clerk snippet
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  // Handle the submission of the sign-in form
  const onLogInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
        Alert.alert("Error",
          "Der Login konnte nicht durchgeführt werden. Grund: "
          + signInAttempt.status)
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      Alert.alert("Error", err.errors[0].longMessage)
    }
  }
  // End of Clerk snippet

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className='relative w-full h-[250px]'>
          <Image
            source={images.signUpCar}
            className='z-0 w-full h-[250px]'
          />
          <Text className='text-2xl text-black font-AsapSemiBold absolute bottom-5 left-5'>
            👋 Willkommen
          </Text>
        </View>

        <View className='p-5'>
          <InputField
            label="Email"
            placeholder="Ihre Email-Adresse"
            textContentType="emailAddress"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) =>
              setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Ihr Passwort"
            textContentType="password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) =>
              setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Einloggen"
            onPress={onLogInPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            href="/sign-up"
            className='text-lg text-center text-general-200 mt-10'
          >
            <Text>Haben Sie sich noch nicht registriert? Hier geht's zum </Text>
            <Text className="text-primary-500">Registrieren</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default LogIn;
