import React, { useState } from 'react';
import {
  StyleSheet, Platform,
  View, TouchableHighlight,
  Text, FlatList, TouchableWithoutFeedback, Keyboard
} from 'react-native';

import Cita from './src/components/Cita'
import Formulario from './src/components/Formulario';

const App = () => {

  //mostrar Form
  const [mostrarForm, guardarMostrarForm] = useState(false)
  //Definir el state
  const [citas, setCitas] = useState([]);

  //Funcion para eliminar citas
  const eliminarCitas = (id: any) => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id);
    })
  }

  //btn mostrar u ocultar form
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm)
  }
  //Ocultar teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>TodoList</Text>
      <View>
        <TouchableHighlight
          onPress={() => mostrarFormulario()}
          style={styles.btnMostrar}>
          <Text style={styles.txtMostrar}>{mostrarForm ? 'Cancelar nota' : 'Mostrar formulario'} </Text>
        </TouchableHighlight>
      </View>

      <View style={styles.contenido}>
        {mostrarForm ? (
          <>
            <Text style={styles.titulo}>Crear nueva nota</Text>
            <Formulario citas={citas}
            setCitas={setCitas}
            guardarMostrarForm={guardarMostrarForm} />
          </>
        ) : (
            <>
              <Text style={styles.titulo}>{citas.length > 0 ? 'Administrador de tareas' : 'No hay tareas, agrega una'}</Text>
              <FlatList style={styles.listado}
                data={citas}
                renderItem={({ item }) => <Cita item={item} eliminarCitas={eliminarCitas} />}
                keyExtractor={citas => citas.id}
              />
            </>
          )}
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#1e1e1e',
    flex: 1,
  },
  titulo: {
    color: '#CC0000',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: Platform.OS === 'ios' ? 20 : 10,
    fontSize: Platform.OS === 'ios' ? 20 : 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido: {
    flex: 1,
  },
  listado: {
    flex: 1,
  },
  btnMostrar: {
    padding: Platform.OS === 'ios' ? 10 : 10,
    backgroundColor: '#2196f3',
    paddingVertical: Platform.OS === 'ios' ? 10 : 10,
    marginHorizontal: '2.5%',
  },
  txtMostrar: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  }

})

export default App;