import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/theme";

export default function Modal({ reset, isHide }: {reset: ()=> void, isHide: boolean}){

    const displayNone: { display: 'none' } = {
        display: 'none'
    }

    return(
        <View style={[isHide && displayNone,styles.container]}>
            <TouchableOpacity onPress={reset} style={styles.btn}>
                <Text style={styles.text}>Novo Jogo</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    btn: {
        backgroundColor: colors.p4,
        width: '90%',
        padding: 10,
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontWeight: 'bold', 
        fontSize: 32
    }
})