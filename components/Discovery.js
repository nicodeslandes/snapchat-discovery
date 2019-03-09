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
};

export default class Discovery extends React.PureComponent<DiscoveryProps, DiscoveryState> {
  selectStory = (selectedStory: Story | null) => {
    console.log("Selected story:", selectedStory);
    this.setState({selectedStory});
  }

  constructor(props: DiscoveryProps) {
    super(props);
    this.state = { selectedStory: null };
  }

  render() {
    const { stories } = this.props;
    const { selectedStory } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <SafeAreaView
            style={styles.content}
            contentInsetAdjustmentBehavior="automatic"
          >
            {stories.map(story =>
                <StoryThumbnail
                  key={story.id}
                  {...{ story }}
                  onPress={() => this.selectStory(story)}
                />)}
          </SafeAreaView>
        </ScrollView>

        { selectedStory && (
          <StoryModal story={selectedStory} onClose={() => this.selectStory(null)} />
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
