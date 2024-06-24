import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import Header from "./header";
import Board from "./board";
import Snake from "./snake";
import Food from "./food";
import { colors } from "../styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLS, FOOD_START, HEADER_HEIGHT, INCREMENT, PIXEL, SNAKE_START, SPEED } from "../constants";
import { useEffect, useMemo, useState } from "react";
import { Coordinate, Direction, Limits } from "../@types/types";
import { newFoodPosition, testEatsFood, testGameOver } from "../utils/function";

const { height } = Dimensions.get("window")
import * as Haptics from "expo-haptics"
import food from "./food";
import Modal from "./modal";

export default function Game(){

    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_START)
    const [ food, setFood ] = useState<Coordinate>(FOOD_START)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [isGamePaused, setIsGamePaused] = useState<boolean>(true)
    const [ score, setScore ] = useState<number>(0)
    const [ direction, setDirection ] = useState<Direction>(Direction.Right)
    const insets = useSafeAreaInsets()
    const ROWS = Math.floor(
        (height - insets?.top - insets?.bottom - HEADER_HEIGHT) / PIXEL
    )

    const limits: Limits = {
        minX: 0,
        maxX: COLS - 1,
        minY: 0,
        maxY: ROWS - 1
    }

    function resetGame(){
        setSnake(SNAKE_START)
        setFood(FOOD_START)
        setDirection(Direction.Right)
        setScore(0)
        console.log('reset')
    }

    useEffect(() => {
        if(!isGameOver) {
            const speedInterval = setInterval(()=> {
                !isGamePaused && moveSnake()
            }, SPEED)
            return () => clearInterval(speedInterval)
        } else {
            resetGame()
        }
    },[snake, isGameOver, isGamePaused])

function handleGesture(event: PanGestureHandlerGestureEvent){
    const { translationX, translationY } = event.nativeEvent

    if(Math.abs(translationX) > Math.abs(translationY)){
        //slide horizontal
        if(translationX > 0){
            setDirection(Direction.Right)
            console.log('direita')
        } else {
            setDirection(Direction.Left)
            console.log('esquerda')
        }
    } else {
        //slide vertical
        if(translationY > 0){
            setDirection(Direction.Down)
            console.log('baixo')
        } else {
            setDirection(Direction.Up)
            console.log('cima')
        }
    }
}

function moveSnake(){

    const head = { ...snake[0] }
    
    switch(direction){
        case Direction.Right:
            head.x += 1;
            break;

        case Direction.Left:
            head.x -= 1;
            break;

        case Direction.Down:
            head.y += 1;
            break;

        case Direction.Up:
            head.y -= 1;
            break;

        default:
            break;
    }
    
    if(testGameOver(head,limits)){
        setIsGameOver(true)
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        return
    }

    if (testEatsFood(head, food)) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setFood(newFoodPosition(limits));
        setSnake([head, ...snake]);
        setScore((prevScore) => prevScore + INCREMENT);
      } else {
        setSnake([head, ...snake.slice(0, -1)]);
    }
}

    const RandomFood = useMemo(()=>{
        return <Food coords={{ x: food.x, y: food.y }} top={insets.top} />
    }, [food])

    return(
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                <Header 
                    top={insets.top}
                    score={score}
                    paused={isGamePaused}
                    pause={()=> setIsGamePaused((prev) => !prev)}
                    reload={()=> setIsGameOver((prev) => !prev)}
                />
                <Board 
                    cols={COLS}
                    rows={ROWS}
                    top={insets.top}
                />
                <Snake 
                    snake={snake}
                    top={insets.top}
                />
                <Modal isHide={!isGameOver} reset={()=> setIsGameOver((prev) => !prev)}/>
                {RandomFood}
            </SafeAreaView>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.p6,
        flex: 1
    }

})

function setScore(arg0: (prevScore: any) => any) {
    throw new Error("Function not implemented.");
}
