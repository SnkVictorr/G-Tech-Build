// import React, { useState, useEffect } from "react";
// import { Text, View, StyleSheet, Button, Alert } from "react-native";
// import { CameraView, Camera } from "expo-camera";

// export default function LeitorCodigoBarras() {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [scanned, setScanned] = useState(false);
//   const [codigo, setCodigo] = useState("");

//   // Solicita permissão ao abrir a tela
//   useEffect(() => {
//     const solicitarPermissao = async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     };
//     solicitarPermissao();
//   }, []);

//   // Função chamada ao escanear
//   const aoEscanear = ({ type, data }) => {
//     setScanned(true);
//     setCodigo(data);
//     Alert.alert("Código escaneado", `Tipo: ${type}\nValor: ${data}`);
//     // Aqui você pode: buscar produto na API, salvar no banco, etc.
//   };

//   // Caso ainda esteja pedindo permissão
//   if (hasPermission === null)
//     return <Text>Solicitando permissão da câmera...</Text>;
//   if (hasPermission === false)
//     return <Text>Permissão negada para usar a câmera</Text>;

//   return (
//     <View style={styles.container}>
//       <CameraView
//         onBarcodeScanned={scanned ? undefined : aoEscanear}
//         barcodeScannerSettings={{
//           barcodeTypes: ["qr", "ean13", "code128"], // personalize os formatos
//         }}
//         style={StyleSheet.absoluteFillObject}
//       />

//       {scanned && (
//         <View style={styles.overlay}>
//           <Text style={styles.resultado}>Código lido: {codigo}</Text>
//           <Button
//             title="Escanear novamente"
//             onPress={() => {
//               setScanned(false);
//               setCodigo("");
//             }}
//           />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   overlay: {
//     position: "absolute",
//     bottom: 60,
//     alignSelf: "center",
//     backgroundColor: "white",
//     padding: 16,
//     borderRadius: 8,
//     elevation: 5,
//   },
//   resultado: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
// });
