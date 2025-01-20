import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, View, Text } from 'react-native';
import { TodoProvider, useTodoContext } from './context';
import Home from './components/Home';


export default function App() {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
       <TodoProvider>
        <Home />
       </TodoProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    padding: 20,
    backgroundColor: 'white',
  },
  customButtonText: {
    color: 'white',
    alignSelf: 'center',
    marginTop: '50%',
  },
});
