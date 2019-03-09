// @flow
import * as React from "react";
import {
  View, StyleSheet, Image, Dimensions,
} from "react-native";

import type Story from "./StoryModel";

const width = Dimensions.get("window").width / 2 - 16 * 2;
const height = width * 1.77;

type StoryThumbnailProps = {
  story: Story,
};

export default class StoryThumbnail extends React.PureComponent<StoryThumbnailProps> {
  render() {
    const { story } = this.props;
    return (
      <View style={styles.container}>
        <Image source={story.source} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    marginTop: 16,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
});
