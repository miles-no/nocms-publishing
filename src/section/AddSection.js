import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dictionary } from '../i18n/Internationalization';
import AddSectionDialog from '../dialogs/AddSection';
import ModalDialog from '../atoms/ModalDialog';
import IconButton from '../atoms/IconButton';

export default class AddSection extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSectionClick = this.onSectionClick.bind(this);
    this.state = {
      dialogOpen: false,
    };
  }
  onClose() {
    this.setState({ dialogOpen: false });
  }

  onClick() {
    this.setState({ dialogOpen: true });
  }

  onSectionClick(section) {
    this.setState({ dialogOpen: false });

    this.props.onClick(section);
  }

  render() {
    const { sections, template, folders } = this.props;
    // @TODO: How should we represent instructions
    const instructionTitle = dictionary('Legg til en ny seksjon på siden', this.context.lang);
    const instructionContent = dictionary('Legg til en ny seksjon på siden-instruksjoner', this.context.lang);
    return (
      <span>
        <IconButton transparent onClick={this.onClick} iconType="add" text={dictionary('Legg til en ny seksjon på siden', this.context.lang)} />
        <ModalDialog
          onClose={this.onClose}
          modalActive={this.state.dialogOpen}
          cover
          animation
          showHeader
          showInstructions
          titleIcon="note"
          instructionTitle={instructionTitle}
          instructionContent={instructionContent}
          titleText={dictionary('Seksjoner', this.context.lang)}
        >
          <AddSectionDialog
            onClick={this.onSectionClick}
            sections={sections}
            template={template}
            folders={folders}
          />
        </ModalDialog>
      </span>
    );
  }
}

AddSection.propTypes = {
  onClick: PropTypes.func.isRequired,
  sections: PropTypes.array,
  template: PropTypes.object,
  folders: PropTypes.array,
};

AddSection.contextTypes = {
  lang: PropTypes.string,
};
