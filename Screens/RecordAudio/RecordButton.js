import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import ErrorAlert from '../../components/ErrorAlert';
import RecordedItem from '../../components/RecordedItem';
import AudioInfo from '../../components/AudioInfo';



const  RecordButton = () => {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
      }
    } catch (err) {
      <ErrorAlert error={err} />
    }
  }

  async function stopRecording() {
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(allRecordings);

    
    //console.log(recording.getURI());
    return recording.getURI();
  }

  const  getDurationFormatted = (milliseconds) => {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  }
  

  const  getRecordingLines = () => {
    return recordings.map((recordingLine, index) => {

      const counter = index + 1;
      const time = recordingLine.duration;

      const handlePlay = () => {
        recordingLine.sound.replayAsync();
      }

      const handleSave = () => {
        console.log(`recording ${counter} was clicked`);
      }
      

      return (
        <View key={index} style={styles.row}> 
          <AudioInfo 
            counter={counter} 
            time={time} 
          />
          <RecordedItem 
            onPlay={handlePlay} 
            onSave={handleSave} 
          />
        </View>
      );
    });
  }


  const  clearRecordings = () => {
    setRecordings([])
  }

  return (
    <View style={styles.container}>
      <Button title={recording ? 'Stop Recording' : 'Start Recording\n\n\n'} onPress={recording ? stopRecording : startRecording} />
      {getRecordingLines()}
      <Button title={recordings.length > 0 ? '\n\n\nClear Recordings' : ''} onPress={clearRecordings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default RecordButton;