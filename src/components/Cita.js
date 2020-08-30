import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Platform } from 'react-native';

const Cita = ({ item, eliminarCitas }) => {
  const dialogoEliminar = (id) => {
    eliminarCitas(id);
  };

  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>Que tienes que hacer:</Text>
        <Text style={styles.texto}>{item.queHacer}</Text>
      </View>
      <View>
        <Text style={styles.label}>Día:</Text>
        <Text style={styles.texto}>{item.dia}</Text>
      </View>
      <View>
        <Text style={styles.label}>Hora:</Text>
        <Text style={styles.texto}>{item.hora}</Text>
      </View>
      <View>
        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.texto}>{item.phone}</Text>
      </View>
      <View>
        <Text style={styles.label}>Ubicación:</Text>
        <Text style={styles.texto}>{item.ubicacion}</Text>
      </View>
      <View>
        <Text style={styles.label}>Descripcion:</Text>
        <Text style={styles.texto}>{item.description}</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(item.id)}
          style={styles.btnEliminar}>
          <Text style={styles.txtEliminar}>Eliminar &times; </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cita: {
    backgroundColor: 'white',
    borderBottomColor: '#e1e1e1',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 4,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: Platform.OS === 'ios' ? 1 : 1,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 10,
    marginTop: Platform.OS === 'ios' ? 10 : 10,
    marginHorizontal: '2.5%',
    paddingBottom: Platform.OS === 'ios' ? 10 : 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 18 : 18,
    marginTop: Platform.OS === 'ios' ? 20 : 20,
  },
  texto: {
    fontSize: Platform.OS === 'ios' ? 18 : 18,
  },
  btnEliminar: {
    padding: Platform.OS === 'ios' ? 10 : 10,
    backgroundColor: '#2196f3',
    marginTop: Platform.OS === 'ios' ? 10 : 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 10,

  },
  txtEliminar: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Cita;
