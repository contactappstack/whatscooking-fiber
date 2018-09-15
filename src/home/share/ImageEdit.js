// import React from 'react';
// import { Button, TouchableOpacity, Text, View, Image } from 'react-native';
// import {ImageCrop} from 'react-native-image-cropper';
//
// export default class ImageEdit extends React.Component {
//
//     state = {
//       image:"",
//       cropHeight:0,
//       cropWidth:0,
//     }
//     componentWillMount(){
//           const {navigation} = this.props;
//           const picture = navigation.state.params;
//           this.setState({image:picture.uri,cropHeight:picture.height,cropWidth:picture.width});
//     }
//     capture(){
//         this.refs.cropper.crop().then(base64 => console.log(base64))
// }
//       render() {
//         const {navigation} = this.props;
//         return (
//             <View>
//                 <ImageCrop
//                   ref={'cropper'}
//                   image={this.state.image}
//                   cropHeight={this.state.height}
//                   cropWidth={this.state.width}
//                   zoom={this.state.zoom}
//                   maxZoom={80}
//                   minZoom={20}
//                   panToMove={true}
//                   pinchToZoom={true}
//                 />
//               <Text onPress={this.capture()}>Capture()</Text>
//             </View>
//           )
//     }
// }



import React from 'react';
import { Button, TouchableOpacity, Text, View, Image } from 'react-native';

export default class ImageEdit extends React.Component {
  render(){
    <View></View>
  }
}
