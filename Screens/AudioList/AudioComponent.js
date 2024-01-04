import { db } from "../../Firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import React, {useState, useEffect} from "react";
import { View, Text } from "react-native";

const AudioComponent = () => {
  const audio_files = collection(db, "audio_files");

  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    try {
      const querySnapshot = await getDocs(audio_files);
      const data = querySnapshot.docs.map(doc => doc.data());
      const newData = data.length > 0 ? data : [];

      console.log(newData);
      setFiles(newData);
    } catch (error) {
      console.error("Error getting documents:", error);
      setFiles("Error fetching data");
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <View>
      {Array.isArray(files) ? (
        // Render 'recordings' array for each document
        files.map((doc, index) => (
          <View key={index}>
            <Text>Date Time: {doc.date_time.toDate().toLocaleString()}</Text>
            <Text>Recordings:{doc.recordings}</Text>
          </View>
        ))
      ) : (
        <Text>{files}</Text>
      )}
    </View>
  );
};

export default AudioComponent;