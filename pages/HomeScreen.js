// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet, Image, Pressable} from 'react-native';
import { IconButton, Provider as PaperProvider } from 'react-native-paper';
// import { TextInput } from 'react-native-gesture-handler';
import GoToButton from '../components/GoToButton'
import StopwatchTimer, {
    StopwatchTimerMethods,
  } from 'react-native-animated-stopwatch-timer';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation = useNavigation();
  const stopwatchRef = React.useRef(null);
  const [timer, setTimer] = React.useState("stopped");
  const [finished, setFinish] = React.useState(false);

  function endTimer(){
    setFinish(true);
  }

  function timerFinished(){
    if(finished){
        stopwatchRef.current?.reset()
        setFinish(false)
    }
  }

  function timerAction() {
    // timerFinished();
    if(timer == "stopped"){
        setTimer("running")
        stopwatchRef.current?.play()
    }
    else{
        setTimer("stopped")
        stopwatchRef.current?.pause()
    }
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View style = {styles.container}>   
         </View> */}
         
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable onPress={() => timerAction()}>
        <StopwatchTimer
            ref={stopwatchRef}
            containerStyle={styles.stopWatchContainer}
            initialTimeInMs={180000}
            digitStyle={Platform.select({
                ios: {
                width: 32,
                },
                android: undefined,
            })}
            separatorStyle={Platform.select({
                ios: {
                width: 14,
                },
                android: undefined,
            })}
            textCharStyle={styles.stopWatchChar}
            trailingZeros={0}
            onFinish={() => endTimer()}
            //   onPress={() => timerAction()}
            // Uncomment the below line to use it in timer mode
            // initialTimeInMs={30 * 1000}
            />
        </Pressable>
        <View style={styles.buttonsContainer}>
          {/* <IconButton
            icon="play"
            mode="contained"
            size={32}
            onPress={() => timerAction()}
          />
          <IconButton
            icon="pause"
            mode="contained"
            size={32}
            onPress={() => stopwatchRef.current?.pause()}
          /> */}
          <IconButton
            icon="refresh"
            mode="contained"
            size={32}
            onPress={() => stopwatchRef.current?.reset()}
          />
        </View>
      {/* <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
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
  stopWatchContainer: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'black',
    borderColor: 'gray',
    borderRadius: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 240,
    paddingTop: 48,
  },
  stopWatchChar: {
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#9CCC65',
  },
})