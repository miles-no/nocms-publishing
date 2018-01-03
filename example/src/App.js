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
      {
        name: 'banner',
        description: '',
        categories: ['content', 'all'],
        icon: '',
        label: 'Banner',
      },
    ],
  },
];

const sections = [{
  name: 'chapter',
  description: '',
  categories: ['all'],
  icon: '',
  label: 'Kapittel',
  defaultContent: { foo: 1 },
},
{
  name: 'banner',
  description: '',
  categories: ['all'],
  icon: '',
  label: 'Banner'
}];

const folders = [  {
  id: 'all',
  title: 'Alle typer',
}];

const applications = [
  {
    title: 'Jeg ønsker å håndtere språk og uttrykk',
    iframeTitle: 'Internationalization',
    text: 'Språk',
    src: '/applications/i18n',
    icon: 'language',
    requirePublisher: true
  },
  {
    title: 'Jeg ønsker å endre data om menneskene',
    iframeTitle: 'People admin',
    text: 'Menneskene',
    src: '/applications/people-admin',
    icon: 'people',
    requireAdmin: true
  },
  {
    title: 'Jeg ønsker å endre/legge til et arrangement',
    iframeTitle: 'SMiles',
    text: 'Sosialt',
    src: '/applications/smiles-admin',
    icon: 'event',
    requireAdmin: true
  }
]

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
          applications={applications}
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
