import styled from 'styled-components';
import {
  Heading,
  Pane,
  Button,
  Dialog,
  TextInputField,
  TextareaField,
} from 'evergreen-ui';
import { useState } from 'react';
import AddTopicDialog from './components/Dialogs/AddTopicDialog';

const Flex = styled.div`
  display: flex;
`;

const SidebarNavigation = styled(Flex)`
  background-color: #f9f9fb;
  width: 270px;
  height: 100%;
  min-height: 100vh;
  padding: 24px 32px;
  border-right: 1px solid #efefef;
`;

const ColorPicker = styled.div`
  position: relative;
`;

const ColorBox = styled.div``;

function App() {
  return (
    <Flex>
      <SidebarNavigation>
        <Heading size={700}>Gengo Pad</Heading>

        <AddTopicDialog />
      </SidebarNavigation>
    </Flex>
  );
}

export default App;
