import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from './atoms/ModalDialog';
import IconButton from './atoms/IconButton';

export default class AdminMenuDialog extends Component {
  constructor(props) {
    super(props);
    this.openDialog = this.openDialog.bind(this);
    this.onClose = this.onClose.bind(this);
    this.state = {
      dialogOpen: false,
    };
  }
  onClose() {
    this.setState({ dialogOpen: false });
  }

  openDialog() {
    this.setState({ dialogOpen: true });
  }

  render() {
    const childWithProps = React.cloneElement(this.props.children, {
      onClose: this.onClose,
    });
    return (
      <span>
        <IconButton
          vertical={this.props.vertical}
          green={this.props.green}
          iconSize={this.props.iconSize}
          iconType={this.props.icon}
          text={this.props.text}
          transparent
          noBorder
          onClick={this.openDialog}
        />
        {!this.state.dialogOpen ?
          null :
          <ModalDialog
            onClose={this.onClose}
            modalActive={this.state.dialogOpen}
            cover
            animation
            showHeader
            showTitle
            showFooter
            showInstructions
            titleIcon={this.props.icon}
            title={this.props.title}
            instructionContent={this.props.instructionContent}
            titleText={this.props.text}
          >
            {childWithProps}
          </ModalDialog>
        }
      </span>
    );
  }
}

AdminMenuDialog.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  instructionContent: PropTypes.string,
  vertical: PropTypes.bool,
  green: PropTypes.bool,
  iconSize: PropTypes.string,
};

AdminMenuDialog.contextTypes = {
  lang: PropTypes.string,
};
