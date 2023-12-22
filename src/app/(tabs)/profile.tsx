import AddToStoryButton from '@/components/profile/AddToStoryButton';
import EditProfileButton from '@/components/profile/EditProfileButton';
import UpdateCoverPictureButton from '@/components/profile/UpdateCoverPictureButton';
import UpdateProfilePictureBottomSheet from '@/components/profile/UpdateProfilePictureBottomSheet';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors';
import useServerUser from '@/hooks/useServerUser';
import { RootState } from '@/store';
import { Ionicons, Octicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { Link } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  const { refetch } = useServerUser(true);
  const theme = useColorScheme() ?? 'dark';
  const serverUser = useSelector((state: RootState) => state.auth.serverUser);

  const updateProfileBottomSheetRef = useRef<BottomSheet>(null);

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
      setRefreshing(false);
    } catch (err) {
      setRefreshing(false);
    }
  }, []);

  if (serverUser === null) {
    return <LoadingScreen />;
  }

  return (
    <View className='flex-1'>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[Colors[theme].primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View className='relative'>
          <Image
            source={{
              uri: coverImage ?? serverUser?.coverPicture,
            }}
            className='h-56 w-full object-cover'
          />
          <View className='absolute -bottom-8 left-4'>
            <Image
              source={{
                uri: profileImage ?? serverUser?.profilePicture!,
              }}
              className='h-40 w-40 rounded-full'
              style={{
                borderWidth: 4,
                borderColor: Colors[theme].background,
              }}
            />
            <TouchableOpacity
              className='absolute right-6 bottom-0 p-2 rounded-full'
              style={{ backgroundColor: Colors[theme].background }}
              aria-label='update-profile-picture'
              onPress={() => updateProfileBottomSheetRef.current?.expand()}
            >
              <Ionicons
                size={24}
                color={Colors[theme].headerText}
                name='camera-outline'
              />
            </TouchableOpacity>
          </View>
          <UpdateCoverPictureButton
            setCoverImage={setCoverImage}
            refetch={refetch}
          />
        </View>

        <View className='mt-10 mx-4 flex space-y-2'>
          <View className='flex flex-row items-center space-x-2'>
            <Text className='text-2xl font-bold'>
              {serverUser.firstName + ' ' + serverUser.lastName}
            </Text>
            {serverUser.isHuddledVerified ? (
              <Octicons
                name='verified'
                size={24}
                color={Colors[theme].primary}
              />
            ) : null}
          </View>
          <Link href='/modals/profile/update/update-bio' className='mb-2'>
            {serverUser?.bio === '' || serverUser?.bio === null ? (
              <Text className='font-semibold underline underline-offset-2'>
                Update bio
              </Text>
            ) : (
              <Text>{serverUser?.bio}</Text>
            )}
          </Link>
          <View className='flex flex-row items-center justify-between'>
            <AddToStoryButton />
            <EditProfileButton />
            <TouchableOpacity className='h-10 w-[15%] bg-secondaryLight/10 dark:bg-secondaryDark/10 flex items-center justify-center'>
              <Ionicons
                name='ellipsis-horizontal'
                size={24}
                color={Colors[theme].headerText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <UpdateProfilePictureBottomSheet
        setProfileImage={setProfileImage}
        refetch={refetch}
        ref={updateProfileBottomSheetRef}
      />
    </View>
  );
};

export default ProfileScreen;
