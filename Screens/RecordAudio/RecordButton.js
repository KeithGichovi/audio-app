import React from 'react';
import { StyleSheet, View, Button, Share, Alert } from 'react-native';
import { Audio } from 'expo-av';
import ErrorAlert from '../../components/ErrorAlert';
import RecordedItem from '../../components/RecordedItem';
import AudioInfo from '../../components/AudioInfo';
import { storage } from '../../Firebase/firebaseConfig';
import {ref , getDownloadURL, uploadBytes, uploadBytesResumable} from 'firebase/storage';


const  RecordButton = () => {

  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);

  /**
   * 
   * @description Starts the recording and saves it to the state.
   * @var perm - The permission to record.
   * @var recording - The recording.
   * 
   */
  const startRecording = async () => {
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
  /**
   * 
   * @description Stops the recording and saves it to the state.
   * @var allRecordings - The array of recordings.
   * @var sound - The sound of the recording.
   * @var status - The status of the recording.
   */
  let allRecordings = [...recordings];
  const stopRecording = async () => {
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    
    const { sound, status } = await recording.createNewLoadedSoundAsync();

    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(allRecordings);
    
  }
  /**
   * 
   * @param {*} milliseconds 
   * @returns 
   * @description Formats the duration of the recording.
   * @var minutes - The duration in minutes.
   * @var seconds - The duration in seconds.
   * 
   */
  const  getDurationFormatted = (milliseconds) => {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  }
  /**
   * 
   * @returns 
   * @description Returns an array of JSX elements containing the recording lines.
   * @var counter - The number of the recording.
   * @var time - The duration of the recording. 
   * @func handlePlay - The function that plays the recording.
   * @func handleSave - The function that saves the recording.
   * 
   */
  const  getRecordingLines = () => {
    return recordings.map((recordingLine, index) => {
      const counter = index + 1;
      const time = recordingLine.duration;

      const handlePlay = () => {
        recordingLine.sound.replayAsync();
      }
      /**
       * 
       * @description Uploads the recording to Firebase Storage.
       * @param {*} index
       * @param {*} fileName
       * 
       */
      const handleUpload = async (index, fileName) => {
        try {
          const sound = new Audio.Sound();
          const clickedRecording = await recordings[index].file;
          const storageRef = ref(storage, `audio/${fileName}`);
          const uploadTask = uploadBytesResumable(storageRef, clickedRecording);
          const downloadURL = await getDownloadURL(uploadTask);
      
          console.log("File uploaded successfully, download URL:", downloadURL);
        } catch (error) {
          console.error("Error uploading file:", error.message);
        }
      };
      /**
       * 
       * @param {*} index 
       * @description Handles the share button press.
       * @var allRecordings - The array of recordings.
       * 
       * 
       */
      const handleshare = async (index) => {
        try{
          
          await Share.share({
            title:'Audio Recorder',
            message: 'This audio has been shared with you, from the app "Audio Recorder".',
            url: allRecordings[index].file,
            type: 'audio/caf'
          });

        }catch(error){
          console.error("Error sharing file:", error.message);
        }
      }
      /**
       * 
       * @param {*} index
       * @description Handles the save button press.
       *  
       */
      const handleSave = (index) => {
      
        const fileName = `recording_${Date.now()}.caf`;
        handleUpload(index, fileName);
      };
      /**
       * 
       * @param {*} index 
       * @description Handles the delete button press.
       * @var allRecordings - The array of recordings.
       * @func Alert - The function that displays the alert.
       * @func setRecordings - The function that sets the state of the recordings.
       * @func splice - The function that removes the recording from the array.
       * @func onPress - The function that deletes the recording.
       */
      const handleDelete = (index) => {
        Alert.alert(
          'Confirm Deletion',
          'Are you sure you want to delete this recording?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => {
                let allRecordings = [...recordings];
                allRecordings.splice(index, 1);
                setRecordings(allRecordings);
              },
              style: 'destructive',
            },
          ],
          { cancelable: true }
        );
      };

      return (
        <View key={index} style={styles.row}> 
          <AudioInfo 
            counter={counter} 
            time={time} 
          />
          <RecordedItem 
            onPlay={handlePlay} 
            onShare={() => handleshare(index)}
            onDelete={() => handleDelete(index)} 
            onUpload={() => handleSave(index)}
          />
        </View>
      );
    });
  }

  /**
   * 
   * @description Clears the recordings from the state.
   * @var setRecordings - The state of the recordings.
   */
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