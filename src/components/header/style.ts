// components/header/style.tsx
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#242425c0',
    height: 60,
    marginTop: 50
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  rightContainer: {
    width: 50, // Ajuste conforme necessário
},
  dropdown: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: 50, // Largura suficiente apenas para a seta
  },
  dropdownText:{

  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#2E8B57',
    marginTop: 5,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: 'white', // Cor da seta
  },
});