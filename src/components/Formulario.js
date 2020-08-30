import React, { useState } from 'react';
import {
    Alert, StyleSheet, View, Text,
    TextInput, Button, TouchableHighlight, ScrollView, Platform
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid'

const Formulario = ({ citas, setCitas, guardarMostrarForm }) => {

    //placeholder
    const [txtHacer, onChangeTextHacer] = useState('Por ej.: Ir al gimnasio');
    const [txtPhone, onChangeTextPhone] = useState('Escribe el teléfono');
    const [txtDescription, onChangeTextDescription] = useState('Añade una descripción');
    const [txtUbicacion, onChangeTextUbicacion] = useState('Escribe la ubicación');
    //state form
    const [hacer, guardarHacer] = useState('')
    const [phone, guardarPhone] = useState('')
    const [description, guardarDescription] = useState('')
    const [ubicacion, guardarUbicacion] = useState('')
    //state fecha
    const [fecha, guardarFecha] = useState('')
    //state dia
    const [hora, guardarHora] = useState('')
    //Date Picker externo
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirmDate = (date) => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit' }
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

    //Time Picker externo
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    const handleConfirmTime = (time) => {
        const opciones = { hour: 'numeric', minute: '2-digit', hour12: false }
        guardarHora(time.toLocaleString('es-ES', opciones));
        hideTimePicker();
    };

    // Crear nueva cita
    const enviarDatosForm = () => {
        
        if (hacer.trim() === '' ||
            phone.trim() === '' ||
            description.trim() === '' ||
            ubicacion.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '') {
            //Falla la validación
            mostrarAlertaNativa();
            return;
        }
        const cita = {
            hacer,
            phone,
            description,
            ubicacion,
            fecha,
            hora
        };
        cita.id = shortid.generate();
        //Agregar al state
        const citasNuevas = [...citas, cita];
        setCitas(citasNuevas);

        //Ocultar form
        guardarMostrarForm(false)
        //Reset form

    }

    //Mostrar Alert
    const mostrarAlertaNativa = () => {
        Alert.alert(
            'Error', //Titulo
            'Todos los campos son obligatorios', //mensaje
            [{
                text: 'OK' //arreglo de botones
            }]
        )
    }

    return (
        <>
            <ScrollView style={styles.formulario}>
                {/* Que tienes que hacer */}
                <View>
                    <Text style={styles.label}>Que tienes que hacer:</Text>
                    <TextInput style={styles.input}
                        placeholder={txtHacer}
                        onChangeText={texto => guardarHacer(texto)}
                    />
                </View>
                {/* Día cita */}
                <View>
                    <Text style={styles.label}>Día</Text>
                    <Button title="Seleccionar día" onPress={showDatePicker} />
                    <DateTimePickerModal style={{ color: '#2BBBAD' }}
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                        locale='es_es'
                        headerTextIOS="Elige la fecha"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text style={styles.label}>{fecha}</Text>
                </View>
                {/* Hora cita */}
                <View>
                    <Text style={styles.label}>Hora:</Text>
                    <Button title="Seleccionar hora" onPress={showTimePicker} />
                    <DateTimePickerModal style={{ color: '#2BBBAD' }}
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmTime}
                        onCancel={hideTimePicker}
                        locale='es_es'
                        headerTextIOS="Elige una hora"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text style={styles.label}>{hora}</Text>
                </View>
                {/* Teléfono Contacto */}
                <View>
                    <Text style={styles.label}>Teléfono:</Text>
                    <TextInput style={styles.input} maxLength={9}
                        onChangeText={texto => guardarPhone(texto)}
                        keyboardType='phone-pad'
                        placeholder={txtPhone}
                    />
                </View>
                {/* Descripción */}
                <View>
                    <Text style={styles.label}>Descripción:</Text>
                    <TextInput style={styles.input} multiline placeholder={txtDescription}
                        onChangeText={texto => guardarDescription(texto)}
                    />
                </View>
                {/* Ubicación de la cita */}
                <View>
                    <Text style={styles.label}>Ubicación:</Text>
                    <TextInput style={styles.input} placeholder={txtUbicacion}
                        onChangeText={texto => guardarUbicacion(texto)}
                    />
                </View>
                <View>
                    <TouchableHighlight
                        onPress={() => enviarDatosForm()}
                        style={styles.btnGuardar}>
                        <Text style={styles.txtGuardar}>Guardar</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#fff',
        paddingHorizontal: Platform.OS === 'ios' ? 10 : 10,
        paddingVertical: Platform.OS === 'ios' ? 10 : 10,
        marginHorizontal: '2.5%',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        paddingBottom: Platform.OS === 'ios' ? 5 : 5,
    },
    label: {
        fontWeight: 'bold',
        fontSize: Platform.OS === 'ios' ? 16 : 16,
        marginTop: Platform.OS === 'ios' ? 10 : 10,
    },
    input: {
        marginTop: Platform.OS === 'ios' ? 10 : 10,
        fontSize: Platform.OS === 'ios' ? 16 : 16,
        height: Platform.OS === 'ios' ? 50 : 50,
        borderColor: '#1e1e1e',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid'
    },
    btnGuardar: {
        padding: Platform.OS === 'ios' ? 10 : 10,
        backgroundColor: '#2196f3',
        marginTop: Platform.OS === 'ios' ? 10 : 10,
        paddingVertical: Platform.OS === 'ios' ? 10 : 10,
    },
    txtGuardar: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
})

export default Formulario;