import React from 'react';
import styled from 'styled-components/native';
import DocHolder, { Missing, Submitted } from 'components/DocHolder';
import { TextBold } from 'assets/fonts/Fonts';
import { Colors } from 'assets/Colors';


interface Props { 
    caseType: string;
    uploadStatus: boolean; //based on all submissions
}


const Container = styled.View`
    border-radius: 8px;
    width: 349px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: ${Colors.lightGray};
    padding-left: 19px;
    padding-right: 22px;
    
`

const Header = styled.View`
    height: 29px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 24px;


`

const docs = ['First DACA Application', 'Employment Authorization', '2020 Tax Return', 'Employment Document']


const DocContainer = (props: Props) => { 
    return (
        <Container>
            <Header>
            {props.uploadStatus ? Submitted : Missing}
            <TextBold>{props.caseType}</TextBold>    
            </Header>
            {docs.map(name => <DocHolder title={name} submitted={ true }/>)}
        </Container>
    );
}

export default DocContainer;





