import React, { useState, useEffect } from 'react';
import DocHolder, {
  Missing,
  Submitted,
} from 'components/DocContainer/DocHolder';
import { TextBold } from 'assets/fonts/Fonts';
import { Case, Document } from 'types/types';
import { convertCamelToTitleCase } from 'utils/utils';
import { getAllDocuments } from 'database/queries';
import { useIsFocused } from '@react-navigation/native';
import { Container, Header } from './styles';

interface ContainerProps {
  clientCase: Case;
  clientId: string;
  docList: string[];
  navigation: any;
}

const DocContainer = ({
  clientCase,
  clientId,
  docList,
  navigation,
}: ContainerProps) => {
  const [documents, setDocuments] = useState([] as Document[]);

  const populateDocuments = async () => {
    const currDocuments = await getAllDocuments(clientId, clientCase.id);
    setDocuments(currDocuments);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    populateDocuments();
  }, [isFocused]);

  return (
    <Container>
      <Header>
        {new Set(documents.map(doc => doc.type)).size === docList.length
          ? Submitted
          : Missing}
        <TextBold> {convertCamelToTitleCase(clientCase.type)}</TextBold>
      </Header>
      {docList.map(name => (
        <DocHolder
          onClick={() =>
            // TODO change onClick based on submit type (i.e trash/reupload if already submitted)
            navigation.navigate('UploadStack', {
              name: 'Camera',
              params: { clientCase, clientId, name },
            })
          }
          key={name}
          title={name}
          submitted={documents.map(doc => doc.type).includes(name)}
        />
      ))}
    </Container>
  );
};

export default DocContainer;
