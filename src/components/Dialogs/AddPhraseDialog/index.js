import React from 'react';
import {
  Button,
  Dialog,
  TextInputField,
  TextareaField,
  SelectField,
} from 'evergreen-ui';
import { addPhrase } from '../../../utilities/phrases';

class AddPhraseDialog extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      topics: this.props.topics || [],
      phrase: '',
      meaning: '',
      notes: '',
      topicId: this.props.topicId || '',
    };
  }

  handleAddPhrase = (cb) => {
    const { phrase, meaning, notes, topicId } = this.state;

    addPhrase({ phrase, meaning, notes, topicId });
    this.props.onAdd();
    cb();
  };

  render() {
    const isSubmitDisabled = !(
      this.state.phrase &&
      this.state.meaning &&
      this.state.topicId
    );

    return (
      <>
        <Button
          onClick={() => this.setState({ visible: true })}
          appearance="primary"
          height={32}
        >
          Add phrase
        </Button>
        <Dialog
          title="New Phrase"
          intent="success"
          isShown={this.state.visible}
          preventBodyScrolling
          confirmLabel="Save"
          isConfirmDisabled={isSubmitDisabled}
          onCloseComplete={() => this.setState({ visible: false })}
          onConfirm={(close) => this.handleAddPhrase(close)}
        >
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
            required
          >
            {this.state.topics.map((topic) => {
              return (
                <option
                  value={topic.id}
                  selected={topic.id === this.state.topicId}
                >
                  {topic.name}
                </option>
              );
            })}
          </SelectField>
        </Dialog>
      </>
    );
  }
}

export default AddPhraseDialog;
