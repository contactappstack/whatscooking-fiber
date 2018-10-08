// @flow
import * as React from "react";
import {StyleSheet, View,Text,Image} from "react-native";

import {AnimatedView, simpleInterpolation, directInterpolation} from "../components/Animations";
import FadeIn from 'react-native-fade-in-image';
type LogoProps = {};

// eslint-disable-next-line react/prefer-stateless-function
export default class Logo extends React.PureComponent<LogoProps> {

    render(): React.Node {
        const animations = {
            opacity: directInterpolation(),
        };
        return (
            <View style={styles.container}>
              <FadeIn>
                <Image
                  style={{width:210,height:210}}
                  source={require('../../app.png')}
                />
              </FadeIn>
            </View>
        );
    }
}

const n = 75;
const d = n * Math.sqrt(2);
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: d * 2,
        height: d * 2
    }
});

//
// <AnimatedView duration={400} style={[styles.square, styles.a]} {...{ animations }} />
// <AnimatedView delay={200} duration={500} style={[styles.square, styles.b]} {...{ animations }} />
// <AnimatedView duration={600} delay={400} style={[styles.square, styles.c]} {...{ animations }} />
