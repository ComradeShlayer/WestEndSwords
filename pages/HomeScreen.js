// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet, Image} from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
import GoToButton from '../components/GoToButton'
import StopwatchTimer, {
    StopwatchTimerMethods,
  } from 'react-native-animated-stopwatch-timer';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View style = {styles.container}>   
         </View> */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
    </SafeAreaView>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
     paddingTop: 23
  },
  input: {
     margin: 5,
     height: 40,
     width: 200,
     borderColor: '#144958',
     borderWidth: 1
  },
  submitButton: {
    
     padding: 10,
     margin: 15,
     height: 40,
     width: 120,
  },
  submitButtonText:{
     color: 'white'

  },
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
  space: {
    width: 20,
    height: 10,
  },
})