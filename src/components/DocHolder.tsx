import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../../assets/Colors';
import { TextRegular } from '../../assets/fonts/Fonts';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';



interface DocProps {
    title: string;
    submitted: boolean;
    onClick?: () => void;
    
}


const Upload = <Feather name='upload' />

const Trash = <FontAwesome name='trash-o' style = {{ color: Colors.brandGray }}/>

export const Missing = <AntDesign name='exclamationcircle' style={{ color: Colors.brandRed}} />

export const Submitted = <AntDesign name='checkcircle' style={{ color: Colors.brandBlue }} />


const DocSelect = styled.TouchableOpacity`
    border: none;
    color: ${Colors.textBlack};
    flex-direction: row;
    width: 300px;
    height: 27px;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
`

const ActionButton = styled.TouchableOpacity`
    width: 17px;
    height: 17px;
`


const DocHolder = (props: DocProps) => { 
    return (
        <DocSelect onPress={props.onClick}>
            {props.submitted  ? Submitted : Missing}
            <TextRegular>{props.title}</TextRegular>
            <ActionButton>
                {props.submitted ? Trash : Upload}
            </ActionButton>
        </DocSelect>
        

    );
}

export default DocHolder;











