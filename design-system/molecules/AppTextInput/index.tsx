import { forwardRef, Ref } from "react";
import { StyleSheet, TextInput, View } from "react-native"

interface AppTextInputProps  {
    onTextChange: (e: string) => void;
    value: string
  }
  


const AppTextInput = forwardRef<TextInput, AppTextInputProps>((props, ref) => {

    return (
   <TextInput
        ref={ref}
        style={styles.input}
        placeholder={'Enter a task...'}
        value={props.value}
        onChangeText={(e) => props.onTextChange(e)}
      />

     
    )
})

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