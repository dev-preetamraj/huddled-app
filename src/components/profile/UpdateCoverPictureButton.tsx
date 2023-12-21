import Colors from '@/constants/Colors';
import { RootState } from '@/store';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { FC, useState } from 'react';
import { ToastAndroid, TouchableOpacity, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import ActivityIndicator from '../ui/ActivityIndicator';

const BASE_REST_URL = process.env.EXPO_PUBLIC_REST_SERVER_URI;

type Props = {
  setCoverImage: (value: string | null) => void;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<ProfileQuery>>;
};

const UpdateCoverPictureButton: FC<Props> = ({ setCoverImage, refetch }) => {
  const theme = useColorScheme() ?? 'dark';
  const serverUser = useSelector((state: RootState) => state.auth.serverUser);
  const [imageUploading, setImageUploading] = useState(false);

  const updateCoverPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      const imageType =
        'image/' + imageUri.split('.')[imageUri.split('.').length - 1];
      setCoverImage(imageUri);

      const imageName =
        serverUser?.firstName?.toLocaleLowerCase() +
        '_cover.' +
        imageType.split('/')[1];

      try {
        const formData = new FormData();

        // @ts-ignore
        formData.append('picture', {
          uri: imageUri,
          name: imageName,
          type: imageType,
        });

        const postUri = `${BASE_REST_URL}/auth/upload-user-picture/cover`;

        setImageUploading(true);
        await axios.post(postUri, formData, {
          headers: {
            Authorization: `Bearer ${serverUser?.id}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        refetch();
        setCoverImage(null);
        ToastAndroid.showWithGravity(
          'Cover picture updated',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setImageUploading(false);
      } catch (err) {
        console.log(err);
        setCoverImage(null);
        setImageUploading(false);
      }
    }
  };

  return (
    <TouchableOpacity
      className='absolute right-5 bottom-5 p-2 rounded-full'
      style={{ backgroundColor: Colors[theme].background }}
      aria-label='update-cover-picture'
      disabled={imageUploading}
    >
      {imageUploading ? (
        <ActivityIndicator />
      ) : (
        <Ionicons
          size={24}
          color={Colors[theme].headerText}
          name='camera-outline'
          onPress={updateCoverPicture}
        />
      )}
    </TouchableOpacity>
  );
};

export default UpdateCoverPictureButton;
