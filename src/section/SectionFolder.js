/* eslint jsx-a11y/no-static-element-interactions: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'nocms-atoms';
import Section from './Section';
import I from '../i18n/Internationalization';
import IconButton from '../atoms/IconButton';
// import templateSectionData from '../../../data/templateSectionData';

export default class SectionFolder extends Component {
  constructor(props) {
    super(props);

    this.onToggleFolder = this.onToggleFolder.bind(this);
    this.state = {
      isOpen: props.isOpen,
    };
  }

  onToggleFolder(e) {
    e.stopPropagation();
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { name, sections, onClick, templateSectionData } = this.props;
    // @TODO: Hvis bare en folder, dropp åpne og lukke
    const list = sections.map((section, idx) => { return <Section section={section} onClick={onClick} key={idx} />; });
    const folderClass = this.state.isOpen ? 'folder folder--open' : 'folder';

    return (
      <li className={folderClass}>
        <div className="folder__header" onClick={this.onToggleFolder}>
          <span className="folder__title"><Icon type="folder_open" /><span><I>{templateSectionData.folders[name]}</I></span></span>
          <IconButton transparent iconOnly dark noBorder onClick={this.onToggleFolder} iconClass="folder__icon" iconType="keyboard_arrow_down" />
        </div>
        {this.state.isOpen ? <ul className="folder__content unstyled-list">{list}</ul> : null}
      </li>
    );
  }
}

SectionFolder.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
  sections: PropTypes.array,
  isOpen: PropTypes.bool,
  templateSectionData: PropTypes.object,
};

SectionFolder.defaultProps = {
  isOpen: false,
};
