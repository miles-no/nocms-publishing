import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'nocms-atoms';
import { dictionary } from './i18n/Internationalization';
import TabHeader from './atoms/TabHeader';

export default class NameUrlTab extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      selected: 0,
    };
  }

  onClick(id, event) {
    event.preventDefault();
    this.setState({ selected: id });
  }

  render() {
    const tabs = [
      { id: 0, name: 'Navn' },
      { id: 1, name: 'URL' },
    ];
    const renderedTabsHeader = tabs.map((item) => { return <TabHeader key={item.id} active={this.state.selected === item.id} item={item} onClick={this.onClick} />; },
    );
    const {
      content,
      activeEditMode,
      scope,
    } = this.props;
    return (
      <div className="tabs tabs--small tabs--border">
        <ul className="tabs__header tabs__header--dark">
          {renderedTabsHeader}
        </ul>
        <div className="tabs__content">
          {this.state.selected === 0
            ? <Text text={content.title} placeholder={dictionary('Skriv tittel', this.context.lang)} editMode={this.context.editMode} activeEditMode={activeEditMode} editorType="simple" scope={`${scope}.title`} />
            : <Text text={content.url} placeholder={dictionary('Legg til URL', this.context.lang)} editMode={this.context.editMode} activeEditMode={activeEditMode} editorType="simple" scope={`${scope}.url`} />}
        </div>
      </div>
    );
  }
}

NameUrlTab.propTypes = {
  content: PropTypes.object,
  scope: PropTypes.string,
  activeEditMode: PropTypes.bool,
};

TabHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  active: PropTypes.bool,
};

NameUrlTab.contextTypes = {
  editMode: PropTypes.bool,
};
