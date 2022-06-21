import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ImageBackground, FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MSSQL from 'react-native-mssql';

export default function App() {


    const config = {
        server: 'RGSV1001.regra.local.br',
        username: 'oliveira',
        password: '#ED4rf%TG',
        database: 'BANCO_PAINEL',

    }
    async function connected (){
       const cone = await MSSQL.connect(config);
       const query = 'SELECT* FROM tbl_usuarios'
       const result = await MSSQL.executeQuery(query);
        console.log(cone, result)
    } 


    const [horas, setHoras] = useState(0)
    const [minutos, setMinutos] = useState(0)
    const [segundos, setSegundos] = useState(0)
    const [dias, setDias] = useState(0)
    const [interva, setInterva] = useState()
    const [interva2, setInterva2] = useState()
    const [voltas, setVoltas] = useState([])
    const [btnName, setBtnName] = useState('Iniciar')
    const [btnIcon, setBtnIcon] = useState('play')
    const [pos, setPos] = useState(1)
    const [btnControlOff, setBtnControlOff] = useState(false)
    const [btnStart, setBtnStart] = useState(false)
    const [btnStart2x, setBtnStart2x] = useState(false)

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
            }else if (min > 0) {
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
            } else if (day == 0){
                setBtnControlOff(false)
                setBtnIcon('play')
                setBtnName('Iniciar')
            }
        }, 300)
        setInterva2(timer2x)
        clearInterval(interva)

    }

    function corrigeValores(sec, min, hr, day){
        sec = segundos
        min = minutos
        day = dias
        hr = horas

        if(sec > 60){
            setSegundos((parseInt(sec)) - 60)
            setMinutos((parseInt(min)) + 1)
        }
        if (min > 60){
            setMinutos((parseInt(min)) - 60)
            setHoras(hr += 1)
        }
        if(hr > 24){
            setHoras(hr - 24)
            setDias((parseInt(day)) + 1)
        }else if(hr > 48){
            setHoras(hr - 48)
            setDias((parseInt(day)) + 2)
        }else if(hr > 72){
            setHoras(hr - 72)
            setDias((parseInt(day)) + 3)
        }else if(hr > 96){
            setHoras(hr - 96)
            setDias((parseInt(day)) + 4)
        }
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
        }
    
        setSegundos(sec += 1)

        
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
        setBtnIcon('play')
        setBtnName('Iniciar')
        clearInterval(interva)
        clearInterval(interva2)
        setBtnControlOff(false)
        setBtnStart2x(false)
        setBtnStart(false)
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
        setBtnControlOff(false)
        setBtnStart2x(false)
        setBtnStart(false)
    }

    function init() {
            iniciar()
            clearInterval(interva2)
            setBtnControlOff(true)
            setBtnStart(true)
            setBtnStart2x(false)
    }

    function acelerar() {
            iniciar2x()
            clearInterval(interva)
            setBtnName('Vel. Normal')
            setBtnIcon('backward')
            setBtnControlOff(true)
            setBtnStart2x(true)
            setBtnStart(false)
        }

    function marcarVolta() {
        
        var more = pos
        setPos(more +=1)
        
        let itens = {
            p: pos,
            d: dias,
            h: horas,
            m: minutos,
            s: segundos
        }
        let arr = voltas

        arr.push(itens)


    }

    function clenVoltas() {
        setPos(1)
        setVoltas([])
    }

    function Volts({ di, hr, min, sec, po }) {
        return (
            <View style={styles.voltasListView}>
                <Text style={styles.voltasListInfo}>{po + 'º'} - {di < 10 ? '0' + di : di} : {hr < 10 ? '0' + hr : hr} : {min < 10 ? '0' + min : min} : {sec < 10 ? '0' + sec : sec}</Text>
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

                            <TouchableOpacity onPress={upDias} disabled={btnControlOff} >
                                <FontAwesome name='angle-up' size={35} color='white' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={upHoras} disabled={btnControlOff}>
                                <FontAwesome name='angle-up' size={35} color='white' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={upMinutos} disabled={btnControlOff}>
                                <FontAwesome name='angle-up' size={35} color='white' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={upSegundos} disabled={btnControlOff}>
                                <FontAwesome name='angle-up' size={35} color='white' />
                            </TouchableOpacity>

                        </View>

                        <View>
                            <TouchableOpacity onPress={modalOpen} disabled={btnControlOff}>
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

                            <TouchableOpacity onPress={downDias} style={styles.downConfig} disabled={btnControlOff}>
                                <FontAwesome name='angle-down' size={35} color='white' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={downHoras} style={styles.downConfig} disabled={btnControlOff}>
                                <FontAwesome name='angle-down' size={35} color='white' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={downMinutos} style={styles.downConfig} disabled={btnControlOff}>
                                <FontAwesome name='angle-down' size={35} color='white' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={downSegundos} style={styles.downConfig}disabled={btnControlOff}>
                                <FontAwesome name='angle-down' size={35} color='white' />
                            </TouchableOpacity>

                        </View>
                    </View>
                </ImageBackground>
            </View>
            <Modalize
                ref={modalizeRef}
                keyboardAvoidingBehavior={'height'}
                snapPoint={100}
                onClosed={corrigeValores}
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
                        placeholderTextColor={'#424242'}
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
                        placeholderTextColor={'#424242'}
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
                        placeholderTextColor={'#424242'}
                    />

                    <Text style={{ paddingTop: 19 }}>:</Text>

                    <TextInput style={styles.tempConfig}
                        onChangeText={setSegundos}
                        keyboardType={'numeric'}
                        maxLength={2}
                        ref={inputRef3}
                        placeholder={'SEC'}
                        placeholderTextColor={'#424242'}
                    />

                </View>
            </Modalize>

            <View style={styles.btnControlContente}>
                <TouchableOpacity style={styles.btnStart} onPress={connected} disabled={btnStart}>
                    <FontAwesome name={btnIcon} size={15} color='black' />
                    <Text style={styles.btnText}>{btnName}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnStop} onPress={stop}>
                    <FontAwesome name='pause' size={15} color='black' />
                    <Text style={styles.btnText}>Parar</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.btnControlContent}>
                <TouchableOpacity style={styles.btnAcellerate} onPress={acelerar}  disabled={btnStart2x}>
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
                    <Text style={styles.voltaText}>Limpar Voltas</Text>
                </TouchableOpacity>


            </View>


            <FlatList
                data={voltas}
                renderItem={({ item }) => <Volts di={item.d} hr={item.h} min={item.m} sec={item.s} po={item.p} />}
            />




        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#424242'
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
        paddingTop: 25,
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
        paddingTop: 10,
        paddingBottom:15
    },
    btnStart: {
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        backgroundColor: '#72ed93'

    },
    btnStop: {
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        backgroundColor: '#ff4747'

    },
    btnAcellerate: {
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        backgroundColor: '#7dff8e'
    },
    btnClear: {
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        backgroundColor: '#757575'
    },
    btnText: {
        color: 'black'
    },
    tempConfig: {
        borderRadius: 10,
        borderWidth: 1,
        width: 60,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black'
    },
    timerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    voltasControl: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 30,
        borderTopWidth:1,
        height:100,
        margin:10,
        borderRadius:10
    },
    btnVoltas: {
        backgroundColor: 'black',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        borderRadius:10
    },
    btnCleanVoltas: {
        backgroundColor: 'black',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        borderRadius:10
    },
    voltaText:{
        color:'white'
    },
    voltasListView:{
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        marginLeft:50,
        marginRight:50,
        marginBottom:15
    },
    voltasListInfo:{
        fontSize:30,
        color:'white',
        paddingTop:10
    },
})