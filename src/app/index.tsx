import { Image, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import Texto from '../components/texto'
import HomeButton from '../components/homebutton'


export default function Home() {
    return (
        <View>
          <ImageBackground style={styles.fundoimage} source={require("../../assets/images/fundoSenac.png")}
        resizeMode='cover' blurRadius={3}>
            <View style={styles.card}>
        <Image source={require("../../assets/images/logo.png")} style={styles.imagem}/>
        <Texto conteudo='G-Tech'/>
        <Text style={styles.title2}>Bem vindo!!</Text>
        <HomeButton />
        </View>
        </ImageBackground>
      </View>
    )
}

const styles = StyleSheet.create({
    imagem:{
        alignSelf: "center",
        height: 85,
        width: 140,
        marginTop: 30
    },
    title2:{
    fontSize: 30,
    marginTop: 40,
    color: "#004A8D",
    marginVertical: 8,
    textAlign: "center",
    marginLeft: 10,
    fontWeight: "semibold"
  },
   fundoimage: {
    flex: -1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    
  },
  card:{
    alignItems: "center",
    width: "80%",
    backgroundColor: "#fffffff8",
    borderRadius: 20,
    padding: 20,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 100,
    shadowRadius: 4,
  },
})