/* eslint jsx-a11y/no-static-element-interactions: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AriaModal from 'react-aria-modal';
import { Icon } from 'nocms-atoms';
import { listenToGlobal, stopListenToGlobal } from 'nocms-events';
import IconButton from './IconButton';

export default class ModalDialog extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
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

  render() {
    const {
      showHeader,
      showTitle,
      titleText,
      titleIcon,
      title,
      cover,
      children,
      animation,
      centered,
      widthConstrained,
    } = this.props;
    const mainContentId = global.environment !== 'server' ? document.getElementById('mainContent') : null;

    let modalClass = cover ? 'modal modal--cover' : 'modal';
    if (animation) { modalClass += ' modal--animation'; }
    if (this.props.animation && this.state.modalHasEntered) {
      modalClass += ' modal--animation-active';
    }
    let contentClass = 'modal__content';
    if (widthConstrained) {
      contentClass += ' modal__content--constrained';
    }
    if (centered) {
      contentClass += ' modal__content--centered';
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
              <h2 className="modal__header-title"><Icon type={titleIcon} /><span>{titleText}</span></h2>
              <div className="modal__header-close">
                <IconButton iconType="close" iconOnly noBorder onClick={this.closeModal} />
              </div>
            </header> : null}
          <div className="modal__body">
            <div className={contentClass}>
              { showTitle ?
                <h1 className="modal__title">{title}</h1> : null }
              {children}
            </div>
          </div>
        </div>
      </AriaModal>
    );
  }
}

ModalDialog.propTypes = {
  showHeader: PropTypes.bool,
  showTitle: PropTypes.bool,
  titleText: PropTypes.string,
  title: PropTypes.string,
  cover: PropTypes.bool,
  children: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  animation: PropTypes.bool,
  modalActive: PropTypes.bool.isRequired,
  titleIcon: PropTypes.string,
  centered: PropTypes.bool,
  widthConstrained: PropTypes.bool,
};

ModalDialog.defaultProps = {
  showHeader: true,
  dialogClass: '',
  focusElement: '',
  cover: false,
  titleText: 'Dialog',
  animation: false,
  titleIcon: '',
  setBodyHeight: null,
};
