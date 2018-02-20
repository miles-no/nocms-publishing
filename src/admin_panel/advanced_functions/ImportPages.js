
// @TODO: rewrite
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { I, dictionary } from 'nocms-i18n';
import ajax from 'nocms-ajax';
import AdminMenuDialog from '../../AdminMenuDialog';

export default class ImportPages extends Component {
  constructor(props) {
    super(props);
    this.onUploadPageDataFile = this.onUploadPageDataFile.bind(this);
    this.state = {
      modalHeight: '',
    };
  }

  onUploadPageDataFile(files, rejected) {
    if (rejected && rejected.length > 0) {
      this.setState({ errorMessage: dictionary(this.context.i18n, 'Filtypen må være JSON', this.context.adminLang) });
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsText(files[0], 'UTF-8');
    fileReader.onload = (e) => {
      const fileContent = e.target.result;
      let pageData;
      try {
        pageData = JSON.parse(fileContent);
      } catch (ex) {
        this.setState({ errorMessage: dictionary(this.context.i18n, 'Det oppsto en feil under lesing av filen. Er den riktig formatert?', this.context.adminLang) });
        return;
      }
      const message = {
        messageType: 'nocms-import-pages',
        data: pageData,
      };
      ajax.post(this.context.config.messageApi, message, { responseRequired: true }, (err) => {
        if (err) {
          this.setState({ errorMessage: dictionary(this.context.i18n, 'Det oppsto en feil under import av sidene.', this.context.adminLang) });
          return;
        }
        this.setState({ pageData });
      });
    };

    fileReader.onerror = () => {
      this.setState({ errorMessage: dictionary(this.context.i18n, 'Det oppsto en feil under lesing av filen. Er den riktig formatert?', this.context.adminLang) });
    };
  }
  render() {
    const { i18n, adminLang } = this.context;
    return (
      <AdminMenuDialog
        instructionContent={dictionary(i18n, 'Last opp JSON-formaterte sidedata', adminLang)}
        title={dictionary(i18n, 'Importere sidedata', adminLang)}
        text={dictionary(i18n, 'Importere sidedata', adminLang)}
        icon="library_add"
      >
        <Dropzone
          multiple={false}
          name="pageDataFile"
          accept="application/json"
          onDrop={this.onUploadPageDataFile}
        >
          <I>Last opp filen ved å slippe den over området</I>
        </Dropzone>
      </AdminMenuDialog>
    );
  }
}

ImportPages.contextTypes = {
  adminLang: PropTypes.string,
  config: PropTypes.object,
  i18n: PropTypes.object,
};
