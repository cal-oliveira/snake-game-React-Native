import { Animated, View } from "react-native";
import { Coordinate } from "../@types/types";
import { BORDER, BORDER_RADIUS, GAP, HEADER_HEIGHT, PIXEL } from "../constants";
import { colors } from "../styles/theme";

interface SnakeProps {
    snake: Coordinate[],
    top: number
}

export default function Snake({ snake, top }: SnakeProps){
    return(
        <>
            {
                snake.map((node: Coordinate, index: number) => {
                    const nodeStyle = {
                        width: PIXEL,
                        height: PIXEL,
                        borderWidth: GAP,
                        borderColor: colors.p6,
                        borderRadius: BORDER_RADIUS,
                        top: node.y * PIXEL + top + HEADER_HEIGHT,
                        left: node.x * PIXEL + BORDER,
                        backgroundColor: index === 0 ? colors.p7 : colors.p2,
                        zIndex: index === 0 ? 99 : 1
                    }
                    return (
                        <Animated.View
                            style={[{position: "absolute"}, nodeStyle]}
                            key={index}
                        />
                    )
                })
            }
        </>
    )
}