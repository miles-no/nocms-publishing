import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'nocms-atoms';
import { dictionary } from 'nocms-i18n';
import AddSectionDialog from '../dialogs/AddSection';
import ModalDialog from '../atoms/ModalDialog';

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
    const { i18n, adminLang } = this.context;
    // @TODO: How should we represent instructions
    const title = dictionary(i18n, 'Legg til en ny seksjon på siden', adminLang);
    const instructionContent = dictionary(i18n, 'Legg til en ny seksjon på siden-instruksjoner', adminLang);
    return (
      <span>
        <IconButton transparent onClick={this.onClick} iconType="add" text={dictionary(i18n, 'Legg til en ny seksjon', adminLang)} />
        <ModalDialog
          onClose={this.onClose}
          modalActive={this.state.dialogOpen}
          cover
          animation
          showHeader
          showInstructions
          titleIcon="note"
          title={title}
          instructionContent={instructionContent}
          titleText={dictionary(i18n, 'Seksjoner', adminLang)}
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
  adminLang: PropTypes.string,
  i18n: PropTypes.object,
};
