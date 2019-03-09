// @flow
import * as React from "react";
import {
  View, StyleSheet, ScrollView, SafeAreaView,
} from "react-native";

import StoryThumbnail from "./StoryThumbnail";
import type { Story } from "./StoryModel";

type DiscoveryProps = {
  stories: Story[];
};

export default class Discovery extends React.PureComponent<DiscoveryProps> {
  render() {
    const { stories } = this.props;
    return (
      <View style={stories.container}>
        <ScrollView>
          <SafeAreaView
            style={styles.content}
            contentInsetAdjustmentBehavior="automatic"
          >
            {stories.map(story => <StoryThumbnail key={story.id} {...{ story }} />)}
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
