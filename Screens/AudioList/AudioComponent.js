import { db } from "../../Firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import React, {useState, useEffect, useCallback} from "react";
import { View, Text, Button, StyleSheet, ScrollView, RefreshControl,  } from "react-native";
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';



const AudioComponent = () => {

  const audio_files = collection(db, "audio_files");

  const [files, setFiles] = useState([]);

  const [sound, setSound] = useState();

  const [refresh, setRefresh] = useState(false);  

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


  const stopAudio = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
  };


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
              <Button
                title="Play Audio"
                onPress={() => playAudio(doc.recordings)}
              />
              <Button 
                title="Stop Audio" 
                onPress={stopAudio} 
              />
            </View>
            
          </View>
        ))
      ) : (
        <Text>{files}</Text>
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