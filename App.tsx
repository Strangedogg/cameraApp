import { useEffect, useRef, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission} from 'react-native-vision-camera'
import { Link } from 'expo-router' //no use now, will have after I put the other screens

export default function App() {
  const device = useCameraDevice("back"); //determines which camera will be used
  const {hasPermission, requestPermission} = useCameraPermission();
  const [permission, setPermission] = useState<null | boolean>(null); //both constants can only be null or boolean

  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const status = await requestPermission(); //waits for user to give camera permission

      if (status) {
        setPermission(true);
      }

    })()
  }, [])

  if(!permission) return <View></View> //return empty view when camera is not given permission
  if(!device || device === null) return <View></View> //return empty view if camera not detected
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Camera
      style = {StyleSheet.absoluteFill}
      ref = {cameraRef}
      device = {device}
      isActive = {true}
      resizeMode = "cover"
      />

      <TouchableOpacity
      style = {{
        width: 280,
        height: 70,
        backgroundColor: '#147EFB',
        position: 'absolute', 
        bottom: 80,
        alignItems: 'center', 
        borderRadius: 20,
        paddingHorizontal: 10, 

      }}>
        {/*Link href = "/algo" as Child */}
        <Text>
          Verificar Manualmente
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
