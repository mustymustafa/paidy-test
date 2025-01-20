import { StyleSheet, TextInput, View } from "react-native"

interface AppTextInputProps  {
    onTextChange: (e: string) => void;
    value: string
 

  
  }
  


const AppTextInput = ({onTextChange, value}: AppTextInputProps) => {

    return (
   <TextInput
        style={styles.input}
        placeholder={'Enter a task...'}
        value={value}
        onChangeText={(e) => onTextChange(e)}
      />

     
    )
}

export default AppTextInput;

const styles = StyleSheet.create({

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        height: 45,
        padding: 10,
        width: '55%',
        margin: 20,

      },
})