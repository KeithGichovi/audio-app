import { db } from "../../Firebase/firebaseConfig";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import React, {useState, useEffect, useCallback} from "react";
import { View, Text, Button, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Share } from "react-native";
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const AudioComponent = () => {

  const audio_files = collection(db, "audio_files");
  const [files, setFiles] = useState([]);
  const [sound, setSound] = useState();
  const [refresh, setRefresh] = useState(false);  
  const [isPlaying, setIsPlaying] = useState(false);


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
        setIsPlaying(true);
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
    setIsPlaying(false);
  };


  const handleDelete = async (audioUri) => {
    try {
      // Find the document with the matching 'recordings' field
      const querySnapshot = await getDocs(audio_files);
      const docToDelete = querySnapshot.docs.find(doc => doc.data().recordings === audioUri);
  
      if (docToDelete) {
        await deleteDoc(audio_files, docToDelete.id);
        console.log("Audio file deleted");
      } else {
        console.log("Audio file not found for deletion");
      }
    } catch (error) {
      console.error("Error deleting audio file:", error);
    }
  }


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
            
            { isPlaying ? <Text style={styles.current}> Currently Playing</Text> : null }

            <View style={styles.buttonView}>  
              <TouchableOpacity onPress={() => playAudio(doc.recordings)} >
                  <Entypo name="controller-play" size={25} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDelete}>
                  <AntDesign name="delete" size={25} color="black" />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => handleShare}>
                  <AntDesign name="sharealt" size={25} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={stopAudio}>
                <Entypo name="controller-stop" size={25} color="black" />
              </TouchableOpacity>
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
  current: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 5,
    color: '#E63946',
  }
});


export default AudioComponent;