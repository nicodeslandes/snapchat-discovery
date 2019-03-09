// @flow
import * as React from "react";
import {
  View, StyleSheet, Image, Dimensions, Text, TouchableWithoutFeedback, measureInWindow
} from "react-native";

import type { Story } from "./StoryModel";

const width = Dimensions.get("window").width / 2 - 16 * 2;
const height = width * 1.77;

type StoryThumbnailProps = {
  story: Story,
  onPress: () => mixed;
};

export default class StoryThumbnail extends React.PureComponent<StoryThumbnailProps> {
  imageRef = React.createRef<Image>();

  render() {
    const { story, onPress } = this.props;
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback {...{ onPress }}>
          <Image ref={this.imageRef} source={story.source} style={styles.image} />
        </TouchableWithoutFeedback>
      </View>
    );
  }

  measure(): Promise<{x: number, y: number, width: number, height: number}> {
    console.log('Calling measure');
    return new Promise((res, err) => {
      if (this.imageRef.current) {
        this.imageRef.current.measureInWindow((x, y, width, height) => {
          res({x,y,width,height})
        });
      }
      else {
        err("Image ref is null!");
      }
    });
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
    borderRadius: 10,    
  },
});
