import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dictionary } from '../i18n/Internationalization';
import IconButton from '../atoms/IconButton';
import SimpleImage from '../dialogs/media/SimpleImage';
import ModalDialog from '../atoms/ModalDialog';

export default class EditSimpleImage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
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

  render() {
    const instructionTitle = dictionary('Jeg ønsker å legge til bilde', this.context.lang);
    const instructionContent = dictionary('Rediger bilde-instruksjoner', this.context.lang);
    return (
      <span> {this.props.activeEditMode && this.context.editMode ?
        <span className="admin-button__add-image">
          <IconButton onClick={this.onClick} iconType="photo" iconOnly transparent noBorder />
          <ModalDialog
            onClose={this.onClose}
            modalActive={this.state.dialogOpen}
            cover
            showHeader
            showFooter
            showInstructions
            animation
            titleIcon="camera_alt"
            instructionTitle={instructionTitle}
            instructionContent={instructionContent}
            titleText={dictionary('Bildefiler', this.context.lang)}
          >
            <SimpleImage
              scope={this.props.scope}
              image={this.props.image}
              onClose={this.onClose}
              presentationalImage={false}
              placeholderImage={this.props.placeholderImage}
            />
          </ModalDialog>
        </span> : null}
      </span>
    );
  }
}

EditSimpleImage.propTypes = {
  scope: PropTypes.string,
  image: PropTypes.object,
  activeEditMode: PropTypes.bool,
  placeholderImage: PropTypes.string,
};

EditSimpleImage.defaultProps = {
  activeEditMode: false,
  targetDevices: false,
};

EditSimpleImage.contextTypes = {
  lang: PropTypes.string,
  editMode: PropTypes.bool,
};
