import React, { Component } from 'react'
import { TouchableHighlight, Image, Text, SafeAreaView, View, StyleSheet } from 'react-native'
import type { Story } from './StoryModel';

type StoryModalProps = {
  story: Story,
  onClose: () => mixed
}

export default class StoryModal extends Component<StoryModalProps> {
  render() {
    const { story, onClose } = this.props;

    return (
      <View style={styles.container}>
        <Image source={story.source} style={styles.image} />
        <SafeAreaView>
          <TouchableHighlight style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>x</Text>
          </TouchableHighlight>
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    flex: 1
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    marginTop: 30,
    margin: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#555',
    width: 30,
    height: 30,
    borderRadius: 30,
    opacity: 0.5,
  },
  buttonText: {
    borderWidth: 0,
    borderColor: 'red',
    marginLeft: 1,
    marginTop: -2,
    fontSize: 20
  },
})