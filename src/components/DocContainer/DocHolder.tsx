import React from 'react';
import { Colors } from '../../../assets/Colors';
import { TextRegular } from '../../../assets/fonts/Fonts';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { DocSelect, ActionButton } from './styles';



interface DocProps {
    title: string;
    submitted: boolean;
    onClick?: () => void;
    
}


const Upload = <Feather name='upload' />

const Trash = <FontAwesome name='trash-o' style = {{ color: Colors.brandGray }}/>

export const Missing = <AntDesign name='exclamationcircle' style={{ color: Colors.brandRed}} />

export const Submitted = <AntDesign name='checkcircle' style={{ color: Colors.brandBlue }} />



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











