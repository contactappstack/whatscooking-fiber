// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, FlatList, SafeAreaView , RefreshControl} from "react-native";
import {inject,observer} from "mobx-react";
import {type AnimatedEvent} from "react-native/Libraries/Animated/src/AnimatedEvent";

import FeedStore from "./FeedStore";

import {RefreshIndicator, Post, Theme, FirstPost} from "../components";

import type {FeedEntry} from "../components/Model";
import type {NavigationProps} from "../components/Types";

type FlatListItem<T> = {
    item: T
};
// type InjectedProps = {
//     feedStore: FeedStore,
// };
type FeedProps = NavigationProps<> & {
    store: FeedStore,
    onScroll?: AnimatedEvent | () => void,
    bounce?: boolean,
    ListHeaderComponent?: React.Node
};

@observer
export default class Feed extends React.Component<FeedProps> {

    state= {
        refreshing: false
    }
    @autobind
    // eslint-disable-next-line class-methods-use-this
    keyExtractor(item: FeedEntry): string {
        return item.post.id;
    }

    @autobind
    loadMore() {
        this.props.store.loadFeed();
    }

    _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.store.checkForNewEntriesInFeed().then(() => {
      this.setState({refreshing: false});
      console.log("Hello")
    });
  }

    @autobind
    renderItem({ item }: FlatListItem<FeedEntry>): React.Node {
        const {navigation, store} = this.props;
        const {post, profile} = item;
        return (
            <View style={styles.post}>
                <Post {...{navigation, post, store, profile}} />
            </View>
        );
    }

    render(): React.Node {
        const {onScroll, store, navigation, bounce, ListHeaderComponent} = this.props;
        const {feed} = store;
        const loading = feed === undefined;
        return (
            <SafeAreaView style={styles.list}>
                <FlatList
                    showsVerticalScrollIndicator
                    data={feed}
                    refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                      color={'#f27842'}
                    />}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    onEndReachedThreshold={0.5}
                    onEndReached={this.loadMore}
                    ListEmptyComponent={(
                        <View style={styles.post}>
                            {loading ? <RefreshIndicator /> : <FirstPost {...{navigation}} />}
                        </View>
                    )}
                    {...{ onScroll, bounce, ListHeaderComponent }}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    },
    post: {
        paddingHorizontal: Theme.spacing.small
    }
});
