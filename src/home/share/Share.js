// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Modal} from "react-native";
import { Camera } from "expo-camera";
import { Feather as Icon } from "@expo/vector-icons";

import EnableCameraPermission from "./EnableCameraPermission";
import FlashIcon from "./FlashIcon";

import {RefreshIndicator, Theme, NavHeader, SpinningIndicator, serializeException} from "../../components";
import type {ScreenProps} from "../../components/Types";

type ShareState = {
    hasCameraPermission: boolean | null,
    type: number,
    flashMode: number,
    loading: boolean
};

export default class Share extends React.Component<ScreenProps<>, ShareState> {

    camera: Camera;

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
        loading: false
    };

    async componentDidMount(): Promise<void> {
        const {status} = await Camera.requestPermissionsAsync();
        this.setState({
            hasCameraPermission: status === "granted"
        });
    }

    @autobind
    toggle() {
        this.setState({ loading: false });
    }

    @autobind
    toggleFlash() {
        const {flashMode} = this.state;
        const {on, off} = Camera.Constants.FlashMode;
        this.setState({ flashMode: flashMode === on ? off : on });
    }

    @autobind
    toggleCamera() {
        const {type} = this.state;
        const {front, back} = Camera.Constants.Type;
        this.setState({ type: type === back ? front : back });
    }

    @autobind
    async snap(): Promise<void> {
        const {navigation} = this.props;
        try {
            this.setState({ loading: true });
            const picture = await this.camera.takePictureAsync({ base64: false });
            console.log(picture)
            this.setState({ loading: false });
            navigation.navigate("SharePicture", picture);
        } catch (e) {
            this.setState({ loading: false });
            // eslint-disable-next-line no-alert
            alert(serializeException(e));
        }
    }

    @autobind
    setCamera(camera?: Camera | null) {
        if (camera) {
            this.camera = camera;
        }
    }

    @autobind
    gallery(){
      const {navigation} = this.props;
      console.log("hello")
      navigation.navigate("Gallery");
    }

    render(): React.Node {
        const {navigation} = this.props;
        const {hasCameraPermission, type, flashMode, loading} = this.state;
        if (hasCameraPermission === null) {
            return (
                <View style={styles.refreshContainer}>
                    <RefreshIndicator refreshing />
                </View>
            );
        } else if (hasCameraPermission === false) {
            return <EnableCameraPermission />;
        }
        return (
            <View style={styles.container}>
                <NavHeader title="Camera" {...{navigation}} />
                <Camera ref={this.setCamera} style={styles.camera} {...{type, flashMode}}>
                    <View style={styles.cameraBtns}>


                        <TouchableWithoutFeedback onPress={this.toggleFlash}>
                            <View>
                                <FlashIcon on={flashMode === Camera.Constants.FlashMode.on} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.footer}>
                      <TouchableWithoutFeedback onPress={this.toggleCamera}>
                          <View>
                              <Icon name="rotate-ccw" style={styles.rotate} size={25} />
                          </View>
                      </TouchableWithoutFeedback>
                        <TouchableOpacity onPress={this.snap}>
                            <View style={styles.btn} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.gallery}>
                            <View >
                              <Icon name="image" style= {styles.gallery}size={30} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Camera>
                <Modal transparent visible={loading} onRequestClose={this.toggle}>
                    <View style={styles.modal}>
                        <SpinningIndicator />
                    </View>
                </Modal>
            </View>
        );
    }
}

const {width, height} = Dimensions.get("window");
const ratio = 0.9*height;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    refreshContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    camera: {
        width,
        height: ratio
    },
    cameraBtns: {
        position: "absolute",
        top: 0,
        width,
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: Theme.spacing.base
    },
    rotate: {
        backgroundColor: "transparent",
        color: "white",
        paddingTop:10
    },
    footer: {
      position: "absolute",
      bottom: 80,
      width,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: Theme.spacing.base
    },
    btn: {
        height: ratio < 0.75 ? 120 : 60,
        width: ratio < 0.75 ? 120 : 60,
        borderRadius: ratio < 0.75 ? 60 : 30,
        borderWidth: ratio < 0.75 ? 20 : 10,
        borderColor: Theme.palette.lightGray
    },
    modal: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    gallery:{
      backgroundColor: "transparent",
      color: "white",
      paddingTop:10
    }
});



// <View style={styles.container}>
//     <NavHeader title="Share" {...{navigation}} />
//     <Camera ref={this.setCamera} style={styles.camera} {...{type, flashMode}}>
//         <View style={styles.cameraBtns}>
//             <TouchableWithoutFeedback onPress={this.toggleCamera}>
//                 <View>
//                     <Icon name="rotate-ccw" style={styles.rotate} size={25} />
//                 </View>
//             </TouchableWithoutFeedback>
//             <TouchableWithoutFeedback onPress={this.toggleFlash}>
//                 <View>
//                     <FlashIcon on={flashMode === Camera.Constants.FlashMode.on} />
//                 </View>
//             </TouchableWithoutFeedback>
//         </View>
//     </Camera>
//     <View style={styles.footer}>
//         <TouchableOpacity onPress={this.snap}>
//             <View style={styles.btn} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={this.gallery}>
//             <View style={styles.btn} />
//         </TouchableOpacity>
//     </View>
//     <Modal transparent visible={loading} onRequestClose={this.toggle}>
//         <View style={styles.modal}>
//             <SpinningIndicator />
//         </View>
//     </Modal>
// </View>
