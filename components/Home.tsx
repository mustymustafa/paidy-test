import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, View, FlatList, Keyboard, Alert, Linking } from 'react-native';
import { AppButton, AppFooter, AppModal, AppText, AppTextInput } from '../design-system';
import { AppHeader } from '../design-system';
import { useEffect, useRef, useState } from 'react';
import { Swipeout } from 'react-native-swipeout-component';
import { spacing } from '../design-system/spacing';
import { useTodoContext } from '../context';
import {PacmanIndicator} from 'react-native-indicators';
import * as LocalAuthentication from 'expo-local-authentication';


export default function Home() {
  const [textInput, setTextInput] = useState<string>('');
  const { todos, addTodo, editTodo, deleteTodo, setAuthenticated, isAuthenticated } = useTodoContext(); // Get context values
  const [isEditing, setIsEditing] = useState(false)
  const [selectedItem, setSelectedItem] = useState<number | null>()
  const [showModal, setShowModal] = useState(false)

  const textInputRef = useRef<any>(null)

  const authenticateUser = async () => {
    const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();
    if (!isBiometricSupported) {
      return Alert.alert(
        'Biometric Authentication',
        'Your device does not support biometric authentication.'
      );
    }
  
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      return Alert.alert(
        'Biometric Enrollment',
        'No biometrics are enrolled. Would you like to set it up now?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open settings',
            onPress: () => {
                Linking.openSettings().catch(() => {
                  Alert.alert('Error', 'Unable to open settings.');
                });
              }, 
          },
        ]
      );
    }
  
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to add a task',
    });
  
    if (result.success) {
      setAuthenticated(true); // Set the authenticated state in context
      setShowModal(false)
    } else {
      Alert.alert('Authentication Failed', 'Could not verify your identity.');
    }
  };

  const handleAdd = () => {
    if (textInput.trim()) {
      addTodo(textInput); 
      setTextInput(''); 
    } else {
        alert('field can not be empty')
    }
  };

  const handleEdit = (id: number) => {
    //we want to automatically open the keyboard when you click on edit for a better User Experience
    //on simulator it should automatically focus the text input
    textInputRef.current?.focus();
    setSelectedItem(id)
        setIsEditing(true)
       const getTodo = todos.find((todo) => todo.id == id)
       setTextInput(getTodo?.text ?? '')
  };

  const updateTodoItem = () => {
    if(selectedItem){
        if(!textInput) return alert('field can not be empty')
        editTodo(selectedItem, textInput);
        setIsEditing(false)
        setTextInput('')
        setSelectedItem(null);
    } else {
        alert('Ops! selected item not found')
    }

  }

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  const rightButtons = (id: number) => [
    {
      component: <AppText variant='body' style={styles.customButtonText}>Delete</AppText>,
      buttonBackgroundColor: 'red',
      onPress: () => handleDelete(id),
    },
    {
      component: <AppText variant='body' style={styles.customButtonText}>Edit</AppText>,
      buttonBackgroundColor: 'green',
      onPress: () => handleEdit(id),
    },
  ];


    //we need to check the authentication status before carrying out any action
    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthenticated) {
                setShowModal(true)
              }
        }
     checkAuth()
      
    }, [showModal])

    // Detect when keyboard is dismissed and cancel the editing action
    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setIsEditing(false); 
            setTextInput('')
            setSelectedItem(null);
         
          }
        );
    
        // Clean up the listener when the component unmounts
        return () => {
          keyboardDidHideListener.remove();
        };
      }, []);


    const handleUnlockApp = async () => {
         await authenticateUser();
     
    }

  return (
    <>
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <AppHeader>
          <AppText variant="heading" color="white">Paidy Todo</AppText>
        </AppHeader>
        {todos.length > 0 &&     <AppText style={{ padding: spacing.xs, marginTop: spacing.md }} variant="body">
          Swipe left for actions
        </AppText>}
    

     


<View style={{ flex: 1 }}>
    {todos.length == 0 &&
    <View style={{alignItems: 'center', marginTop: '50%', padding: 20}}>
        
    <PacmanIndicator size={50} />
    <AppText style={{margin: 30}} variant='body'>You have no items in your list {`:(`}</AppText>
    </View>
    }
  <FlatList
    data={todos} 
    keyExtractor={(item) => item.id.toString()} 
    renderItem={({ item }) => (
      <Swipeout
        key={item.id}
        style={{ height: 50, backgroundColor: 'black', top: 10, bottom: spacing.md, marginTop: 10 }}
        right={rightButtons(item.id)} 
        autoClose={true}
        rightBackgroundColor="black"
        buttonWidth={80}
        autoOpenRight={item.id == 1}
      >
        <AppText variant='body' color='white' style={{ padding: spacing.md }}>
          {item.text}
        </AppText>
      </Swipeout>
    )}
  />
</View>

        <AppFooter>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <AppTextInput ref={textInputRef} value={textInput} onTextChange={(e) => setTextInput(e)} />
            <AppButton title={isEditing ? 'Update' : 'Add'} onPress={isEditing ? updateTodoItem : handleAdd} />
          </View>
        </AppFooter>
      </KeyboardAvoidingView>


    </SafeAreaView>
    <AppModal onClose={() => {setShowModal(false)}} isVisible={showModal}>
    <AppText center variant='heading'>Unlock App</AppText>
    <AppText center variant='body'>you need to be authenticated before adding a task</AppText>


    <View style={{top: '20%'}}>
        <AppButton title='Unlock' onPress={handleUnlockApp} />
    </View>
</AppModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  customButtonText: {
    color: 'white',
    alignSelf: 'center',
    padding: spacing.md,
  },
});
