import React, { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle, useColorScheme } from 'react-native';
import { spacing } from '../../spacing';

type Variant =
  | 'body'
  | 'heading'
  | 'button';
interface TextProps {
  variant: Variant;
  style?: TextStyle;
  children: ReactNode;
  color?: string;
  center?: boolean;
  onPress?: () => void;
}

const AppText = ({
  variant = 'body',
  style,
  children,
  color,
  center,
  onPress,
  ...props
}: TextProps) => {


  return (
    <Text
      onPress={onPress}
      style={[
        styles[variant],

        center && { textAlign: 'center' },
        color && { color: color },
        style,
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({

  body: {
    fontSize: 16,
    fontWeight: 'regular',
    lineHeight: 21,
    padding: spacing.xxs,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: spacing.xxs,
  },
});

export default AppText;
