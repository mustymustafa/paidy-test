import {
    StyleSheet,
    useColorScheme,
    View,
  } from "react-native";
  import React from "react"; 
import Modal from "react-native-modal";
  
  type ModalProps = {
    isVisible: boolean;
    children: React.ReactNode;
    onClose: () => void;
  };

  
  const AppModal = (props: ModalProps): React.ReactElement => {
    const { children, isVisible, onClose } = props;
    const theme = useColorScheme()
    const darkMode = theme === "dark"

  
    return (
      <Modal
        onBackdropPress={onClose}
        coverScreen={false}
        style={styles.view}
        isVisible={isVisible}
      >
        <View
          style={[
            darkMode ? styles.darkMode : styles.content,
            {
              height: '40%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          ]}
        >
          {children}
  
        </View>
      </Modal>
    );
  };
  
  export default AppModal;
  
  const styles = StyleSheet.create({
    view: {
      justifyContent: "flex-end",
      margin: 0,
    },
    darkMode: {
        backgroundColor: '#e5e5e5',
        padding: 22,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    content: {
      backgroundColor: "white",
      padding: 22,  
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
  });
  