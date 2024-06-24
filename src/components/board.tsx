import { StyleSheet, View } from "react-native";
import { BORDER, BORDER_RADIUS, GAP, HEADER_HEIGHT, PIXEL } from "../constants";
import { colors } from "../styles/theme";

type BoardProps = {
    rows: number,
    cols: number,
    top: number
}

export default function Board({rows, cols, top}: BoardProps){

    const dots = Array(rows * cols).fill(0)

    return(
        <View style={[styles.board, { top: HEADER_HEIGHT + top }]}>
            {
                dots.map((_,index) => (
                    <View style={styles.pixel} key={index}></View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    board: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        position: "absolute",
        marginHorizontal: BORDER
    },
    pixel: {
        width: PIXEL,
        height: PIXEL,
        borderColor: colors.p6,
        borderWidth: GAP,
        borderRadius: BORDER_RADIUS,
        backgroundColor: colors.p5,
        justifyContent: "center",
        alignItems: "center"
    }
})