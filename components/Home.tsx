import React, { useEffect, useRef, useState } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  View, 
  FlatList, 
  Keyboard, 
  Alert, 
  Linking 
} from 'react-native';
import { AppButton, AppFooter, AppModal, AppText, AppTextInput, AppHeader } from '../design-system';
import { spacing } from '../design-system/spacing';
import { useTodoContext } from '../context';
import { Swipeout } from 'react-native-swipeout-component';
import { PacmanIndicator } from 'react-native-indicators';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Home() {
  const [textInput, setTextInput] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const textInputRef = useRef<any>(null);
  const { todos, addTodo, editTodo, deleteTodo, setAuthenticated, isAuthenticated } = useTodoContext();

  /**
   * Authenticate user using biometric authentication.
   */
  const authenticateUser = async () => {
    try {
      const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();
      if (!isBiometricSupported) {
        return Alert.alert('Biometric Authentication', 'Your device does not support biometric authentication.');
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        return Alert.alert('Biometric Enrollment', 'No biometrics are enrolled.', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings().catch(() => Alert.alert('Error', 'Unable to open settings.')),
          },
        ]);
      }

      const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Authenticate to add a task' });
      if (result.success) {
        setAuthenticated(true);
        setShowModal(false);
      } else {
        Alert.alert('Authentication Failed', 'Could not verify your identity.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  /**
   * Handle adding a new todo item.
   */
  const handleAdd = () => {
    if (textInput.trim()) {
      addTodo(textInput);
      setTextInput('');
    } else {
      Alert.alert('Validation Error', 'Field cannot be empty');
    }
  };

  /**
   * Handle editing a specific todo item.
   */
  const handleEdit = (id: number) => {
    const todo = todos.find((item) => item.id === id);
    if (todo) {
      textInputRef.current?.focus();
      setTextInput(todo.text);
      setSelectedItem(id);
      setIsEditing(true);
    }
  };

  /**
   * Update the currently selected todo item.
   */
  const updateTodoItem = () => {
    if (selectedItem && textInput.trim()) {
      editTodo(selectedItem, textInput);
      setTextInput('');
      setIsEditing(false);
      setSelectedItem(null);
    } else {
      Alert.alert('Validation Error', 'Field cannot be empty');
    }
  };

  /**
   * Handle deleting a todo item.
   */
  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  /**
   * Action buttons for swipe gestures.
   */
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

  /**
   * Check authentication status on mount.
   */
  useEffect(() => {
    if (!isAuthenticated) {
      setShowModal(true);
    }
  }, [isAuthenticated, showModal]);

  /**
   * Dismiss editing mode when the keyboard hides.
   */
  useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsEditing(false);
      setTextInput('');
      setSelectedItem(null);
    });

    return () => keyboardListener.remove();
  }, []);

  return (
    <>
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <AppHeader>
          <AppText variant="heading" color="white">
            Paidy Todo
          </AppText>
        </AppHeader>

        {todos.length > 0 && (
          <AppText style={styles.swipeHint} variant="body">
            Swipe left for actions
          </AppText>
        )}

        <View style={styles.content}>
          {todos.length === 0 ? (
            <View style={styles.emptyState}>
              <PacmanIndicator size={50} />
              <AppText style={styles.emptyText} variant="body">
                You have no items in your list {`:(`}
              </AppText>
            </View>
          ) : (
            <FlatList
              data={todos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Swipeout
                  style={styles.swipeItem}
                  right={rightButtons(item.id)}
                  autoClose
                  buttonWidth={80}
                >
                  <AppText variant='body' style={styles.todoText}>{item.text}</AppText>
                </Swipeout>
              )}
            />
          )}
        </View>

        <AppFooter>
          <View style={styles.inputContainer}>
            <AppTextInput ref={textInputRef} value={textInput} onTextChange={setTextInput} />
            <AppButton title={isEditing ? 'Update' : 'Add'} onPress={isEditing ? updateTodoItem : handleAdd} />
          </View>
        </AppFooter>
      </KeyboardAvoidingView>

 
    </SafeAreaView>
         <AppModal isVisible={showModal} onClose={() => setShowModal(false)}>
         <AppText center variant="heading">
           Unlock App
         </AppText>
         <AppText center variant="body">
           You need to authenticate before adding a task.
         </AppText>
         <View style={styles.modalButton}>
           <AppButton title="Unlock" onPress={authenticateUser} />
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
  swipeHint: {
    padding: spacing.xs,
    marginTop: spacing.md,
  },
  content: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: '50%',
    padding: spacing.md,
  },
  emptyText: {
    margin: spacing.md,
  },
  swipeItem: {
    height: 50,
    backgroundColor: 'black',
    marginTop: spacing.md,
  },
  todoText: {
    padding: spacing.md,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customButtonText: {
    color: 'white',
    alignSelf: 'center',
    padding: spacing.md,
  },
  modalButton: {
    marginTop: '20%',
  },
});
