import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { AppFooter, AppText } from './design-system';
import { AppHeader } from './design-system';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        


    <AppHeader>
      <AppText variant='heading' color='white'>Paidy Todo</AppText>
    </AppHeader>


    
<AppFooter></AppFooter>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
