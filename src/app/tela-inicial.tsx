import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import { Header } from '../components/header'
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Octicons } from '@expo/vector-icons';


export default function TelaInicial() {
  const localizar = () => {
      router.navigate("/gerenciador");
    };
  // const manutencao = () => {
  //     router.navigate("/manutencao");
  //   };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Header texto='Gerenciador de Estoque' local='/'
        icon={<Octicons name="home" size={24} color="white" />}/>
        <Text style={styles.texto}>
          <AntDesign name="linechart" size={24} color="black" /> Página Inicial
        </Text>
        <Text style={styles.texto2}>Visão Geral Do Gerenciador De Estoque</Text>
        
        {/* Container dos cards */}
        <View style={styles.cardsContainer}>
          {/* Card 1 - Localizar Componentes */}
          <TouchableOpacity style={[styles.card, styles.card1]} activeOpacity={0.8} onPress={localizar}>
            <View style={styles.cardContent}>
              <MaterialIcons name="inventory" size={28} color="#64ca11" />
              <View style={styles.cardTextContainer}>
                <Text style={[styles.cardTitle, {color: '#fff'}]}>Localizar Equipamentos</Text>
                <Text style={[styles.cardSubtitle, {color: '#c9e0f5'}]}>Consulte os Equipamentos</Text>
              </View>
            </View>
            <AntDesign 
              name="arrowright" 
              size={24}  
              color="#fff"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>

          {/* Card 2 - Em Manutenção */}
          <TouchableOpacity  style={[styles.card, styles.card2]} activeOpacity={0.8} //onPress={manutencao}
          >
            <View style={styles.cardContent}>
              <Feather name="alert-triangle" size={28} color="#d85c13" />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Equipamentos Em Manutenção</Text>
                <Text style={styles.cardSubtitle}>Ver equipamentos em manutenção</Text>
              </View>
            </View>
            <AntDesign 
              name="arrowright" 
              size={24} 
              color="#333"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
        backgroundColor: "#ececec",
        flex: 1
    },
    texto: {
        marginTop: 20,
        fontSize: 20,
        marginLeft: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    texto2: {
        marginTop: 10,
        marginLeft: 20,
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    cardsContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    card: {
        width: "90%",
        borderRadius: 20,
        padding: 30,
        elevation: 5,
        marginTop: 15,
        marginBottom: 10,
        minHeight: 120, // Altura fixa para ambos os cards
    },
    card1: {
        backgroundColor: "#04437e",
    },
    card2: {
        backgroundColor: "#eedb2e",
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    cardTextContainer: {
        marginLeft: 15,
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    arrowIcon: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});