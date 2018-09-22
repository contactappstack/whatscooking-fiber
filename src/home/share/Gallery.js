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
              selectSingleItem={true}
              maximum={1}
              />
          </View>
        )
      }
}
