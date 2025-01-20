import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, View, FlatList } from 'react-native';
import { AppButton, AppFooter, AppText, AppTextInput } from '../design-system';
import { AppHeader } from '../design-system';
import { useState } from 'react';
import { Swipeout } from 'react-native-swipeout-component';
import { spacing } from '../design-system/spacing';
import { useTodoContext } from '../context';
import {
    PacmanIndicator,
 
  } from 'react-native-indicators';


export default function Home() {
  const [textInput, setTextInput] = useState<string>('');
  const { todos, addTodo, editTodo, deleteTodo } = useTodoContext(); // Get context values
  const [isEditing, setIsEditing] = useState(false)
  const [selectedItem, setSelectedItem] = useState<number>()

  const handleAdd = () => {
    if (textInput.trim()) {
      addTodo(textInput); 
      setTextInput(''); 
    }
  };

  const handleEdit = (id: number) => {
    setSelectedItem(id)
        setIsEditing(true)
       const getTodo = todos.find((todo) => todo.id == id)
       setTextInput(getTodo?.text ?? '')
  };

  const updateTodoItem = () => {
    if(selectedItem){
        editTodo(selectedItem, textInput);
        setIsEditing(false)
        setTextInput('')
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

  return (
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
    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '50%', padding: 20}}>
        
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
            <AppTextInput value={textInput} onTextChange={(e) => setTextInput(e)} />
            <AppButton title={isEditing ? 'Update' : 'Add'} onPress={isEditing ? updateTodoItem : handleAdd} />
          </View>
        </AppFooter>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
