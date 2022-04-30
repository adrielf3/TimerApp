import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ImageBackground, FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

    const [horas, setHoras] = useState(0)
    const [minutos, setMinutos] = useState(0)
    const [segundos, setSegundos] = useState(0)
    const [dias, setDias] = useState(0)
    const [interva, setInterva] = useState()
    const [interva2, setInterva2] = useState()
    const [voltas, setVoltas] = useState([])
    const [btnName, setBtnName] = useState('Iniciar')
    const [btnIcon, setBtnIcon] = useState('play')

    const modalizeRef = useRef(null)
    const inputRef = useRef()
    const inputRef2 = useRef()
    const inputRef3 = useRef()

    function modalOpen() {
        modalizeRef.current?.open()
    }

    const image = require('./src/img/timer.png')

    function iniciar(hr, min, sec, day) {

        hr = horas
        min = minutos
        sec = segundos
        day = dias


        let timer = setInterval(function () {

            if (sec > 0) {
                setSegundos(sec -= 1)
            } else if (min > 0) {
                setSegundos(sec = + 60)
                setMinutos(min -= 1)
            } else if (hr > 0) {
                setMinutos(min += 60)
                setHoras(hr -= 1)
            } else if (day > 0) {
                setHoras(hr += 24)
                setDias(day -= 1)
            }

        }, 1000)

        setInterva(timer)
    }



    function iniciar2x(hr, min, sec, day) {

        hr = horas
        min = minutos
        sec = segundos
        day = dias


        let timer2x = setInterval(function () {

            if (sec > 0) {
                setSegundos(sec -= 1)
            } else if (min > 0) {
                setSegundos(sec = + 60)
                setMinutos(min -= 1)
            } else if (hr > 0) {
                setMinutos(min += 60)
                setHoras(hr -= 1)
            } else if (day > 0) {
                setHoras(hr += 24)
                setDias(day -= 1)
            }

        }, 100)

        setInterva2(timer2x)
        clearInterval(interva)

    }


    function upHoras(hr, day) {
        hr = horas
        day = dias

        if (hr == 24) {
            setDias(day += 1)
            hr = 0
        }
        setHoras((parseInt(hr)) + 1)
    }


    function upMinutos(min, hr, day) {
        min = minutos
        hr = horas
        day = dias

        if (min == 60) {
            setHoras(hr += 1)
            min = 0
        } else if (hr == 24) {
            setDias(day += 1)
            setHoras(hr = 0)
        }
        setMinutos((parseInt(min)) + 1)

    }

    function upSegundos(hr, min, sec, day) {

        day = dias
        hr = horas
        min = minutos
        sec = segundos

        if (sec == 60) {
            setMinutos(min += 1)
            setSegundos(sec = 0)
        } else if (min == 60) {
            setHoras(hr += 1)
            setMinutos(min = 0)
        } else if (hr == 24) {
            setDias(day += 1)
            setHoras(hr = 0)
            setMinutos(min = 0)
            setSegundos(sec = 0)
        } else if (segundos > 60) {
            alert('Verifique os valores digitados, e digite novamente:: Max Horas: 24, Max Minutos: 60, Max Segundos: 60')
            clearInterval(interva2)
            setDias(0)
            setHoras(0)
            setMinutos(0)
            setSegundos(sec = 0)
        }

        setSegundos((parseInt(sec)) + 1)
    }

    function upDias(day) {
        day = dias
        setDias((parseInt(day)) + 1)
    }


    //Reduzir horarios

    function downHoras(hr, day) {
        hr = horas
        day = dias

        if (hr > 0) {
            setHoras(hr -= 1)
        } else if (day > 0) {
            setDias(day -= 1)
            setHoras(hr += 24)
        } else if (day == 0) {
            setDias(0)
            setHoras(0)
        }

    }


    function downMinutos(min, hr) {
        min = minutos
        hr = horas

        if (min > 0) {
            setMinutos(min -= 1)
        } else if (hr > 0) {
            setHoras(hr -= 1)
            setMinutos(60)
        } else if (hr == 0) {
            setHoras(0)
            setMinutos(0)
        }
    }

    function downSegundos(min, sec) {

        min = minutos
        sec = segundos

        if (sec > 0) {
            setSegundos(sec -= 1)
        } else if (min > 0) {
            setMinutos(min -= 1)
        }
    }

    function downDias(day) {
        day = dias
        if (day > 0) {
            setDias(day -= 1)
        } else {
            setDias(0)
        }

    }

    const limpar = () => {
        clearInterval(interva)
        clearInterval(interva2)
        setSegundos(0)
        setMinutos(0)
        setHoras(0)
        setDias(0)
    }

    const stop = () => {
        setBtnIcon('play')
        setBtnName('Iniciar')
        clearInterval(interva)
        clearInterval(interva2)
    }

    function init() {
        if (segundos > 60) {
            alert('Verifique os valores digitados, e digite novamente:: Max Horas: 24, Max Minutos: 60, Max Segundos: 60')
            clearInterval(interva)
            setDias(0)
            setHoras(0)
            setMinutos(0)
            setSegundos(0)
        } else if (minutos > 60) {
            alert('Verifique os valores digitados, e digite novamente:: Max Horas: 24, Max Minutos: 60, Max Segundos: 60')
            clearInterval(interva)
            setDias(0)
            setHoras(0)
            setMinutos(0)
            setSegundos(0)
        } else if (horas > 24) {
            alert('Verifique os valores digitados, e digite novamente: Max Horas: 24, Max Minutos: 60, Max Segundos: 60')
            clearInterval(interva)
            setDias(0)
            setHoras(0)
            setMinutos(0)
            setSegundos(0)
        } else {
            iniciar()
            clearInterval(interva2)
        }

    }

    function acelerar() {
        if (segundos > 60) {
            alert('Verifique os valores digitados, e digite novamente:: Max Horas: 24, Max Minutos: 60, Max Segundos: 60')
            clearInterval(interva2)
            setDias(0)
            setHoras(0)
            setMinutos(0)
            setSegundos(0)
        } if (minutos > 60) {
            alert('Verifique os valores digitados, e digite novamente:: Max Horas: 24, Max Minutos: 60, Max Segundos: 60')
            clearInterval(interva2)
            setDias(0)
            setHoras(0)
            setMinutos(0)
            setSegundos(0)
        } else if (horas > 24) {
            alert('Verifique os valores digitados, e digite novamente:: Max Horas: 24, Max Minutos: 60, Max Segundos: 60')
            clearInterval(interva2)
            setDias(0)
            setHoras(0)
            setMinutos(0)
            setSegundos(0)
        } else {
            iniciar2x()
            clearInterval(interva)
            setBtnName('Vel. Normal')
            setBtnIcon('backward')
        }
    }

    function marcarVolta() {
        let itens = {
            d: dias,
            h: horas,
            m: minutos,
            s: segundos
        }
        let arr = voltas

        arr.push(itens)
    }

    function clenVoltas() {
        setVoltas([])
    }

    function Volts({di, hr, min, sec}){
        return(
            <View style={styles.voltasListView}>
                <Text style={styles.voltasListInfo}>{di} : {hr} : {min} : {sec}</Text>
            </View>
        )
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.timerContainer}>
                <ImageBackground style={styles.viewIMG}
                    source={image}
                    resizeMode='stretch'
                >
                    <View style={styles.viewTimer}>

                        <View style={styles.btnContainer}>

                            <TouchableOpacity onPress={upDias}>
                                <FontAwesome name='angle-up' size={25} color='black' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={upHoras}>
                                <FontAwesome name='angle-up' size={25} color='black' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={upMinutos}>
                                <FontAwesome name='angle-up' size={25} color='black' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={upSegundos}>
                                <FontAwesome name='angle-up' size={25} color='black' />
                            </TouchableOpacity>

                        </View>

                        <View>
                            <TouchableOpacity onPress={modalOpen}>
                                <Text style={styles.timerText}> {dias < 10 ? '0' + dias : dias} : {horas < 10 ? '0' + horas : horas} : {minutos < 10 ? '0' + minutos : minutos} : {segundos < 10 ? '0' + segundos : segundos} </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>
                                D
                            </Text>

                            <Text style={styles.infoText}>
                                H
                            </Text>

                            <Text style={styles.infoText}>
                                M
                            </Text>

                            <Text style={styles.infoText}>
                                S
                            </Text>

                        </View>
                        <View style={styles.btnDownContainer}>

                            <TouchableOpacity onPress={downDias} style={styles.downConfig}>
                                <FontAwesome name='angle-down' size={25} color='black' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={downHoras} style={styles.downConfig}>
                                <FontAwesome name='angle-down' size={25} color='black' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={downMinutos} style={styles.downConfig}>
                                <FontAwesome name='angle-down' size={25} color='black' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={downSegundos} style={styles.downConfig}>
                                <FontAwesome name='angle-down' size={25} color='black' />
                            </TouchableOpacity>

                        </View>
                    </View>
                </ImageBackground>
            </View>
            <Modalize
                ref={modalizeRef}
                keyboardAvoidingBehavior={'height'}
                snapPoint={150}
            >
                <View style={styles.timerTime}>

                    <TextInput style={styles.tempConfig}
                        onChangeText={setDias}
                        keyboardType={'numeric'}
                        maxLength={2}
                        onSubmitEditing={() => inputRef.current.focus()}
                        returnKeyType='next'
                        autoFocus={true}
                        placeholder={'DIA'}
                    />
                    <Text style={{ paddingTop: 19 }}>:</Text>

                    <TextInput style={styles.tempConfig}
                        onChangeText={setHoras}
                        keyboardType={'numeric'}
                        maxLength={2}
                        onSubmitEditing={() => inputRef2.current.focus()}
                        returnKeyType='next'
                        ref={inputRef}
                        placeholder={'HR'}
                    />

                    <Text style={{ paddingTop: 19 }}>:</Text>

                    <TextInput style={styles.tempConfig}
                        onChangeText={setMinutos}
                        keyboardType={'decimal-pad'}
                        maxLength={2}
                        onSubmitEditing={() => inputRef3.current.focus()}
                        returnKeyType='next'
                        ref={inputRef2}
                        placeholder={'MIN'}
                    />

                    <Text style={{ paddingTop: 19 }}>:</Text>

                    <TextInput style={styles.tempConfig}
                        onChangeText={setSegundos}
                        keyboardType={'numeric'}
                        maxLength={2}
                        ref={inputRef3}
                        placeholder={'SEC'}
                    />

                </View>
            </Modalize>

            <View style={styles.btnControlContente}>
                <TouchableOpacity style={styles.btnStart} onPress={init}>
                    <FontAwesome name={btnIcon} size={15} color='black' />
                    <Text style={styles.btnText}>{btnName}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnStop} onPress={stop}>
                    <FontAwesome name='pause' size={15} color='black' />
                    <Text style={styles.btnText}>Parar</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.btnControlContent}>
                <TouchableOpacity style={styles.btnAcellerate} onPress={acelerar}>
                    <FontAwesome name='forward' size={15} color='black' />
                    <Text style={styles.btnText}>Acelerar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnClear} onPress={limpar}>
                    <FontAwesome name='shower' size={15} color='black' />
                    <Text style={styles.btnText}>Limpar</Text>
                </TouchableOpacity>
            </View>
            {/* Fim View Controle do timer */}

        <View style={styles.voltasControl}>
        <TouchableOpacity onPress={() => marcarVolta()} style={styles.btnVoltas}>
            <Text style={styles.voltaText}>Marcar Tempo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={clenVoltas} style={styles.btnCleanVoltas}>
            <Text style={styles.voltaText}>Limpar Tempo</Text>
          </TouchableOpacity>
        </View>



          <FlatList 
          data={voltas}
          renderItem={({ item }) => <Volts di={item.d} hr={item.h} min={item.m} sec={item.s} />}
          />


        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewIMG: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 350,
        width: 300
    },
    viewTimer: {
        justifyContent: 'space-around'
    },
    btnDownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    timerTime: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 25
    },
    timerContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnControlContente: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 5
    },
    btnControlContent: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 10
    },
    btnStart: {
        width: 70,
        height: 50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,

    },
    btnStop: {
        width: 70,
        height: 50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,

    },
    btnAcellerate: {
        width: 70,
        height: 50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    btnClear: {
        width: 70,
        height: 50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    tempConfig: {
        borderRadius: 10,
        borderWidth: 1,
        width: 60,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    timerText:{
        fontSize:25,
        fontWeight:'bold',
        color:'black'
    }
})