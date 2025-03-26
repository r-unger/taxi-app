import CustomButton from '@/components/CustomButton';
import RideCard from '@/components/RideCard';
import { icons } from '@/constants';
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import { FlatList, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const recentRides = [
  {
    "ride_id": "1",
    "origin_address": "Berlin, Deutschland",
    "destination_address": "Berlin, Deutschland",
    "origin_latitude": "27.717245",
    "origin_longitude": "85.323961",
    "destination_latitude": "28.209583",
    "destination_longitude": "83.985567",
    "ride_time": 391,
    "fare_price": "45.20",
    "payment_status": "paid",
    "driver_id": 2,
    "user_id": "1",
    "created_at": "2024-08-12 05:19:20.620007",
    "driver": {
      "driver_id": "2",
      "first_name": "Tim",
      "last_name": "Schulz",
      "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      "car_seats": 5,
      "rating": "4.60"
    }
  },
  {
    "ride_id": "2",
    "origin_address": "Hamburg, Deutschland",
    "destination_address": "Hamburg, Deutschland",
    "origin_latitude": "18.609116",
    "origin_longitude": "77.165873",
    "destination_latitude": "18.520430",
    "destination_longitude": "73.856744",
    "ride_time": 51,
    "fare_price": "55.70",
    "payment_status": "paid",
    "driver_id": 1,
    "user_id": "1",
    "created_at": "2024-08-12 06:12:17.683046",
    "driver": {
      "driver_id": "1",
      "first_name": "Tina",
      "last_name": "Müller",
      "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      "car_seats": 4,
      "rating": "4.80"
    }
  },
  {
    "ride_id": "3",
    "origin_address": "Köln, Deutschland",
    "destination_address": "Köln, Deutschland",
    "origin_latitude": "45.815011",
    "origin_longitude": "15.981919",
    "destination_latitude": "45.327063",
    "destination_longitude": "14.442176",
    "ride_time": 124,
    "fare_price": "14.30",
    "payment_status": "paid",
    "driver_id": 1,
    "user_id": "1",
    "created_at": "2024-08-12 08:49:01.809053",
    "driver": {
      "driver_id": "1",
      "first_name": "Tina",
      "last_name": "Müller",
      "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      "car_seats": 4,
      "rating": "4.80"
    }
  },
  {
    "ride_id": "4",
    "origin_address": "Frankfurt (Main), Deutschland",
    "destination_address": "Frankfurt (Main), Deutschland",
    "origin_latitude": "34.655531",
    "origin_longitude": "133.919795",
    "destination_latitude": "34.693725",
    "destination_longitude": "135.502254",
    "ride_time": 159,
    "fare_price": "18.90",
    "payment_status": "paid",
    "driver_id": 3,
    "user_id": "1",
    "created_at": "2024-08-12 18:43:54.297838",
    "driver": {
      "driver_id": "3",
      "first_name": "Michael",
      "last_name": "Schmitz",
      "profile_image_url": "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
      "car_image_url": "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
      "car_seats": 4,
      "rating": "4.70"
    }
  }
];

const Home = () => {
  const { user } = useUser()

  return (
    <SafeAreaView className="bg-general-500">
      <SignedIn>
        <FlatList
          data={recentRides?.slice(0, 5)}
          renderItem={({ item }) => (
            <RideCard ride={item} />
          )}
          className='px-5'
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          ListEmptyComponent={() => (
            <View className='flex flex-col items-center justify-center'>
              <Text className='text-xl font-AsapSemiBold m-5'>- Keine Daten vorhanden -</Text>
            </View>
          )}
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
