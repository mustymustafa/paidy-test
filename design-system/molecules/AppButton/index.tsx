
import {
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  TouchableOpacityProps,
} from 'react-native';
import { AppText } from '../../atoms';


interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;

}

const AppButton = ({
  title,

  onPress,

  ...rest
}: AppButtonProps) => {
  const colorScheme = useColorScheme();
  const buttonVariant =
    colorScheme === 'dark' ? 'white' : 'black';
  const textVariant =
    colorScheme === 'dark' ? 'black' : 'white';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.primary}
      {...rest}>
        <AppText variant="button" color={textVariant}>
          {title}
        </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primary: {
    backgroundColor: 'black',
    width: '20%',
    height: 45,
    borderRadius: 6,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },


 
});

export default AppButton;
