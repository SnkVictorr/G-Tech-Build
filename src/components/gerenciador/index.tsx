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
  "Sala 21",
  "Sala 22",
  "Sala 20",
  "Sala 23",
  "Sala Bar 18",
  "Cozinha Pedagógica 19",
  "Auditório",
  "Sala Docentes",
  "Setor Técnico",
  "Admin",
  "Lab. Informática 01",
  "Recepção",
  "Secretaria",
  "Lab. Informática 02",
  "Lab. Hardware e Cisco 03",
  "Lab. Informática 04",
  "Lab. Informática 05",
  "Lab. Informática 06",
  "Dep. Equip.",
  "Biblioteca ",
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
          setLocais(parsed.sort((a, b) => a.localeCompare(b)));
        } else {
          setLocais([...locaisPadrao].sort((a, b) => a.localeCompare(b)));
        }
      } else {
        setLocais([...locaisPadrao].sort((a, b) => a.localeCompare(b)));
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

    setLocais((prev) =>
      [...prev, novoLocal.trim()].sort((a, b) => a.localeCompare(b))
    );

    setLocalSelecionado(novoLocal.trim());
    setNovoLocal("");
    setModalVisible(false);
  };

  const removerEquipamento = (numeroEquip: string) => {
    setDados((prev) => prev.filter((equip) => equip.numero !== numeroEquip));
  };

  useEffect(() => {
    const carregarLocais = async () => {
      try {
        const locaisSalvos = await AsyncStorage.getItem("locais");
        if (locaisSalvos !== null) {
          setLocais(JSON.parse(locaisSalvos));
        } else {
          // Primeira vez: salvar locais padrão
          await AsyncStorage.setItem("locais", JSON.stringify(locaisPadrao));
          setLocais(locaisPadrao);
        }
      } catch (error) {
        console.log("Erro ao carregar locais:", error);
      }
    };

    carregarLocais();
  }, []);

  const salvarLocais = async (novosLocais) => {
    try {
      await AsyncStorage.setItem("locaisSalvos", JSON.stringify(novosLocais));
    } catch (error) {
      console.error("Erro ao salvar locais:", error);
    }
  };

  const removerLocal = (localParaRemover) => {
    Alert.alert(
      "Confirmar remoção",
      `Tem certeza que deseja remover o local "${localParaRemover}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            const atualizados = locais.filter(
              (local) => local !== localParaRemover
            );
            setLocais(atualizados);
            salvarLocais(atualizados);
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
        style={styles.picker}
      >
        <Picker.Item label="Selecione um local" value="" />
        {locais.map((local, index) => (
          <Picker.Item key={`${local}-${index}`} label={local} value={local} />
        ))}
        <Picker.Item label="+ Gerenciar Locais" value="adicionar" />
      </Picker>

      <View style={styles.button}>
        <TouchableOpacity onPress={adicionarEquipamento}>
          <Text style={styles.buttonText}>Adicionar Equipamento</Text>
        </TouchableOpacity>
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
      <View>
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
                <TouchableOpacity onPress={adicionarNovoLocal}>
                  <Text style={{ color: "white" }}>Adicionar</Text>
                </TouchableOpacity>
              </View>
              <Button title="Voltar" onPress={() => setModalVisible(false)} />
              <Text style={[styles.title, { marginTop: 20 }]}>
                Remover locais
              </Text>
              <FlatList
                data={locais}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                  <View style={styles.localItem}>
                    <Text>{item}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#ececec",
    flex: 1,
  },
  button: {
    backgroundColor: "#003466",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#003466",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#003466",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  picker: {
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  list: {
    marginTop: 20,
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#f39200",
  },
  text: {
    fontSize: 16,
    color: "#003466",
    marginBottom: 4,
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
    height: "auto",
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
