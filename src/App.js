import React from 'react';
import { isEmpty } from 'ramda';
import styled from 'styled-components';
import { Heading, Menu, Pane, Paragraph } from 'evergreen-ui';
import AddTopicDialog from './components/Dialogs/AddTopicDialog';
import AddPhraseDialog from './components/Dialogs/AddPhraseDialog';
import { getTopics } from './utilities/topics';
import { getPhrases } from './utilities/phrases';

const Flex = styled.div`
  display: flex;
`;

const SidebarNavigation = styled.aside`
  background-color: #f9f9fb;
  width: 270px;
  height: 100%;
  min-height: 100vh;
  padding: 24px 32px;
  border-right: 1px solid #efefef;
`;

const MainContent = styled(Flex)`
  padding: 24px 32px;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
  flex: 1;
`;

const ColorCircle = styled.div`
  border-radius: 50%;
  margin-right: 8px;
  height: 32px;
  width: 32px;
  background-color: ${({ bg }) => bg};
`;

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      phrases: [],
      selectedTopic: {},
      selectedTopicPhrases: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({
      topics: getTopics(),
      phrases: getPhrases(),
      isLoading: false,
    });
  }

  render() {
    if (this.state.isLoading) return null;

    return (
      <Flex>
        <SidebarNavigation>
          <Heading size={700} marginBottom={16}>
            Gengo Pad
          </Heading>
          {this.state.topics.length > 0 && (
            <Pane marginBottom={16}>
              <Menu>
                <Menu.Group>
                  {this.state.topics.map((topic) => {
                    return (
                      <Menu.Item
                        onClick={() => this.setState({ selectedTopic: topic })}
                      >
                        {topic.name}
                      </Menu.Item>
                    );
                  })}
                </Menu.Group>
              </Menu>
            </Pane>
          )}
          <Pane>
            <AddTopicDialog
              onAdd={() => this.setState({ topics: getTopics() })}
            />
          </Pane>
        </SidebarNavigation>
        <MainContent as="main">
          {!isEmpty(this.state.selectedTopic) && (
            <Pane padding={16} border="default" elevation={1}>
              <Pane display="flex" alignItems="center" marginBottom="16">
                <ColorCircle bg={this.state.selectedTopic.color} />
                <Heading size={900}>{this.state.selectedTopic.name}</Heading>
              </Pane>
              <Paragraph marginBottom="16">
                {this.state.selectedTopic.description}
              </Paragraph>
              <AddPhraseDialog
                topics={this.state.topics}
                topicId={this.state.selectedTopic.id}
                onAdd={() => this.setState({ phrases: getPhrases() })}
              />
            </Pane>
          )}
        </MainContent>
      </Flex>
    );
  }
}

export default App;
