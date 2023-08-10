// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Pressable, Modal} from 'react-native';
import { IconButton, Provider, Button, Chip } from 'react-native-paper';
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
  const [dice, setDice] = React.useState("dice-6");
  const [advantage, setAdvantage] = React.useState(false);
  const [advantageLeft, setAdvLeft] = React.useState(false);
  const [advantageRight, setAdvRight] = React.useState(false);
  var left, right = false;
  const [advantageIcon, setAdvantageIcon] = React.useState("flag");
  const [modalVisible, setModalVisible] = React.useState(false);

  // this.setState({showAdvantage: true}) 

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
 
  function double(){
    if(rightScore >= 14 || leftScore >= 14) {}
    else{
      setRight(rightScore + 1);
      setLeft(leftScore + 1);
      checkScores();
    }
  }

  function reset(){
    setWin(false);
    setLeft(0);
    setRight(0);
    setFinish(false);
    setAdvantage(false);
    setAdvRight(false);
    setAdvLeft(false);
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

  function diceRoll() {
    var flip = Math.floor(Math.random() * 2);
    
    if (flip){
      setAdvRight(false)
      setAdvLeft(true)
      console.log("left")
    }
    else{
      setAdvLeft(false)
      setAdvRight(true)
      console.log("right")
    }
    setAdvantage(true)
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
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
          <View style={styles.topBuffer}>
          <Button  mode="contained-tonal" buttonColor="#c9a940" textColor="#594d2e" onPress={() => double()}>Double</Button>
          </View>
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
            <View style={styles.topBuffer}>
              <Button  mode="contained-tonal" buttonColor="#c9a940" textColor="#594d2e" onPress={() => setModalVisible(true)}>Cards</Button>
            </View>
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
              icon={dice}
              mode="contained"
              // animated={false}
              iconColor="black"
              backgroundColor="#c9a940"
              // color="#144958"
              // style={styles.red}
              size={32}
              onPress={() => diceRoll()}
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
        
        <View style={styles.advantageContainer}>
          { advantage &&
          <View style={styles.scoreControlContainer}>  
          { advantageLeft &&
            <IconButton
            icon={advantageIcon}
            mode="contained"
            iconColor="#e80505"
            backgroundColor="#ffd7d4"
            size={32}
            // onPress={() => changeRight(-1)}
            />
          }
          { advantageRight &&
          <View style={styles.advantageFlag}>
            <IconButton
            icon={advantageIcon}
            mode="contained"
            iconColor="#00b03b"
            backgroundColor="#bdfcd5"
            size={32}
            // onPress={() => changeRight(-1)}
            />
            </View>
          }
          </View>
          }
          
          
        </View>
      
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
  advantageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingHorizontal: 0,
  },
  advantageFlag: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // paddingTop: 30,
    paddingHorizontal: 210,
    // width: 20
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
  topBuffer: {
    paddingTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
})