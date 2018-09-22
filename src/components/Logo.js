// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {AnimatedView, simpleInterpolation, directInterpolation} from "../components/Animations";

type LogoProps = {};

// eslint-disable-next-line react/prefer-stateless-function
export default class Logo extends React.PureComponent<LogoProps> {

    render(): React.Node {
        const animations = {
            opacity: directInterpolation(),
            transform: [{ translateY: simpleInterpolation(-200, 0) }]
        };
        return (
            <View style={styles.container}>
                <AnimatedView duration={400} style={[styles.square, styles.a]} {...{ animations }} />
                <AnimatedView delay={200} duration={500} style={[styles.square, styles.b]} {...{ animations }} />
                <AnimatedView duration={600} delay={400} style={[styles.square, styles.c]} {...{ animations }} />
            </View>
        );
    }
}

const n = 75;
const d = n * Math.sqrt(2);
const translation = ((d - n) * 0.5) + (n * 0.5);
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: d * 2,
        height: d * 2
    },
    square: {
        borderColor: "white",
        borderWidth: 5,
        position: "absolute",
        width: n,
        height: n
    },
    a: {
        backgroundColor: "#ff4d4d",
        transform: [{ translateY: translation }, { rotate: "45deg" }]
    },
    b: {
        backgroundColor: "#f27842",
        transform: [{ translateX: translation }, { rotate: "45deg" }]
    },
    c: {
        backgroundColor: "#FFFFB3",
        transform: [{ translateY: -translation }, { rotate: "45deg" }]
    }
});
