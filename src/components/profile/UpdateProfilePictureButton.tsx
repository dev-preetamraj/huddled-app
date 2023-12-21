import Colors from '@/constants/Colors';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { FC, useState } from 'react';
import { ToastAndroid, TouchableOpacity, useColorScheme } from 'react-native';
import ActivityIndicator from '../ui/ActivityIndicator';

const BASE_REST_URL = process.env.EXPO_PUBLIC_REST_SERVER_URI;

type Props = {
  setProfileImage: (value: string | null) => void;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<ProfileQuery>>;
};

const UpdateProfilePictureButton: FC<Props> = ({
  setProfileImage,
  refetch,
}) => {
  const { user, isLoaded } = useUser();
  const theme = useColorScheme() ?? 'dark';

  const [imageUploading, setImageUploading] = useState(false);

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
    <TouchableOpacity
      className='absolute right-6 bottom-0 p-2 rounded-full'
      style={{ backgroundColor: Colors[theme].background }}
      aria-label='update-profile-picture'
      disabled={imageUploading}
      onPress={updateProfilePicture}
    >
      {imageUploading ? (
        <ActivityIndicator />
      ) : (
        <Ionicons
          size={24}
          color={Colors[theme].headerText}
          name='camera-outline'
        />
      )}
    </TouchableOpacity>
  );
};

export default UpdateProfilePictureButton;
