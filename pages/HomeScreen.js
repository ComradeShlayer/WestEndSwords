// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet, Image, Pressable} from 'react-native';
import { IconButton, Provider, Colors} from 'react-native-paper';
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
  const [leftScore, setLeft] = React.useState(0);
  const [rightScore, setRight] = React.useState(0);
  const [timerLength, setLength] = React.useState(180000);
  const [win, setWin] = React.useState(false);

  function checkScores(){
    if(timerLength == 60000 && (rightScore == 4 || leftScore == 4)){
      stopwatchRef.current?.pause()
      setWin(true)
    }
    else if(timerLength == 180000 && (rightScore == 14 || leftScore == 14)){
      stopwatchRef.current?.pause()
      setWin(true)
    }
  }
  
  function changeRight(change){
    if( (change == -1 && rightScore == 0)||(change == 1 && rightScore == 15) ){}
    else{
      setRight(rightScore + change);
      checkScores();
    }
  }

  function changeLeft(change){
    if( (change == -1 && leftScore == 0)|| (change == 1 && leftScore == 15)){}
    else{
      setLeft(leftScore + change);
      checkScores();
    }
  }
 
  function reset(){
    setWin(false);
    setLeft(0);
    setRight(0);
    setFinish(false);
    stopwatchRef.current?.reset()
  }

  function endTimer(){
    setFinish(true);
    stopwatchRef.current?.pause()
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

  function timerSet(length) {
    setLength(length);
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
            initialTimeInMs={timerLength}//180000
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
          <IconButton
            icon="refresh"
            mode="contained"
            size={32}
            onPress={() => reset()}
          />
          <IconButton
            icon="clock-time-three"
            mode="contained"
            size={32}
            onPress={() => timerSet(180000)}
          />
          <IconButton
            icon="clock-time-one"
            mode="contained"
            size={32}
            onPress={() => timerSet(60000)}
          />
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
          {/* <IconButton
            icon="refresh"
            mode="contained"
            size={32}
            onPress={() => stopwatchRef.current?.reset()}
          /> */}
        </View>
        <View style={styles.scoreControlContainer}>
          <IconButton
              icon="arrow-up-drop-circle"
              mode="contained"
              // animated={false}
              iconColor="#e80505"
              backgroundColor="#ffd7d4"
              // color="#144958"
              style={styles.red}
              size={32}
              onPress={() => changeLeft(1)}
          />
          <IconButton
            icon="arrow-up-drop-circle"
            mode="contained"
            iconColor="#00b03b"
            backgroundColor="#bdfcd5"
            size={32}
            onPress={() => changeRight(1)}
          />
        </View>
        <View style={styles.scoreContainer}>
            <Text style={styles.scoreLeft}>{leftScore}</Text>
            <Text style={styles.scoreRight}>{rightScore}</Text>
          </View>
          <View style={styles.scoreControlContainer}>
          <IconButton
              icon="arrow-down-drop-circle"
              mode="contained"
              // animated={false}
              iconColor="#e80505"
              backgroundColor="#ffd7d4"
              // color="#144958"
              // style={styles.red}
              size={32}
              onPress={() => changeLeft(-1)}
          />
          <IconButton
            icon="arrow-down-drop-circle"
            mode="contained"
            iconColor="#00b03b"
            backgroundColor="#bdfcd5"
            size={32}
            onPress={() => changeRight(-1)}
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
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 240,
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  scoreControlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  stopWatchChar: {
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#9CCC65',
  },
  scoreLeft: {
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#e80505',
  },
  red: {
    borderColor: '#e80505',
    borderWidth: 0,
    color: 'red',
  },
  scoreRight: {
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#00b03b',
  },
})