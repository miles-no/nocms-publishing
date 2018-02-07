import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'nocms-atoms';
import ModalDialog from './atoms/ModalDialog';


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
    const { widthConstrained, centered } = this.props;
    const childWithProps = React.cloneElement(this.props.children, {
      onClose: this.onClose,
    });
    return (
      <Fragment>
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
            widthConstrained={widthConstrained}
            centered={centered}
          >
            {childWithProps}
          </ModalDialog>
        }
      </Fragment>
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
  widthConstrained: PropTypes.bool,
  centered: PropTypes.bool,
};

AdminMenuDialog.contextTypes = {
  lang: PropTypes.string,
};
