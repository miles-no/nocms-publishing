
// @TODO: rewrite
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import ajax from 'nocms-ajax';
import AdminMenuDialog from '../../AdminMenuDialog';
import I, { dictionary } from '../../i18n/Internationalization';

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
      this.setState({ errorMessage: dictionary('Filtypen må være JSON', this.context.lang) });
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
        this.setState({ errorMessage: dictionary('Det oppsto en feil under lesing av filen. Er den riktig formatert?', this.context.lang) });
        return;
      }
      const message = {
        type: 'import-pages',
        data: pageData,
      };
      ajax.post(this.context.config.messageApi, message, { responseRequired: true }, (err) => {
        if (err) {
          this.setState({ errorMessage: dictionary('Det oppsto en feil under import av sidene.', this.context.lang) });
          return;
        }
        this.setState({ pageData });
      });
    };

    fileReader.onerror = () => {
      this.setState({ errorMessage: dictionary('Det oppsto en feil under lesing av filen. Er den riktig formatert?', this.context.lang) });
    };
  }
  render() {
    return (
      <AdminMenuDialog
        instructionContent={dictionary('Last opp JSON-formaterte sidedata', this.context.lang)}
        title={dictionary('Importere sidedata', this.context.lang)}
        text={dictionary('Importere sidedata', this.context.lang)}
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
  lang: PropTypes.string,
  config: PropTypes.object,
};
