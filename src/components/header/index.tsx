// components/header/index.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './style';
import Octicons from '@expo/vector-icons/Octicons';
import { Link } from 'expo-router';


export function Header() {

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Pressable><Link href={"/"}><Octicons name="home" size={24} color="white" /></Link></Pressable>
        <Text style={styles.title}>Controle de Estoque</Text>
      </View>
      
    </View>
  );
};
