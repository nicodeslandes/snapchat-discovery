// @flow
import * as React from "react";
import {
  View, StyleSheet, ScrollView, SafeAreaView,
} from "react-native";

import StoryThumbnail from "./StoryThumbnail";
import type { Story } from "./StoryModel";
import StoryModal from "./StoryModal";

type DiscoveryProps = {
  stories: Story[];
};

type DiscoveryState = {
  selectedStory: Story | null;
  position: Position | null
};

type RefObject<T> = {
  current: T | null
};

export default class Discovery extends React.PureComponent<DiscoveryProps, DiscoveryState> {
  selectStory = async (selectedStory: Story | null, index?: number) => {
    console.log("Selected story:", selectedStory, "index:", index);
    if (selectedStory === null) {
      this.setState({selectedStory});
      return;
    }

    if (index !== undefined) {
      const thumbnail = this.thumbnails[index].current;
      if (thumbnail !== null) {
        const position = await thumbnail.measure();
        console.log("Position:", position);
        this.setState({selectedStory, position});
      }
    }
  }

  thumbnails: RefObject<StoryThumbnail>[]

  constructor(props: DiscoveryProps) {
    super(props);
    this.state = { selectedStory: null, position: null };
    this.thumbnails = props.stories.map(() => React.createRef());
  }

  render() {
    const { stories } = this.props;
    const { selectedStory, position } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={styles.content}
            contentInsetAdjustmentBehavior="automatic"
          >
            {stories.map((story, index) =>
                <StoryThumbnail
                  key={story.id}
                  {...{ story }}
                  ref={this.thumbnails[index]}
                  onPress={() => this.selectStory(story, index)}
                />)}
          </View>
        </ScrollView>

        { selectedStory && (
          <StoryModal story={selectedStory} position={position} onClose={() => this.selectStory(null)} />
        )}
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
