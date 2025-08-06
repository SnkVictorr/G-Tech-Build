import { View } from "react-native";
import React from "react";
import GerenciadorEquipamentos from "../components/gerenciador";
import { Header } from "../components/header";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Gerenciamento() {
  return (
    <View style={styles.container}>
      <Header
        texto="Localizar Equipamentos"
        local="/tela-inicial"
        icon={<AntDesign name="back" size={24} color="white" />}
      />
      <GerenciadorEquipamentos />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: "#ececec",
    flex: 1,
  },
});
