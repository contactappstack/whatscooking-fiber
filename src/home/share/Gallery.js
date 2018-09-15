// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import CameraRollPicker from 'react-native-camera-roll-picker';
import {StyleSheet, View,TouchableOpacity,Image} from "react-native";
import {RefreshIndicator,NavHeader} from "../../components";
import type {ScreenProps} from "../../components/Types";

export default class Gallery  extends React.Component<ScreenProps<>> {

      state = {
        check:false
      }

      @autobind
      getSelectedImages(images){
        const {navigation} = this.props;
        // if(images ===[]){
        //
        // }else{
        //   image= images[0]
        //   navigation.navigate("ImageEdit",image)
        // }
        console.log(images)
          navigation.navigate("SharePicture",images[0])
      }
      render(): React.Node {
        const {navigation} = this.props;
        return(
          <View style={{flex:1}}>
            <NavHeader back title="Gallery" {...{navigation}} />
            <CameraRollPicker
              callback={this.getSelectedImages}
              maximum={1}
              />
          </View>
        )
      }
}

//     state = {
//       choosenImage: null,
//     }
//
//     componentWillMount = async () => {
//         let { status } = await Expo.Permissions.askAsync(
//             Expo.Permissions.CAMERA_ROLL
//         );
//         if (status !== 'granted') {
//             console.error('Camera roll access denied');
//             return;
//         }
//         let img = await Expo.ImagePicker.launchImageLibraryAsync({
//             mediaTypes: Expo.ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//         });
//         this.setState({ choosenImage: img });
//         console.log(this.state.choosenImage.uri);
//         const {navigation}=this.props;
//         navigation.navigate("SharePicture",this.state.choosenImage)
//     }
//
//     // @autobind
//     // action(){
//     //   const {navigation}=this.props;
//     //   navigation.navigate("SharePicture",this.state.choosenImage)
//     // }
//     render(): React.Node {
//         const {navigation} = this.props;
//         const {choosenImage} = this.state;
//
//         return (
//
//             <View style={styles.refreshContainer}>
//                 <RefreshIndicator refreshing />
//
//             </View>
//         )
//       }
// }
// const styles = StyleSheet.create({
//     refreshContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//     }
// });
