import React from 'react';
import { Button, Dialog, TextInputField, TextareaField } from 'evergreen-ui';
import { addTopic } from '../../../utilities/topics';

class AddTopicDialog extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      name: '',
      description: '',
      color: '',
    };
  }

  handleAddTopic = () => {
    this.setState({ visible: false });
    const { name, description, color } = this.state;

    addTopic({ name, color, description });
  };

  render() {
    return (
      <>
        <Button onClick={() => this.setState({ visible: true })}>Show</Button>
        <Dialog
          title="New Topic"
          intent="success"
          isShown={this.state.visible}
          preventBodyScrolling
          confirmLabel="Save"
          isConfirmDisabled={!(this.state.name && this.state.color)}
          onCloseComplete={this.handleAddTopic}
        >
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
        </Dialog>
      </>
    );
  }
}

export default AddTopicDialog;
