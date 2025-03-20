import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import * as React from 'react';
import { useRouter, Link } from "expo-router";
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { useSignUp } from '@clerk/clerk-expo'

const SignUp = () => {
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  // Begin of Clerk snippet
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [verification, setVerification] = React.useState({
    state: "default",
    error: "",
    code: "",
  })
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'verification' to true to display second form
      // and capture OTP code
      //      setVerification(true)
      setVerification({
        ...verification,
        state: "pending",
      })
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      Alert.alert("Error", err.errors[0].longMessage)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        // TODO: Create a DB record for the user
        await setActive({ session: signUpAttempt.createdSessionId })
        //        router.replace('/')
        setVerification({
          ...verification,
          state: "success",
        })
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        //        console.error(JSON.stringify(signUpAttempt, null, 2))
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        })
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      //      console.error(JSON.stringify(err, null, 2))
      setVerification({
        ...verification,
        error: err.error[0].longMessage,
        state: "failed",
      })
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
            Erstellen Sie Ihr Konto
          </Text>
        </View>

        <View className='p-5'>
          <InputField
            label="Name"
            placeholder="Ihr Name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) =>
              setForm({ ...form, name: value })}
          />
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
            title="Registrieren"
            onPress={onSignUpPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            href="/log-in"
            className='text-lg text-center text-general-200 mt-10'
          >
            <Text>Haben Sie sich schon registriert? Hier geht's zum </Text>
            <Text className="text-primary-500">Einloggen</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-AsapExtraBold text-2xl mb-2">
              Verifizieren Sie Ihre Email-Adresse
            </Text>
            <Text className="font-Asap mb-5">
              Wir haben einen Verification Code nach {form.email} gesendet.
            </Text>
            <InputField
              label={"Code"}
              icon={icons.lock}
              placeholder={"12345"}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}

            <CustomButton
              title="Verifizieren"
              onPress={onVerifyPress}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-AsapBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Asap text-center mt-2">
              Sie haben Ihr Konto erfolgreich verifiziert.
            </Text>
            <CustomButton
              title="Zum Hauptscreen"
              onPress={() => {
                setShowSuccessModal(false);
                router.push(`/(root)/(tabs)/home`)
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
