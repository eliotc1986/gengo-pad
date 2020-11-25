import React, { useState } from 'react';
import {
  Button,
  Dialog,
  TextInputField,
  TextareaField,
  EditIcon,
  Pane,
  Paragraph,
} from 'evergreen-ui';
import { addTopic } from '../../../utilities/topics';

class AddTopicForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      color: '#000000',
    };
  }

  handleAddTopic = () => {
    const { name, description, color } = this.state;
    const { closeDialog, onAdd } = this.props;

    addTopic({ name, color, description });
    closeDialog();
    onAdd();
  };

  render() {
    return (
      <>
        <TextInputField
          label="Name"
          placeholder="Choose a topic name"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          required
        />
        <TextareaField
          label="Description (optional)"
          placeholder="Add a brief description"
          value={this.state.description}
          onChange={(e) => this.setState({ description: e.target.value })}
        />
        <TextInputField
          label="Color"
          type="color"
          value={this.state.color}
          onChange={(e) => this.setState({ color: e.target.value })}
          required
        />
        <Pane display="flex" justifyContent="flex-end" marginTop={24}>
          <Button onClick={this.props.closeDialog} marginRight={4}>
            Cancel
          </Button>
          <Button
            intent="success"
            appearance="primary"
            onClick={this.handleAddTopic}
            disabled={!(this.state.name && this.state.color)}
          >
            Save
          </Button>
        </Pane>
      </>
    );
  }
}

const AddTopicDialog = ({ onAdd }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        onClick={() => setVisible(true)}
        appearance="minimal"
        height={32}
        iconBefore={EditIcon}
      >
        Add topic
      </Button>
      <Dialog
        title="New Topic"
        intent="success"
        isShown={visible}
        preventBodyScrolling
        hasFooter={false}
        onCloseComplete={() => setVisible(false)}
      >
        {({ close }) => <AddTopicForm onAdd={onAdd} closeDialog={close} />}
      </Dialog>
    </>
  );
};

export default AddTopicDialog;
