/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { PageContainer } from '../styles';
import {
  ContentContainer,
  TitleContainer,
  ButtonContainer,
  ButtonView,
} from './styles';
import {
  TextRegular,
  TextBold,
  TextRegularWhite,
} from '../../assets/fonts/Fonts';
import { ButtonDark, ButtonLight } from '../../assets/buttons/Buttons';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <PageContainer>
      <ContentContainer>
        <TitleContainer>
          <TextBold>Welcome to SIREN!</TextBold>
        </TitleContainer>
        <TextRegular>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nunc
          sed tortor mollis pellentesque. Nam nisi sapien, tristique nec erat
          sed, suscipit vehicula augue.
        </TextRegular>
      </ContentContainer>
      <ButtonContainer>
        <ButtonView>
          <ButtonLight onPress={() => navigation.navigate('Login')}>
            <TextRegular>Log in</TextRegular>
          </ButtonLight>
        </ButtonView>
        <ButtonView>
          <ButtonDark onPress={() => navigation.navigate('Register')}>
            <TextRegularWhite>Register</TextRegularWhite>
          </ButtonDark>
        </ButtonView>
      </ButtonContainer>
    </PageContainer>
  );
};

export default WelcomeScreen;
