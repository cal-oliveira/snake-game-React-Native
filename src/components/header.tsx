import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HEADER_HEIGHT } from "../constants";
import { colors } from "../styles/theme";
import Ionicons from "@expo/vector-icons/Ionicons"


type HeaderProps = {
    top: number,
    reload: () => void,
    pause: () => void,
    paused: boolean,
    score: number
}

export default function Header({ top, reload, pause, paused, score }: HeaderProps){

    const styleHeader = {
        height: HEADER_HEIGHT + top,
        marginTop: -top,
        backgroundColor: colors.p4,
        paddingTop: top,
        paddingHorizontal: 20
    }

    return(
        <View style={[styleHeader,styles.header]}>
            <TouchableOpacity onPress={reload}>
                <Ionicons name="reload" size={26} color={colors.p6}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={pause}>
                <Ionicons 
                    name={paused ? "play" : "pause"}
                    size={26}
                    color={colors.p6}
                />
            </TouchableOpacity>
            
            <Text style={styles.score}>{score}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    score: {
        color: colors.p6,
        fontSize: 20,
        fontWeight: "bold"
    }
})