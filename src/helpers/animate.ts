import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const useAnimate = (data: any) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, 200);
    }, [data]);

    return { fadeAnim }
}

export default useAnimate;