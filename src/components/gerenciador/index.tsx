import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";

interface Equipamentos {
  numero: string;
  local: string;
  data: Date;
}

const locaisPadrao = [
  "Sala 14",
  "Laboratório de Enfermagem 13",
  "Sala Experimental 11/12",
  "Sala 10",
  "Sala 09",
  "Lab.Infor. 08",
  "Sala 07",
  "Sala 15",
  "Sala 16",
  "Sala 17",
  "Sala Bar 18",
  "Cozinha Pedagógica 19",
  "Auditório",
  "Sala Docentes",
  "Setor Técnico",
  "Admin",
  "Lab.Infor 01",
];

export default function GerenciadorEquipamentos() {
  const [dados, setDados] = useState<Equipamentos[]>([]);
  const [numero, setNumero] = useState("");
  const [localSelecionado, setLocalSelecionado] = useState("");
  const [locais, setLocais] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [novoLocal, setNovoLocal] = useState("");

  // Carregar do AsyncStorage ao iniciar
  useEffect(() => {
    const carregarDados = async () => {
      const armazenados = await AsyncStorage.getItem("equipamentos");
      const locaisSalvos = await AsyncStorage.getItem("locais");
      if (armazenados) setDados(JSON.parse(armazenados));
      if (locaisSalvos) {
        const parsed = JSON.parse(locaisSalvos);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLocais(parsed);
        } else {
          setLocais(locaisPadrao);
        }
      } else {
        setLocais(locaisPadrao);
      }
    };
    carregarDados();
  }, []);

  // Salvar alterações no AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem("equipamentos", JSON.stringify(dados));
  }, [dados]);

  useEffect(() => {
    AsyncStorage.setItem("locais", JSON.stringify(locais));
  }, [locais]);

  const adicionarEquipamento = () => {
    if (!localSelecionado || !numero) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const novo: Equipamentos = {
      numero,
      local: localSelecionado,
      data: new Date(),
    };

    setDados((prev) => [...prev, novo]);
    setNumero("");
    setLocalSelecionado("");
  };

  const adicionarNovoLocal = () => {
    if (!novoLocal.trim()) {
      Alert.alert("Erro", "Informe um nome para o novo local");
      return;
    }

    if (locais.includes(novoLocal.trim())) {
      Alert.alert("Atenção", "Este local já existe.");
      return;
    }

    setLocais((prev) => [...prev, novoLocal.trim()]);
    setLocalSelecionado(novoLocal.trim());
    setNovoLocal("");
    setModalVisible(false);
  };

  const removerEquipamento = (numeroEquip: string) => {
    setDados((prev) => prev.filter((equip) => equip.numero !== numeroEquip));
  };

  const removerLocal = (local: string) => {
    Alert.alert(
      "Remover local?",
      `Tem certeza que deseja remover o local "${local}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            setLocais((prev) => prev.filter((l) => l !== local));
            if (localSelecionado === local) setLocalSelecionado("");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciador de Equipamentos</Text>

      <TextInput
        style={styles.input}
        placeholder="Número do equipamento"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
      />

      <Picker
        selectedValue={localSelecionado}
        onValueChange={(itemValue) => {
          if (itemValue === "adicionar") {
            setModalVisible(true);
          } else {
            setLocalSelecionado(itemValue);
          }
        }}
        style={styles.input}
      >
        <Picker.Item label="Selecione um local" value="" />
        {locais.map((local, index) => (
          <Picker.Item key={`${local}-${index}`} label={local} value={local} />
        ))}
        <Picker.Item label="+ Gerenciar Locais" value="adicionar" />
      </Picker>

      <View style={styles.button}>
        <Button title="Adicionar Equipamento" onPress={adicionarEquipamento} />
      </View>

      <FlatList
        style={styles.list}
        data={dados}
        keyExtractor={(item) => item.numero}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum equipamento cadastrado.</Text>
        }
        renderItem={({ item }) => (
          <Animatable.View
            animation="fadeInUp"
            duration={400}
            style={styles.item}
          >
            <View>
              <Text style={styles.text}>🔢 Número: {item.numero}</Text>
              <Text style={styles.text}>📍 Local: {item.local}</Text>
              <Text style={styles.text}>
                📅 Data:{" "}
                {new Date(item.data).toLocaleString("pt-BR", {
                  timeZone: "America/Sao_Paulo",
                  hour12: false,
                })}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removerEquipamento(item.numero)}>
              <Text style={styles.remove}>🗑️</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
      />

      {/* Modal para novo local */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Novo local</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o novo local"
              value={novoLocal}
              onChangeText={setNovoLocal}
            />
            <View style={[styles.button, { marginBottom: 10 }]}>
              <Button title="Adicionar" onPress={adicionarNovoLocal} />
            </View>
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            <Text style={[styles.title, { marginTop: 20 }]}>
              Remover locais
            </Text>
            <FlatList
              data={locais}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => (
                <View style={styles.localItem}>
                  <Text style={{ flex: 1 }}>{item}</Text>
                  <TouchableOpacity onPress={() => removerLocal(item)}>
                    <Text style={styles.remove}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#ffffff",
    flex: 1,
  },
  button: {
    borderRadius: 30,
    backgroundColor: "red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#003466",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#003466",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: "#f5f5f5",
  },
  list: {
    marginTop: 20,
  },
  item: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderLeftWidth: 5,
    borderLeftColor: "#f39200",
  },
  text: {
    fontSize: 16,
    color: "#003466",
  },
  remove: {
    fontSize: 22,
    color: "#f39200",
  },
  empty: {
    marginTop: 20,
    textAlign: "center",
    fontStyle: "italic",
    color: "#777",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    width: "85%",
    maxHeight: "80%",
  },
  localItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
