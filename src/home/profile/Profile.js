// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, StyleSheet, Dimensions, TouchableOpacity, Image,ScrollView,RefreshControl} from "react-native";
import {Feather as Icon} from "@expo/vector-icons";
import {inject, observer} from "mobx-react/native";
import {Constants, LinearGradient} from "expo";
import { NetInfo } from 'react-native';
import ProfileStore from "../ProfileStore";

import {Text, Avatar, Theme, Images, Feed, FeedStore} from "../../components";
import type {FeedEntry} from "../../components/Model";
import type {ScreenProps} from "../../components/Types";


type InjectedState ={
  refreshing : boolean
}
type InjectedProps = {
    profileStore: ProfileStore,
    userFeedStore: FeedStore
};

@inject("profileStore", "userFeedStore") @observer
export default class ProfileComp extends React.Component<ScreenProps<> & InjectedProps & InjectedState> {

    state={
      refreshing : false,
      net:false
    };
    componentDidMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
           if(isConnected)
           {
                this.setState({net:false})
                this.props.userFeedStore.checkForNewEntriesInFeed();
           }else{
                this.setState({net:false})
           }
        })

    }

    @autobind
    settings() {
        const {profile} = this.props.profileStore;
        this.props.navigation.navigate("Settings", { profile });
    }

    @autobind
    loadMore() {
        this.props.userFeedStore.loadFeed();
    }

    _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.userFeedStore.checkForNewEntriesInFeed().then(() => {
      this.setState({refreshing: false});
    });
  }

    @autobind
    // eslint-disable-next-line class-methods-use-this
    keyExtractor(item: FeedEntry): string {
        return item.post.id;
    }

    render(): React.Node {
        const {navigation, userFeedStore, profileStore} = this.props;
        const {profile} = profileStore;
        return (

            <View style={{flex:1}}>
               {this.state.net ?
                 (<View><Text>Check Your Net Connectivity</Text></View>)
               :
                 (<ScrollView style={styles.container}
            refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
                <LinearGradient
                    colors={["#f78859", "#FFFF66", "white"]}
                    style={styles.gradient}
                />
                <Feed
                    bounce={false}
                    ListHeaderComponent={(
                        <View style={styles.header}>
                            <Image style={styles.cover} source={Images.cover} />
                            <TouchableOpacity onPress={this.settings} style={styles.settings}>
                                <View>
                                    <Icon name="settings" size={25} color="white" />
                                </View>
                            </TouchableOpacity>
                            <View style={styles.title}>
                                <Text type="large" style={styles.outline}>AppStack</Text>
                                <Text type="header2" style={styles.name}>{profile.name}</Text>
                            </View>
                            <Avatar size={avatarSize} style={styles.avatar} {...profile.picture} />
                        </View>
                    )}
                    store={userFeedStore}
                    {...{navigation}}
                />
            </ScrollView>)
                }
              </View>


        );
    }
}

const avatarSize = 100;
const {width} = Dimensions.get("window");
const {statusBarHeight} = Constants;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: width
    },
    header: {
        marginBottom: (avatarSize * 0.5) + Theme.spacing.small
    },
    cover: {
        width,
        height: width
    },
    avatar: {
        position: "absolute",
        right: Theme.spacing.small,
        bottom: -avatarSize * 0.5
    },
    settings: {
        position: "absolute",
        top: statusBarHeight + Theme.spacing.small,
        right: Theme.spacing.base,
        backgroundColor: "transparent",
        zIndex: 10000
    },
    title: {
        position: "absolute",
        left: Theme.spacing.small,
        bottom: 50 + Theme.spacing.small
    },
    outline: {
        color: "rgba(255, 255, 255, 0.8)"
    },
    name: {
        color: "white"
    }
});
