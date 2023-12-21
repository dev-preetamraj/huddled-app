import Colors from '@/constants/Colors';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import {
  ToastAndroid,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import ActivityIndicator from '../ui/ActivityIndicator';
import Text from '../ui/Text';

const BASE_REST_URL = process.env.EXPO_PUBLIC_REST_SERVER_URI;

type Props = {
  setProfileImage: (value: string | null) => void;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<ProfileQuery>>;
};

type Ref = BottomSheet;

const UpdateProfilePictureBottomSheet = forwardRef<Ref, Props>(
  ({ setProfileImage, refetch }, ref) => {
    const theme = useColorScheme() ?? 'dark';
    const { user, isLoaded } = useUser();
    const [imageUploading, setImageUploading] = useState(false);

    const snapPoints = useMemo(() => ['20%'], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );

    const updateProfilePicture = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;

        const imageType =
          'image/' + imageUri.split('.')[imageUri.split('.').length - 1];
        setProfileImage(imageUri);

        const imageName =
          user?.firstName?.toLocaleLowerCase() +
          '_profile.' +
          imageType.split('/')[1];

        try {
          const formData = new FormData();

          // @ts-ignore
          formData.append('picture', {
            uri: imageUri,
            name: imageName,
            type: imageType,
          });

          const postUri = `${BASE_REST_URL}/auth/upload-user-picture/profile`;

          setImageUploading(true);
          await axios.post(postUri, formData, {
            headers: {
              Authorization: `Bearer ${user?.id}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          refetch();
          setProfileImage(null);
          ToastAndroid.showWithGravity(
            'Profile picture updated',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setImageUploading(false);
        } catch (err) {
          console.log(err);
          setProfileImage(null);
          setImageUploading(false);
        }
      }
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: Colors[theme].card,
        }}
        handleIndicatorStyle={{ backgroundColor: Colors[theme].headerText }}
      >
        <View className='flex-1 m-4 flex space-y-4'>
          <TouchableOpacity className='flex flex-row items-center space-x-4'>
            <Ionicons
              name='person-circle-outline'
              size={24}
              color={Colors[theme].headerText}
            />
            <Text header className='text-xl'>
              See profile picture
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='flex flex-row items-center space-x-4'
            onPress={updateProfilePicture}
          >
            {imageUploading ? (
              <ActivityIndicator />
            ) : (
              <Ionicons
                name='image-outline'
                size={24}
                color={Colors[theme].headerText}
              />
            )}
            <Text header className='text-xl'>
              {imageUploading ? 'Updating...' : 'Upload from device'}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    );
  }
);

export default UpdateProfilePictureBottomSheet;
