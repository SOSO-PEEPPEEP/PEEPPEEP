import { View } from 'react-native'

interface MarginProps {
    height?: number;
    width?: number;
  }

export default (props:MarginProps) => {
    return <View style={{ height: props.height, width: props.width }} />
}