import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AdminContent } from 'nocms-publishing';
import Template from './Template';

const lang = ['no', 'en'];
const templates = [
  {
    id: 'newsPage',
    component: null,
    name: 'Nyheter',
    siteTemplate: true,
    sections: [
      {
        name: 'chapter',
        description: '',
        categories: ['content', 'all'],
        icon: '',
        label: 'Kapittel',
      },
    ],
  },
];
const sections = [];
const folders = [];

const config = document.getElementById('nocms.config');

export default class App extends React.Component {
  getChildContext() {
    return {
      editMode: true,
      lang: 'no',
      isNoCMSUser: true,
      adminLang: 'no',
      config: { config },
    };
  }
  render() {
    return (
      <div>
        <Template />
        <AdminContent
          templates={templates}
          sections={sections}
          languages={lang}
          folders={folders}
        />
      </div>
    );
  }
}

App.childContextTypes = {
  editMode: PropTypes.bool,
  lang: PropTypes.string,
  adminLang: PropTypes.string,
  isNoCMSUser: PropTypes.bool,
  config: PropTypes.object,
};

