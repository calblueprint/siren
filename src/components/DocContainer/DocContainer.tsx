import React, { useState, useEffect } from 'react';
import DocHolder, {
  Missing,
  Submitted,
} from 'components/DocContainer/DocHolder';
import { TextBold } from 'assets/fonts/Fonts';
import { Case, CaseStatus, Document } from 'types/types';
import { convertCamelToTitleCase } from 'utils/utils';
import { getAllDocuments, getStatus, setStatus } from 'database/queries';
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
  const [status, setStat] = useState('');
  const [submitted, setSubmit] = useState(false);

  const populateDocuments = async () => {
    const currDocuments = await getAllDocuments(clientId, clientCase.id);
    setDocuments(currDocuments);
  };
  const getClientStatus = async () => {
    const currStat = await getStatus(clientId, clientCase.id);
    setStat(currStat);
  };
  const handleDocsUploaded = () => {
    let foundDocs = true;
    const docTypes = documents.map(doc => {
      return doc.type;
    });
    // eslint-disable-next-line array-callback-return
    docList.map(doc => {
      // eslint-disable-next-line no-unused-expressions
      docTypes.includes(doc) ? null : (foundDocs = false);
    });
    setSubmit(foundDocs);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    populateDocuments();
    getClientStatus();
  }, [isFocused]);

  useEffect(() => {
    const submitDocs = () => {
      // Question: if already approved for appointment, should clients be reapproved if they delete a document?
      if (status !== '' && documents.length !== 0) {
        handleDocsUploaded();
        if (!submitted) {
          setStatus(clientId, clientCase.id, CaseStatus.SubmitDoc);
        } else if (status === CaseStatus.SubmitDoc) {
          setStatus(clientId, clientCase.id, CaseStatus.InReview);
        }
      }
      return null;
    };
    submitDocs();
  }, [status, documents]);

  return (
    <Container>
      <Header>
        {submitted ? Submitted : Missing}
        <TextBold> {convertCamelToTitleCase(clientCase.type)}</TextBold>
      </Header>
      {docList.map(name => (
        <DocHolder
          onClick={() =>
            // TODO change onClick based on submit type (i.e trash/reupload if already submitted)
            navigation.navigate('UploadStack', {
              screen: 'Camera',
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
