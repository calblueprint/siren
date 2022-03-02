import styled from 'styled-components/native';
import { Colors } from 'assets/Colors';

const HeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 12px;
    padding-left: 30px;
    padding-right: 30px;
    background: ${Colors.lightGray};
    height: 96px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`;

const NoUserContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 12px;
    background: ${Colors.lightGray};
    height: 96px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`;

export default HeaderContainer;
