import React, { useEffect, useState } from 'react';
import { PageContainer } from 'screens/styles';
import DocContainer from 'components/DocContainer/DocContainer';
import { getDocList, getAllCases } from 'database/queries';
import { ClientContext } from 'context/ContextProvider';
import { Case } from 'types/types';
import { useIsFocused } from '@react-navigation/native';

const UploadScreen = ({ navigation }: any) => {
  const [clientCases, setClientCases] = useState([] as Case[]); // container headers
  const [reqDocs, setReqDocs] = useState<string[][]>([]); // container docs
  const [clientId, setClientId] = useState('');
  const isFocused = useIsFocused();
  const { state } = React.useContext(ClientContext);

  useEffect(() => {
    async function loadClientDocs() {
      const client = state;
      if (client !== undefined) {
        // get all client case types
        setClientId(client.id);
        const cases = await getAllCases(client.id);
        const clientCaseTypes: string[] = cases.map(c => c.type);

        const clientDocs = await Promise.all(
          clientCaseTypes.map(c => getDocList(c)),
        );
        setReqDocs(clientDocs);
        setClientCases(cases);
      }
    }
    loadClientDocs();
  }, [isFocused]);

  const getDocContainers = () => {
    const currCaseTypes = new Set();
    const docContainers = [];
    for (let i = 0; i < clientCases.length; i += 1) {
      if (currCaseTypes.has(clientCases[i].type) === false && reqDocs[i]) {
        // if case not in set AND doc list for that case exists
        docContainers.push(
          <DocContainer
            key={i}
            clientCase={clientCases[i]}
            clientId={clientId}
            docList={reqDocs[i]}
            navigation={navigation}
          />,
        );
        currCaseTypes.add(clientCases[i].type);
      }
    }
    return docContainers;
  };

  return <PageContainer>{getDocContainers()}</PageContainer>;
};

export default UploadScreen;
