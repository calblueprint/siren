import React from 'react';
import DocHolder, {
  Missing,
  Submitted,
} from 'components/DocContainer/DocHolder';
import { TextBold } from 'assets/fonts/Fonts';
import { CaseType } from 'types/types';
import { convertCamelToTitleCase } from 'utils/utils';
import { Container, Header } from './styles';

interface ContainerProps {
  caseType: CaseType;
  uploadStatus: boolean; // based on all submissions
  docList: string[];
}

const DocContainer = ({ caseType, uploadStatus, docList }: ContainerProps) => {
  return (
    <Container>
      <Header>
        {uploadStatus ? Submitted : Missing}
        <TextBold> {convertCamelToTitleCase(caseType)}</TextBold>
      </Header>
      {docList.map(name => (
        <DocHolder key={name} title={name} submitted={uploadStatus} />
      ))}
    </Container>
  );
};

export default DocContainer;
