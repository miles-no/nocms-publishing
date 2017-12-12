import React from 'react';
import ReactDOM from 'react-dom';
import { AdminContent } from 'nocms-publishing';

require('../../styles/index.css');

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

ReactDOM.render(
  <AdminContent
    templates={templates}
    sections={sections}
    languages={lang}
    folders={folders}
  />, document.getElementById('adminPanel'));
