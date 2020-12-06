import React, { useState } from 'react';
import {
  Button,
  Dialog,
  TextInput,
  TextInputField,
  TextareaField,
  EditIcon,
  Pane,
  Popover,
  Position,
  Heading,
} from 'evergreen-ui';
import { addTopic } from '../../../utilities/topics';
import { getRandomInt } from '../../../utilities';
import { COLORS } from '../../../constants';
import { ColorSwatch } from '../../ColorSwatch/ColorSwatch';
import { UnstyledButton as CoreButton } from '../../core/Button';

class AddTopicForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      color: COLORS[getRandomInt(COLORS.length - 1)],
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
        <Heading size={400} marginBottom={4}>
          Color *
        </Heading>
        <Pane display="flex">
          <Popover
            bringFocusInside
            position={Position.TOP_LEFT}
            content={({ close }) => (
              <Pane width={425} padding={12}>
                {COLORS.map((color, index) => (
                  <ColorSwatch
                    as={CoreButton}
                    onClick={() => {
                      this.setState({ color }, () => close());
                    }}
                    bg={color}
                    key={color}
                    autoFocus={this.state.color === color}
                  />
                ))}
              </Pane>
            )}
          >
            <ColorSwatch as={CoreButton} bg={this.state.color} />
          </Popover>
          <TextInput
            label="Color"
            type="text"
            value={this.state.color}
            onChange={(e) => this.setState({ color: e.target.value })}
            required
          />
        </Pane>
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
