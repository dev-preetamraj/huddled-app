import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors';
import useServerUser from '@/hooks/useServerUser';
import { RootState } from '@/store';
import { gql, useMutation } from '@apollo/client';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { TextInput, ToastAndroid, View, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

const bioSchema = Yup.object({
  bio: Yup.string()
    .max(100, 'Bio must be 100 or less characters long')
    .required('Bio must not be empty'),
});

const UPDATE_BIO = gql`
  mutation UpdateProfile($bio: String) {
    updateProfile(bio: $bio) {
      user {
        bio
      }
    }
  }
`;

const UpdateBioModal = () => {
  const theme = useColorScheme() ?? 'dark';
  const [updateBioMutation, { data, error, loading }] = useMutation(UPDATE_BIO);
  const { refetch } = useServerUser(true);
  const serverUser = useSelector((state: RootState) => state.auth.serverUser);

  const multilineValue = (charLength: number) => {
    return Math.ceil(charLength / 35);
  };

  const onSubmit = async (bio: string) => {
    try {
      await updateBioMutation({
        variables: {
          bio,
        },
      });
      refetch();
      router.push('/(tabs)/profile');
      ToastAndroid.show('Bio updated', ToastAndroid.SHORT);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View className='m-4'>
      <Formik
        initialValues={{ bio: serverUser?.bio! }}
        validationSchema={bioSchema}
        onSubmit={(values) => onSubmit(values.bio!)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View className='flex space-y-2 mb-4'>
              <TextInput
                placeholderTextColor={Colors[theme].text}
                placeholder='Write your bio...'
                onChangeText={handleChange('bio')}
                onBlur={handleBlur('bio')}
                value={values.bio}
                numberOfLines={multilineValue(values.bio.length ?? 0)}
                multiline
                cursorColor={Colors[theme].primary}
                className='border border-primaryLight dark:border-primaryDark rounded-md p-2 text-textLight dark:text-textDark'
              />
              {errors.bio && touched.bio ? (
                <Text className='text-sm text-red-500 dark:text-red-600'>
                  {errors.bio}
                </Text>
              ) : null}
              <Text className='text-right'>{values.bio.length ?? 0}/100</Text>
            </View>
            {loading ? (
              <Button
                showLoading
                onPress={() => handleSubmit()}
                title='Updating...'
                disabled
              />
            ) : (
              <Button
                onPress={() => handleSubmit()}
                title='Update bio'
                disabled={errors.bio !== undefined}
              />
            )}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default UpdateBioModal;
