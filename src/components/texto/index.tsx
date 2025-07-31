import { Text, View } from "react-native";
import React from "react";
import { styles } from "./style";

export default function Texto (props: {conteudo?: string}) {
  return (
    <View>
      <Text style={styles.title}>{props.conteudo}</Text>
    </View>
  );
}
