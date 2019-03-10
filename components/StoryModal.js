import React, { PureComponent } from 'react'
import { TouchableHighlight, Image, Text, SafeAreaView, View, StyleSheet } from 'react-native'
import type { Story } from './StoryModel';
import Animated from 'react-native-reanimated';
import type { Position } from './Position';

const {Value} = Animated;

type StoryModalProps = {
  story: Story,
  position: Position,
  onClose: () => mixed
}

export default class StoryModal extends PureComponent<StoryModalProps> {
  constructor(props: StoryModalProps) {
    super(props);
    const {x,y,width,height} = props.position;
    this.translateX = new Value(x);
    this.translateY = new Value(y);
    this.width = new Value(width);
    this.height = new Value(height);
  }

  render() {
    const { story, onClose } = this.props;
    const { translateX, translateY, width, height } = this;
    const style = {
      ...StyleSheet.absoluteFillObject,
      width,
      height,
      transform: [
        {
          translateX,
          translateY
        }
      ]
    }

    return (
      <SafeAreaView style={styles.container}>
        <Animated.View style={style}>
          <Image source={story.source} style={styles.image} />
          <View>
            <TouchableHighlight style={styles.closeButton} onPress={onClose}>
              <Text style={styles.buttonText}>x</Text>
            </TouchableHighlight>
          </View>
        </Animated.View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
  closeButton: {
    // marginTop: 10,
    margin: 10,
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
    marginTop: 0,
    fontSize: 18
  },
})