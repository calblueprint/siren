import React from 'react';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { TextRegular } from 'assets/fonts/Fonts';
import { Colors } from 'assets/Colors';
import { DocSelect, ActionButton } from './styles';

interface DocProps {
  title: string;
  submitted: boolean;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
}

const Upload = <Feather name="upload" />;

const Trash = (
  <FontAwesome name="trash-o" style={{ color: Colors.brandGray }} />
);

export const Missing = (
  <AntDesign name="exclamationcircle" style={{ color: Colors.brandRed }} />
);

export const Submitted = (
  <AntDesign name="checkcircle" style={{ color: Colors.brandBlue }} />
);

const DocHolder = ({ onClick, title, submitted }: DocProps) => {
  return (
    <DocSelect onPress={onClick}>
      {submitted ? Submitted : Missing}
      <TextRegular>{title}</TextRegular>
      <ActionButton>{submitted ? Trash : Upload}</ActionButton>
    </DocSelect>
  );
};

export default DocHolder;
