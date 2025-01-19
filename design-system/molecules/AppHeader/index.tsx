
import { ReactNode } from 'react';
import {  View, StyleSheet } from 'react-native';

interface AppHeaderProps {
  children: ReactNode;
}
const AppHeader = ({ children }: AppHeaderProps) => {


  return (
    <View
      style={styles.container}>
      {children}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        top: 0,
        position: 'static',
        height: 70,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: 'gray',
      }
})