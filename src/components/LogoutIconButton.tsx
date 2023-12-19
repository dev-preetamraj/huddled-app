import Colors from '@/constants/Colors';
import { removerServerUser } from '@/features/auth/authSlice';
import { AppDispatch } from '@/store';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { useDispatch } from 'react-redux';

const LogoutIconButton = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useColorScheme();
  const { signOut } = useAuth();

  const handleSignout = () => {
    signOut();
    dispatch(removerServerUser());
  };
  return (
    <Ionicons
      name='log-out-outline'
      size={24}
      color={Colors[theme ?? 'dark'].headerText}
      style={{ marginRight: 16 }}
      onPress={handleSignout}
    />
  );
};

export default LogoutIconButton;
