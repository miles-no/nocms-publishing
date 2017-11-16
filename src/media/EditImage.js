import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dictionary } from '../i18n/Internationalization';
import IconButton from '../atoms/IconButton';
import Media from '../dialogs/media/Media';
import ModalDialog from '../atoms/ModalDialog';

export default class EditImage extends Component {
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
    // @TODO: How should we represent instructions
    const instructionTitle = dictionary('Jeg ønsker å endre på bilde', this.context.lang);
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
            <Media
              scope={this.props.scope}
              {...this.props.data}
              onClose={this.onClose}
              presentationalImage={this.props.presentationalImage}
              aspectRatio={this.props.aspectRatio}
              placeholderImage={this.props.placeholderImage}
              transformation={this.props.transformation}
              targetDevices={this.props.targetDevices}
            />
          </ModalDialog>
        </span> : null}
      </span>
    );
  }
}

EditImage.propTypes = {
  scope: PropTypes.string,
  presentationalImage: PropTypes.bool,
  data: PropTypes.object,
  activeEditMode: PropTypes.bool,
  aspectRatio: PropTypes.object,
  placeholderImage: PropTypes.string,
  transformation: PropTypes.array,
  targetDevices: PropTypes.bool,
};

EditImage.defaultProps = {
  activeEditMode: false,
  targetDevices: false,
};

EditImage.contextTypes = {
  lang: PropTypes.string,
  editMode: PropTypes.bool,
};
