// components/header/index.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './style';
import Octicons from '@expo/vector-icons/Octicons';
import { Link } from 'expo-router';

interface HeaderProps {
  texto?: string;  // Texto do título
  local?: string;  // Rota para onde o botão vai
  icon?: React.ReactElement; // Cor opcional do ícone
}
export function Header({texto, local = "/", icon}: HeaderProps) {

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Pressable>
            <Link href={local}>
              {icon || null}
            </Link>
          </Pressable>
        <Text style={styles.title}>{texto}</Text>
      </View>
      
    </View>
  );
};
