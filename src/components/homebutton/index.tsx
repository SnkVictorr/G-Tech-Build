import { TouchableOpacity, Text} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {styles} from "./style"
import { router } from "expo-router";

export default function HomeButton() {
  const handleNext = () => {
    router.navigate("/tela-inicial");
  };
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={handleNext} activeOpacity={0.8}>
      <LinearGradient
        colors={["#004A8D", "#F7941D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text style={styles.text}>Acessar Página Inicial</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}