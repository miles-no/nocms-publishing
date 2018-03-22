import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'nocms-atoms';
import { dictionary } from 'nocms-i18n';
import Media from '../dialogs/media/Media';
import ModalDialog from '../atoms/ModalDialog';
import i18n from '../i18n/dictionary';

export default class EditImage extends Component {
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
    const { editMode, adminLang } = this.context;
    // @TODO: How should we represent instructions
    const title = dictionary(i18n, 'Jeg ønsker å endre på bilde', adminLang);
    return (
      <span> {this.props.activeEditMode && editMode ?
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
            titleText={dictionary(i18n, 'Bildefiler', adminLang)}
            showTitle
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
              disableCaption={this.props.disableCaption}
              disableAttribution={this.props.disableAttribution}
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
  disableCaption: PropTypes.bool,
  disableAttribution: PropTypes.bool,
};

EditImage.defaultProps = {
  activeEditMode: false,
  targetDevices: false,
};

EditImage.contextTypes = {
  lang: PropTypes.string,
  adminLang: PropTypes.string,
  editMode: PropTypes.bool,
};

EditImage.childContextTypes = {
  i18n: PropTypes.object,
};
