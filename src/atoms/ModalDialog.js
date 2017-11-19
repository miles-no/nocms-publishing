import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AriaModal from 'react-aria-modal';
import { Icon } from 'nocms-atoms';
import { listenToGlobal, stopListenToGlobal } from 'nocms-events';
import IconButton from './IconButton';
import { dictionary } from '../i18n/Internationalization';

export default class ModalDialog extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openInstructions = this.openInstructions.bind(this);
    this.closeInstructions = this.closeInstructions.bind(this);
    this.onModalEnter = this.onModalEnter.bind(this);
    this.state = {
      modalHasEntered: false,
      modalActive: props.modalActive,
      instructionsOpen: false,
    };
    listenToGlobal('nocms.close-modal', this.closeModal);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ modalActive: newProps.modalActive });
  }

  componentWillUnmount() {
    stopListenToGlobal('nocms.close-modal', this.closeModal);
  }

  onModalEnter() {
    this.setState({ modalHasEntered: true });
  }

  closeModal() {
    if (this.props.animation) {
      this.setState({
        modalHasEntered: false,
      }, () => {
        setTimeout(() => {
          this.props.onClose();
        }, 300);
      });
    } else {
      this.props.onClose();
    }
  }

  openInstructions() {
    this.setState({ instructionsOpen: true });
  }

  closeInstructions() {
    this.setState({ instructionsOpen: false });
  }

  render() {
    const {
      showHeader,
      showInstructions,
      instructionTitle,
      instructionContent,
      titleText,
      titleIcon,
      cover,
      children,
      animation,
    } = this.props;
    const mainContentId = global.environment !== 'server' ? document.getElementById('mainContent') : null;

    let modalClass = cover ? 'modal modal--cover' : 'modal';
    if (animation) { modalClass += ' modal--animation'; }
    if (this.props.animation && this.state.modalHasEntered) {
      modalClass += ' modal--animation-active';
    }

    return (
      <AriaModal
        mounted={this.state.modalActive}
        titleText={titleText}
        applicationNode={mainContentId}
        underlayClass="modal__underlay"
        onExit={this.closeModal}
        onEnter={this.onModalEnter}
      >
        <div className={modalClass}>
          {showHeader ?
            <header id="dialogHeader" className="modal__header">
              <IconButton iconType="keyboard_backspace" iconOnly noBorder onClick={this.closeModal} />
              <h2 className="modal__title"><Icon type={titleIcon} /><span>{titleText}</span></h2>
            </header> : null}
          {showInstructions ?
            <div className="modal__instructions">
              <h3 className="modal__instruction-title">{instructionTitle}</h3>
              {this.state.instructionsOpen ? <IconButton iconType="keyboard_arrow_up" onClick={this.closeInstructions} text={dictionary('Lukk hjelp', 'no')} transparent />
                : <IconButton iconType="keyboard_arrow_down" onClick={this.openInstructions} text={dictionary('Trenger du hjelp?', 'no')} transparent />}
              {this.state.instructionsOpen ?
                <div className="modal__instruction-content">
                  <Icon type="info_outline" />
                  <p>{instructionContent}</p>
                </div> : null}
            </div> : null}
          <div className="modal__body">
            {children}
          </div>
        </div>
      </AriaModal>
    );
  }
}

ModalDialog.propTypes = {
  showHeader: PropTypes.bool,
  titleText: PropTypes.string,
  cover: PropTypes.bool,
  children: PropTypes.object,
  showInstructions: PropTypes.bool,
  instructionTitle: PropTypes.string,
  instructionContent: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  animation: PropTypes.bool,
  modalActive: PropTypes.bool.isRequired,
  titleIcon: PropTypes.string,
};

ModalDialog.defaultProps = {
  showHeader: true,
  dialogClass: '',
  focusElement: '',
  cover: false,
  titleText: 'Dialog',
  showInstructions: false,
  animation: false,
  titleIcon: '',
  setBodyHeight: null,
};
