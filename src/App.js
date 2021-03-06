import React from 'react';
import { isEmpty } from 'ramda';
import styled from 'styled-components';
import {
  Heading,
  Menu,
  Pane,
  Paragraph,
  Button,
  TrashIcon,
  Spinner,
  IconButton,
  HeartIcon,
  Pill,
} from 'evergreen-ui';
import AddTopicDialog from './components/Dialogs/AddTopicDialog';
import AddPhraseDialog from './components/Dialogs/AddPhraseDialog';
import { getTopics, deleteTopic } from './utilities/topics';
import { getPhrases, deletePhrase } from './utilities/phrases';
import { getLikes, addLike, deleteLike, formatLikes } from './utilities/likes';
import { timestampToDate } from './utilities/dateTime';
import { getPhraseCount } from './utilities/getPhraseCount';

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
  padding: 40px;
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

const UnstyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const UnstyledListItem = styled.li`
  margin-bottom: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid #efefef;

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      phrases: [],
      likes: [],
      selectedTopic: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    const topics = getTopics();
    const phrases = getPhrases();
    const likes = getLikes();
    const hasTopics = !isEmpty(topics);
    const selectedTopic = hasTopics ? topics[0] : {};

    this.setState({
      topics,
      phrases,
      likes,
      selectedTopic,
      isLoading: false,
    });
  }

  render() {
    if (this.state.isLoading)
      return (
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={400}
        >
          <Spinner />
        </Pane>
      );

    const selectedTopicPhrases = this.state.phrases.filter(
      (phrase) => phrase.topicId === this.state.selectedTopic.id,
    );

    const likesLookup = formatLikes(this.state.likes);

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
                        key={topic.id}
                        onClick={() =>
                          this.setState({
                            selectedTopic: topic,
                          })
                        }
                      >
                        <Pane
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          {topic.name}
                          <Pill display="inline-flex" margin={8}>
                            {getPhraseCount(topic.id, this.state.phrases)}
                          </Pill>
                        </Pane>
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
            <Pane padding={28} border="default" elevation={1}>
              <Pane display="flex" justifyContent="space-between">
                <Pane display="flex" alignItems="center" marginBottom="16">
                  <ColorCircle bg={this.state.selectedTopic.color} />
                  <Heading size={900} marginRight={8}>
                    {this.state.selectedTopic.name}
                  </Heading>
                  <IconButton
                    onClick={() => {
                      const topicId = this.state.selectedTopic.id;

                      this.setState(
                        {
                          topics: this.state.topics.filter(
                            (topic) => topic.id !== topicId,
                          ),
                          selectedTopic: this.state.topics[0] || {},
                        },
                        () => deleteTopic(topicId),
                      );
                    }}
                    icon={TrashIcon}
                    intent="danger"
                  />
                </Pane>
                <AddPhraseDialog
                  topics={this.state.topics}
                  topicId={this.state.selectedTopic.id}
                  onAdd={() => this.setState({ phrases: getPhrases() })}
                />
              </Pane>
              <Paragraph marginBottom="16">
                {this.state.selectedTopic.description}
              </Paragraph>

              {!isEmpty(selectedTopicPhrases) && (
                <Pane marginTop={16}>
                  <UnstyledList>
                    {selectedTopicPhrases.map((phrase) => {
                      const phraseId = phrase.id;
                      const likeId = likesLookup[phraseId];

                      return (
                        <UnstyledListItem key={phraseId}>
                          <Paragraph marginBottom={4} color="muted">
                            {timestampToDate(phrase.created)}
                          </Paragraph>
                          <Pane
                            display="flex"
                            justifyContent="space-between"
                            marginBottom={8}
                          >
                            <Pane display="flex">
                              <IconButton
                                icon={HeartIcon}
                                intent={likeId ? 'danger' : 'none'}
                                marginRight={8}
                                onClick={() => {
                                  if (likeId) {
                                    deleteLike(likeId);
                                  } else {
                                    addLike(phraseId);
                                  }
                                  this.setState({ likes: getLikes() });
                                }}
                              />

                              <Heading size={700}>{phrase.phrase}</Heading>
                            </Pane>

                            <Button
                              onClick={() => {
                                this.setState(
                                  {
                                    phrases: this.state.phrases.filter(
                                      (phrase) => phrase.id !== phraseId,
                                    ),
                                  },
                                  () => {
                                    deletePhrase(phraseId);
                                  },
                                );
                              }}
                              iconBefore={TrashIcon}
                              intent="danger"
                            >
                              Delete
                            </Button>
                          </Pane>
                          <Pane
                            background="tealTint"
                            padding={16}
                            marginBottom={16}
                            borderRadius={3}
                          >
                            {phrase.meaning}
                          </Pane>
                        </UnstyledListItem>
                      );
                    })}
                  </UnstyledList>
                </Pane>
              )}
            </Pane>
          )}
        </MainContent>
      </Flex>
    );
  }
}

export default App;
