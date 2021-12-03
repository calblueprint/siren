import React, { useEffect, useState } from 'react';
import { TextRegular } from 'assets/fonts/Fonts';
import { PageContainer } from 'screens/styles';
import DocContainer from 'components/DocContainer/DocContainer';
import { getDocList, getAllCases } from 'database/queries';
import { getCurrentClient } from 'database/auth';
import { CaseType } from 'types/types';

const UploadScreen = () => {
  const [caseTypes, setCaseTypes] = useState<CaseType[]>(); // container headers
  const [reqDocs, setReqDocs] = useState<CaseType[][]>(); // container docs

  useEffect(() => {
    async function loadClientDocs() {
      const client = await getCurrentClient();
      if (client !== undefined) {
        // get all client case types
        const cases = await getAllCases(client.id);
        const clientCaseTypes: CaseType[] = cases.map(c => c.type);
        setCaseTypes(clientCaseTypes);

        const clientDocs = await Promise.all(
          clientCaseTypes.map(c => getDocList(c)),
        );
        setReqDocs(clientDocs);
      }
    }
    loadClientDocs();
  }, []);

  return (
    <PageContainer>
      <TextRegular>Upload your necessary documents!</TextRegular>
      {caseTypes?.map(ct => (
        <DocContainer
          key={ct}
          caseType={ct}
          uploadStatus={false}
          docList={reqDocs![caseTypes.indexOf(ct)]}
        />
      ))}
    </PageContainer>
  );
};

export default UploadScreen;
