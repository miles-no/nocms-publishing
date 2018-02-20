import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'nocms-atoms';
import { dictionary } from 'nocms-i18n';
import SimpleImage from '../dialogs/media/SimpleImage';
import ModalDialog from '../atoms/ModalDialog';
import i18n from '../i18n/dictionary';

export default class EditSimpleImage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.state = {
      dialogOpen: false,
    };
  }

  getChildContext() {
    return {
      i18n,
    };
  }

  onClose() {
    this.setState({ dialogOpen: false });
  }

  onClick() {
    this.setState({ dialogOpen: true });
  }

  render() {
    const { adminLang, editMode } = this.context;
    const { activeEditMode, placeholderImage, scope, image } = this.props;
    const title = dictionary(i18n, 'Jeg ønsker å legge til bilde', adminLang);
    const instructionContent = dictionary(i18n, 'Rediger bilde-instruksjoner', adminLang);
    return (
      <span> {activeEditMode && editMode ?
        <span className="admin-button__add-image">
          <IconButton onClick={this.onClick} iconType="photo_camera" text="Rediger bilde" iconSize="small" transparent noBorder />
          <ModalDialog
            onClose={this.onClose}
            modalActive={this.state.dialogOpen}
            cover
            showHeader
            showFooter
            showInstructions
            animation
            titleIcon="camera_alt"
            title={title}
            instructionContent={instructionContent}
            titleText={dictionary(i18n, 'Bildefiler', adminLang)}
            showTitle
          >
            <SimpleImage
              scope={scope}
              image={image}
              onClose={this.onClose}
              presentationalImage={false}
              placeholderImage={placeholderImage}
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
  adminLang: PropTypes.string,
  editMode: PropTypes.bool,
};

EditSimpleImage.childContextTypes = {
  i18n: PropTypes.object,
};

