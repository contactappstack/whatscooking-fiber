import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, Dimensions, Linking, TouchableOpacity} from "react-native";

import {Text, Button, Container, Logo, Theme, AnimatedView, Firebase, serializeException} from "../components";
import type {ScreenProps} from "../components/Types";

export default class Welcome extends React.Component<ScreenProps<>> {

    @autobind
    login() {
        this.props.navigation.navigate("Login");
    }

    render(): React.Node {
        return (
            <Container gutter={2} style={styles.root}>
                <Logo />
                <AnimatedView style={styles.container}>
                    <Text type="header1" style={styles.header}>Fiber</Text>
                </AnimatedView>
                <AnimatedView style={styles.container} delay={600} duration={300}>
                    <Button label="Get Started" onPress={this.login} full primary />
                </AnimatedView>

            </Container>
        );
    }
}


const {width} = Dimensions.get("window");
const styles = StyleSheet.create({
    root: {
        justifyContent: "flex-end",
        alignItems: "center"
    },
    container: {
        alignSelf: "stretch"
    },
    header: {
        textAlign: "center",
        marginTop: Theme.spacing.base * 2,
        marginBottom: Theme.spacing.base * 2
    }
});
