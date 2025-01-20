import { ReactNode } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

interface AppFooterProps {
  children: ReactNode;
  background?: string;
}

const AppFooter = ({ children, background }: AppFooterProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, background && { backgroundColor: background }]}
      keyboardVerticalOffset={60}
    >
     
        {children}

    </KeyboardAvoidingView>
  );
};

export default AppFooter;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    bottom: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    alignContent: 'center',
  },
});
