import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface AppFooterProps {
  children: ReactNode;
  background?: string;
}

const AppFooter = ({ children, background }: AppFooterProps) => {
  return (
    <View
      style={[styles.container, background && { backgroundColor: background }]}>
      {children}
    </View>
  );
};

export default AppFooter;

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    bottom: 0,          
    left: 0,            
    right: 0,            
    height: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'gray',
  },
});
