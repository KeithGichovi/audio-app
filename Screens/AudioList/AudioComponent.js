import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
import { firestore } from '../../Firebase/firebaseConfig';

const AudioComponent = () => {

    const [audiofiles, setAudiofiles] = useState();

    useEffect(() => {
        const fetchData = async () => {
          const audioCollection = collection(firestore, 'audio_files');
          
          try {
            const querySnapshot = await getDocs(audioCollection);
            const audioData = querySnapshot.docs.map(doc => doc.data());
            setAudiofiles(audioData);
          } catch (error) {
            console.error('Error fetching audio data: ', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <View>
  <Text>AudioComponent</Text>
  {audiofiles.map((audio, index) => (
    <View key={index}>
      {audio.recordings.map((recording, recordingIndex) => (
        <Text key={recordingIndex}>{recording}</Text>
      ))}
    </View>
  ))}
</View>

    )
}

export default AudioComponent;