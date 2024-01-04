import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTabs from "./navigation/NavigationTabs";

const App = () => {

  return (
    <NavigationContainer>
      <NavigationTabs />
    </NavigationContainer>
  );
}

export default App;