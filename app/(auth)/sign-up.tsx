import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { Link } from "expo-router";
import { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => { };

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
            icon={icons.email}
            value={form.email}
            onChangeText={(value) =>
              setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Ihr Passwort"
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

        { /* Verification comes later */}

      </View>
    </ScrollView>
  );
};

export default SignUp;
