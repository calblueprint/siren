import React from 'react';
import DocHolder, { Missing, Submitted } from 'components/Documents/DocHolder';
import { TextBold } from 'assets/fonts/Fonts';
import { Container, Header } from './styles';

interface ContainerProps {
  caseType: string;
  uploadStatus: boolean; // based on all submissions
}

const docs = [
  'First DACA Application',
  'Employment Authorization',
  '2020 Tax Return',
  'Employment Document',
];

const DocContainer = ({ uploadStatus, caseType }: ContainerProps) => {
  return (
    <Container>
      <Header>
        {uploadStatus ? Submitted : Missing}
        <TextBold>{caseType}</TextBold>
      </Header>
      {docs.map(name => (
        <DocHolder key={name} title={name} submitted />
      ))}
    </Container>
  );
};

export default DocContainer;
