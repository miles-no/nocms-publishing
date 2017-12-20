// @TODO: rewrite
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminMenuDialog from '../AdminMenuDialog';
import MenuSectionWrapper from './MenuSectionWrapper';
import { dictionary } from '../i18n/Internationalization';

export default class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalHeight: '',
    };
    this.setFrameHeight = this.setFrameHeight.bind(this);
  }

  setFrameHeight() {
    const height = `${(this.ifr.contentWindow.document.body.scrollHeight + 200)}px`;
    this.setState({
      modalHeight: height,
    });
  }

  render() {
    const { applications } = this.props;
    const { admin: isAdmin, publisher: isPublisher } = this.props.claims;
    if (!isAdmin && !isPublisher) {
      return null;
    }
    const menuItemClass = 'admin-menu__item';
    return (
      <MenuSectionWrapper folderName={dictionary('Applikasjoner', this.context.lang)}>
        <div className="admin-menu__edit">
          <ul className="admin-menu__actions unstyled-list">
            { isPublisher ?
              applications
                .filter((app) => { return app.requirePublisher; })
                .map((app) => {
                  return (
                    <li className={menuItemClass} key={app.src}>
                      <AdminMenuDialog
                        instructionContent={dictionary(app.text, this.context.lang)}
                        title={dictionary(app.title, this.context.lang)}
                        text={dictionary(app.text, this.context.lang)}
                        icon={app.icon}
                      >
                        <iframe
                          className="application__iframe"
                          src={app.src}
                          title={app.iframeTitle}
                          onLoad={() => {
                            this.setFrameHeight();
                          }}
                          ref={(iframe) => { this.ifr = iframe; }}
                          style={{ height: this.state.modalHeight }}
                        />
                      </AdminMenuDialog>
                    </li>
                  );
                })
              : null }
            { isAdmin ?
              applications
                .filter((app) => { return app.requireAdmin; })
                .map((app) => {
                  return (
                    <li className={menuItemClass} key={app.src}>
                      <AdminMenuDialog
                        instructionContent={dictionary(app.text, this.context.lang)}
                        title={dictionary(app.title, this.context.lang)}
                        text={dictionary(app.text, this.context.lang)}
                        icon={app.icon}
                      >
                        <iframe
                          className="application__iframe"
                          src={app.src}
                          title={app.iframeTitle}
                          onLoad={() => {
                            this.setFrameHeight();
                          }}
                          ref={(iframe) => { this.ifr = iframe; }}
                          style={{ height: this.state.modalHeight }}
                        />
                      </AdminMenuDialog>
                    </li>
                  );
                })
              : null }
          </ul>
        </div>
      </MenuSectionWrapper>
    );
  }
}

Applications.propTypes = {
  claims: PropTypes.object,
  applications: PropTypes.array,
};

Applications.defaultProps = {
  claims: {},
};
