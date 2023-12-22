import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Text from './Text';

type DataType = {
  id: string;
  name: string;
}[];

export interface IDropDownMenu {
  title: string;
  searchable?: boolean;
  data: DataType;
  setData: Dispatch<SetStateAction<DataType>>;
  selectedValue: string;
  setter: (value: string) => void;
}

const DropDownMenu: FC<IDropDownMenu> = ({
  title,
  searchable = false,
  data,
  setData,
  selectedValue,
  setter,
}) => {
  const theme = useColorScheme() ?? 'dark';
  const [clicked, setClicked] = useState(false);

  const [originalData, setOriginalData] = useState(data);

  const onPress = () => {
    setClicked(!clicked);
  };

  const onSearch = (text: string) => {
    let tempData = originalData.filter(
      (item) => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
    );
    setData(tempData);
  };

  return (
    <View className='flex space-y-4'>
      <Pressable
        onPress={onPress}
        className='flex flex-row items-center justify-between border border-primaryLight dark:border-primaryDark p-2 rounded-md'
      >
        <Text>{selectedValue === '' ? title : selectedValue}</Text>
        {clicked ? (
          <Ionicons name='chevron-up' size={24} color={Colors[theme].text} />
        ) : (
          <Ionicons name='chevron-down' size={24} color={Colors[theme].text} />
        )}
      </Pressable>
      {clicked ? (
        <View className='bg-cardLight dark:bg-cardDark w-full h-[300px] rounded-md p-4'>
          {searchable ? (
            <TextInput
              placeholderTextColor={Colors[theme].text}
              placeholder='Search...'
              onChangeText={(text) => onSearch(text)}
              cursorColor={Colors[theme].primary}
              className='border border-primaryLight dark:border-primaryDark rounded-md px-2 py-1 mb-2 text-textLight dark:text-textDark'
            />
          ) : null}

          <FlashList
            nestedScrollEnabled
            data={data}
            estimatedItemSize={250}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setter(item.id);
                  setClicked(false);
                  setData(originalData);
                }}
                className='border-b border-borderLight dark:border-borderDark flex justify-center h-14'
              >
                <Text className='text-lg'>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}
    </View>
  );
};

export default DropDownMenu;
