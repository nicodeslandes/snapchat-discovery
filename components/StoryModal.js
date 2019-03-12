import React, { PureComponent } from 'react'
import { TouchableHighlight, Image, Text, SafeAreaView, View, StyleSheet, Dimensions } from 'react-native'
import type { Story } from './StoryModel';
import Animated from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import type { Position } from './Position';

const {Value, Clock, spring, set, add, sub, eq, neq, block, cond, debug, startClock, stopClock, clockRunning } = Animated;

type StoryModalProps = {
  story: Story,
  position: Position,
  onClose: () => mixed
}

const {width: wWidth, height: wHeight} = Dimensions.get('window');

function runSpring(clock, start, end) {  
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 18,
    mass: 1,
    stiffness: 10,
    overshootClamping: false,
    restSpeedThreshold: .01,
    restDisplacementThreshold: .01,
    toValue: new Value(0),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.position, start),
      set(state.velocity, 0),
      set(config.toValue, end),
      startClock(clock)
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
}

export default class StoryModal extends PureComponent<StoryModalProps> {
  constructor(props: StoryModalProps) {
    super(props);
    const {x: initX, y: initY, width: initWidth, height: initHeight} = props.position;

    console.log("StoryModel Position:", props.position);

    const gestureState = new Value(State.UNDETERMINED);
    const translateX = new Value(0);
    const translateY = new Value(0);

    const x = new Value(initX);
    const yStart = new Value(initY);
    const clockY = new Clock();
    const clockWidth = new Clock();
    const clockHeight = new Clock();

    function setDraggableSpring(value, dragValue, endValue) {
      const clock = new Clock();
      const prevDragValue = new Value(0);

      cond(eq(gestureState, State.ACTIVE), [
        stopClock(clock),
        set(value, add(value, sub(dragValue, prevDragValue))),
        set(prevDragValue, dragValue),
        value
      ],
      [
        debug('x value', value),
        set(prevDragValue, 0),
        set(value, runSpring(clock, value, endValue))
      ]);
    }

    //this.x = setDraggableSpring(x, translateX, 0);

    const clockX = new Clock();
    const xStart = new Value(initX);
    this.x = cond(eq(gestureState, State.ACTIVE), [
                stopClock(clockX),
                set(xStart, translateX)
              ],
              set(xStart, runSpring(clockX, xStart, 0)));
    this.y = cond(eq(gestureState, State.ACTIVE),
               set(yStart, translateY),
               runSpring(clockY, initY, 0));
            
    this.width = runSpring(clockWidth, initWidth, wWidth);
    this.height = runSpring(clockHeight, initHeight, wHeight);


    this.onGestureEvent = Animated.event([{
      nativeEvent: {
        translationX: translateX,
        translationY: translateY,
        state: gestureState
      },
    }]);
  }

  render() {
    const { story, onClose } = this.props;
    const { x, y, width, height, onGestureEvent } = this;
    const style = {
      ...StyleSheet.absoluteFillObject,
      width,
      height,
      transform: [
        {
          translateX: x,
          translateY: y,          
        }
      ]
    }

    return (
      <View style={styles.container}>
        <PanGestureHandler {...{ onGestureEvent }} onHandlerStateChange={onGestureEvent} maxPointers={1}>
          <Animated.View style={style}>
            <Image source={story.source} style={styles.image} />
            <View>
              <TouchableHighlight style={styles.closeButton} onPress={onClose}>
                <Text style={styles.buttonText}>x</Text>
              </TouchableHighlight>
            </View>
          </Animated.View>
         </PanGestureHandler>
      </View>
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