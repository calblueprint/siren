import React, { useEffect, useState } from 'react';
import { TextRegular } from 'assets/fonts/Fonts';
import { PageContainer } from 'screens/styles';
import DocContainer from 'components/DocContainer/DocContainer';
import { getDocList, getAllCases } from 'database/queries';
import { getCurrentClient } from 'database/auth';
import { CaseType } from 'types/types';

const UploadScreen = ({ navigation }: any) => {
  const [caseTypes, setCaseTypes] = useState<CaseType[]>([]); // container headers
  const [reqDocs, setReqDocs] = useState<string[][]>([]); // container docs

  useEffect(() => {
    async function loadClientDocs() {
      const client = await getCurrentClient();
      if (client !== undefined) {
        // get all client case types
        const cases = await getAllCases(client.id);
        let clientCaseTypes: CaseType[] = cases.map(c => c.type);
        clientCaseTypes = [...new Set(clientCaseTypes)];
        clientCaseTypes = Array.from(clientCaseTypes);

        const clientDocs = await Promise.all(
          clientCaseTypes.map(c => getDocList(c)),
        );

        setReqDocs(clientDocs);
        setCaseTypes(clientCaseTypes);
      }
    }
    loadClientDocs();
  }, []);

  return (
    <PageContainer>
      <TextRegular>Upload your necessary documents!</TextRegular>
      {caseTypes?.map((ct, i) => (
        <DocContainer
          key={ct}
          caseType={ct}
          uploadStatus={false} // TO DO: use client's doc status
          docList={reqDocs[i]}
        />
      ))}
    </PageContainer>
  );
};

export default UploadScreen;
