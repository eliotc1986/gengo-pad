import React, { useState } from 'react';
import {
  Button,
  Dialog,
  TextInputField,
  TextareaField,
  SelectField,
  Pane,
} from 'evergreen-ui';
import { addPhrase } from '../../../utilities/phrases';

class AddPhraseForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      phrase: '',
      meaning: '',
      notes: '',
      topics: this.props.topics || [],
      topicId: this.props.topicId || '',
    };
  }

  handleAddPhrase = () => {
    const { phrase, meaning, notes, topicId } = this.state;
    const { onAdd, closeDialog } = this.props;

    addPhrase({ phrase, meaning, notes, topicId });
    closeDialog();
    onAdd();
  };

  render() {
    const isSubmitDisabled = !(
      this.state.phrase &&
      this.state.meaning &&
      this.state.topicId
    );

    return (
      <>
        <TextInputField
          label="Phrase"
          value={this.state.phrase}
          onChange={(e) => this.setState({ phrase: e.target.value })}
          required
        />
        <TextInputField
          label="Meaning"
          value={this.state.meaning}
          onChange={(e) => this.setState({ meaning: e.target.value })}
          required
        />
        <TextareaField
          label="Notes (optional)"
          value={this.state.notes}
          onChange={(e) => this.setState({ notes: e.target.value })}
        />
        <SelectField
          label="Topic"
          onChange={(e) => this.setState({ topicId: e.target.value })}
          defaultValue={this.props.topicId}
          required
        >
          {this.state.topics.map((topic) => {
            return (
              <option value={topic.id} key={topic.id}>
                {topic.name}
              </option>
            );
          })}
        </SelectField>
        <Pane display="flex" justifyContent="flex-end" marginTop={24}>
          <Button onClick={this.props.closeDialog} marginRight={4}>
            Cancel
          </Button>
          <Button
            intent="success"
            appearance="primary"
            onClick={this.handleAddTopic}
            disabled={isSubmitDisabled}
          >
            Save
          </Button>
        </Pane>
      </>
    );
  }
}
const AddPhraseDialog = ({ topics, topicId, onAdd }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        onClick={() => setVisible(true)}
        appearance="primary"
        intent="success"
        height={32}
      >
        Add phrase
      </Button>
      <Dialog
        title="New Phrase"
        intent="success"
        isShown={visible}
        preventBodyScrolling
        hasFooter={false}
        onCloseComplete={() => setVisible(false)}
      >
        {({ close }) => (
          <AddPhraseForm
            topics={topics}
            topicId={topicId}
            onAdd={onAdd}
            closeDialog={close}
          />
        )}
      </Dialog>
    </>
  );
};

export default AddPhraseDialog;
