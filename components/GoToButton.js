import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function GoToButton({ screenName, title }) {
  const navigation = useNavigation();

  return (
    <Button
      // borderColor = '#4C8B7D'
      color = '#4C8B7D'
      style = {styles.submitButton}
      title={`${title}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}

export default GoToButton


const styles = StyleSheet.create({
  container: {
     paddingTop: 23
  },
  input: {
     margin: 5,
     height: 40,
     width: 200,
     borderColor: '#7a42f4',
     borderWidth: 1
  },
  submitButton: {
     backgroundColor: '#7a42f4',
     padding: 10,
     margin: 15,
     height: 40,
     width: 120,
  },
  submitButtonText:{
     color: 'white'
     
  }
})