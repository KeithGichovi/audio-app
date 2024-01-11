import { db } from "../../Firebase/firebaseConfig";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import React, {useState, useEffect, useCallback} from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Share } from "react-native";
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import NoFiles from "../../components/NoFiles";


/***
 * 
 * @description The audio component.
 * @function useState - The function that declares a state variable.
 * @function useEffect - The function that performs side effects.
 * @function useCallback - The function that memoizes the function.
 * @function ScrollView - The function that creates a scroll view.
 * @function RefreshControl - The function that creates a refresh control.
 * @function View - The function that creates a view.
 * @function Text - The function that creates a text.
 * @function StyleSheet - The function that creates a stylesheet.
 * @function TouchableOpacity - The function that creates a touchable opacity.
 * @function Share - The function that creates a share.
 * @function collection - The function that creates a collection.
 * @function getDocs - The function that gets the documents from the collection.
 * @function deleteDoc - The function that deletes the document from the collection.
 * @function db - The function that creates a database.
 * @function FileSystem - The function that creates a file system.
 * @function Audio - The function that creates an audio.  
 * 
 * @returns The audio component view.
 * 
 * 
 */
const AudioComponent = () => {

  const audio_files = collection(db, "audio_files");
  const [files, setFiles] = useState([]);
  const [sound, setSound] = useState();
  const [refresh, setRefresh] = useState(false);  
  /**
   * 
   * @description Gets the audio files from Firebase.
   * @var querySnapshot - The query snapshot.
   * @var data - The data from the query snapshot.
   * @var newData - The new data from the query snapshot.
   * @function getDocs - The function that gets the documents from the collection.
   * @function setFiles - The function that sets the files state.
   * 
   * 
   */
  const getFiles = async () => {
    try {
      const querySnapshot = await getDocs(audio_files);
      const data = querySnapshot.docs.map(doc => doc.data());
      const newData = data.length > 0 ? data : [];

      setFiles(newData);
    } catch (error) {
      console.error("Error getting documents:", error);
      setFiles("Error fetching data");
    }
  };
  /**
   * 
   * @param {*} audioUri 
   * @description Plays the audio file.
   * @var fileInfo - The file information.
   * @var sound - The sound state.
   * @function createAsync - The function that creates the audio file.
   * @function setSound - The function that sets the sound state.
   * 
   * 
   */
  const playAudio = async (audioUri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(audioUri);
      
      if (fileInfo.exists) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: fileInfo.uri },
          { shouldPlay: true }
        );
        console.log("Playing audio");
        setSound(sound);
      } else {
        console.log("File does not exist");
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };
  /**
   * 
   * @description Stops the audio file.
   * @var sound - The sound state.
   * @function unloadAsync - The function that unloads the audio file.
   * 
   * 
   */
  const stopAudio = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
  };

  /**
   * 
   * @param {*} audioUri 
   * @description Shares the audio file.
   * @var audioUri - The audio file uri.
   * @function Share - The function that shares the audio file.
   * @function handleShare - The function that handles the share.
   *
   */
  const handleShare = async (audioUri) => {
    try {
      await Share.share({
        title: 'Audio Recorder',
        message: 'This audio has been shared with you, from the app "Audio Recorder".',
        url: audioUri,
        type: 'audio/caf'
      });
    } catch (error) {
      console.error("Error sharing file:", error.message);
    }
  }
  /**
   * 
   * @description Refreshes the screen.
   * @var refresh - The refresh state.
   * @var onRefresh - The function that refreshes the screen.
   * @function getFiles - The function that gets the files from Firebase.
   * @function setRefresh - The function that sets the refresh state.
   * @func setTimeout - Sets the refresh state to false after 1 second.
   * @func setRefresh - Sets the refresh state to false.
   * 
   */
  const onRefresh = useCallback(() => {
    setRefresh(true);
    getFiles();
    setRefresh(false);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  });


  useEffect(() => {
    getFiles();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container} refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
      {Array.isArray(files) ? (
        files.map((doc, index) => (
          <View key={index} style={styles.audioView}>
            <Text style={styles.infoText}>Recording name: {doc.name}</Text>
            <Text style={styles.infoText}>Created: {doc.date_time.toDate().toLocaleString()}</Text>

            <View style={styles.buttonView}>  
            
              <TouchableOpacity onPress={() => playAudio(doc.recordings)} >
                <Entypo name="controller-play" size={25} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleShare(doc.recordings)}>
                  <AntDesign name="sharealt" size={25} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={stopAudio}>
                <Entypo name="controller-stop" size={25} color="black" />
              </TouchableOpacity>

            </View>
          </View>
        ))
      ) : (
        <NoFiles />
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  audioView: {
    flexDirection: 'column',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonView:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 5,
  },

});


export default AudioComponent;