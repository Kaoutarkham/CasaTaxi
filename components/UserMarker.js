import React from "react";
import { Marker } from "react-native-maps";
import { View } from "react-native";


export default function UserMarker({ coordinate }) {
  return (
    <Marker coordinate={coordinate} title="Vous êtes ici">
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: "grey",
          borderWidth: 2,
          borderColor: "white",
          
        }}
      />
    </Marker>
  );
}
