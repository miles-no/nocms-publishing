import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajax from 'nocms-ajax';
import { triggerGlobal } from 'nocms-events';
import I, { dictionary } from '../i18n/Internationalization';
import PageListItem from './PageListItem';

const handleItemClick = (page) => {
  triggerGlobal('navigate', page.uri, page);
};

export default class PageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [
        {
          site: 'no',
          isValid: false,
          isDisabled: false,
          isSubmitting: false,
          pageTitle: 'Frokostmøte for alle som liker frokost',
          uri: '/frokost',
          templateId: 'frontpage',
          lang: 'en',
          published: false,
          pageId: '409ac7a7-c5cc-4c2f-b5e3-7034ef4853b5',
          revision: 29,
          created: '2017-11-22T13:06:04.737Z',
          createdBy: 'caroline.gannefors@miles.no',
          banner: {
            header: 'Hei,\nvi er Miles!',
            link: {
              title: 'Jobbe med oss',
              url: '/jobb',
            },
            image: {
              sameImageAcrossDevices: true,
              large: {
                publicId: 'Backgrounds/forside01',
                format: 'jpg',
                x: 387,
                y: 312,
                width: 2315,
                height: 1013,
              },
              small: {
                publicId: 'Backgrounds/forside01',
                format: 'jpg',
                x: 387,
                y: 312,
                width: 2315,
                height: 1013,
              },
            },
          },
          publicationDetails: {
            published: '2018-01-03T14:42:39.531Z',
          },
          navigationItems: [
            {
              url: '/dna',
              icon: 'dna',
              image: {
                large: {
                  publicId: 'Backgrounds/bg-red-small',
                  format: 'jpg',
                  x: 80,
                  y: 60,
                  width: 640,
                  height: 280,
                },
              },
              title: 'Vårt DNA',
              description: 'Vår visjon er å være en fremragende arbeidsplass basert på verdiene faglig autoritet og varme.',
            },
            {
              url: '/menneskene',
              icon: 'people',
              image: {
                large: {
                  publicId: 'Backgrounds/menneskene',
                  format: 'jpg',
                  x: 543,
                  y: 0,
                  width: 914,
                  height: 400,
                },
              },
              title: 'Menneskene',
              description: 'Menneskene som jobber hos oss, er blant de fremste i bransjen og brenner for faget sitt.',
            },
            {
              url: '/fagmiljo',
              icon: 'academic',
              image: {
                large: {
                  publicId: 'Backgrounds/fagmiljo',
                  format: 'jpg',
                  x: 372,
                  y: 0,
                  width: 1143,
                  height: 500,
                },
              },
              description: 'Vi er stolte av å ha et godt fagmiljø med mange aktiviteter. Hos oss er veien kort til å dele kompetanse med kundene våre og med hverandre.',
              title: 'Fagmiljø',
            },
            {
              url: '/sosialt',
              icon: 'social',
              image: {
                large: {
                  publicId: 'Backgrounds/bg-blue',
                  format: 'jpg',
                  x: 160,
                  y: 145,
                  width: 1280,
                  height: 560,
                },
              },
              title: 'Sosialt',
              description: 'I Miles er det sosiale miljøet like viktig som det faglige. Derfor samles vi minst én gang i måneden og finner på noe kjekt sammen.',
            },
          ],
          serviceItems: [
            {
              icon: 'projects',
              url: '/prosjektleveranser',
              description: 'IT-prosjekter levert av team bestående av konsulenter fra våre kontorer i Norge og India.',
              title: 'Prosjektleveranser',
            },
            {
              icon: 'services',
              url: '/konsulentutleie',
              description: 'IT-konsulentene våre jobber med systemutvikling, arkitektur, testledelse, agile coaching og prosjektledelse...',
              title: 'Salg av konsulenttjenester',
            },
            {
              icon: 'advisory',
              url: '/forretningsradgivning',
              description: 'Ekspertrådgivning og analyser fra enkeltkonsulenter eller team.',
              title: 'Forretningsrådgivning',
            },
            {
              icon: 'ux',
              url: '/ux',
              description: 'Brukeropplevelser som engasjerer, begeistrer, og hjelper deg å nå dine forretningsmål.',
              title: 'UX',
            },
          ],
          serviceBanner: {
            header: 'Hva \nvi gjør',
            link: {
              title: 'Kontakt oss',
              url: '/kontakt',
            },
            image: {
              sameImageAcrossDevices: true,
              large: {
                publicId: 'Backgrounds/atle_opvgim',
                format: 'jpg',
                x: 134,
                y: 7,
                width: 1280,
                height: 560,
              },
              small: {
                publicId: 'Backgrounds/atle_opvgim',
                format: 'jpg',
                x: 134,
                y: 7,
                width: 1280,
                height: 560,
              },
            },
          },
          metaDescription: '',
          componentData: {},
          hasUnpublishedChanges: false,
          publishedBy: 'magne.skutle@miles.no',
        },
        {
          site: 'no',
          isValid: false,
          isDisabled: false,
          isSubmitting: false,
          pageTitle: 'Forside',
          uri: '/',
          templateId: 'frontpage',
          lang: 'en',
          published: true,
          pageId: '409ac7a7-c5cc-4c2f-b5e3-7034ef4853b6',
          revision: 29,
          created: '2017-11-22T13:06:04.737Z',
          createdBy: 'caroline.gannefors@miles.no',
          banner: {
            header: 'Hei,\nvi er Miles!',
            link: {
              title: 'Jobbe med oss',
              url: '/jobb',
            },
            image: {
              sameImageAcrossDevices: true,
              large: {
                publicId: 'Backgrounds/forside01',
                format: 'jpg',
                x: 387,
                y: 312,
                width: 2315,
                height: 1013,
              },
              small: {
                publicId: 'Backgrounds/forside01',
                format: 'jpg',
                x: 387,
                y: 312,
                width: 2315,
                height: 1013,
              },
            },
          },
          publicationDetails: {
            published: '2018-01-03T14:42:39.531Z',
          },
          navigationItems: [
            {
              url: '/dna',
              icon: 'dna',
              image: {
                large: {
                  publicId: 'Backgrounds/bg-red-small',
                  format: 'jpg',
                  x: 80,
                  y: 60,
                  width: 640,
                  height: 280,
                },
              },
              title: 'Vårt DNA',
              description: 'Vår visjon er å være en fremragende arbeidsplass basert på verdiene faglig autoritet og varme.',
            },
            {
              url: '/menneskene',
              icon: 'people',
              image: {
                large: {
                  publicId: 'Backgrounds/menneskene',
                  format: 'jpg',
                  x: 543,
                  y: 0,
                  width: 914,
                  height: 400,
                },
              },
              title: 'Menneskene',
              description: 'Menneskene som jobber hos oss, er blant de fremste i bransjen og brenner for faget sitt.',
            },
            {
              url: '/fagmiljo',
              icon: 'academic',
              image: {
                large: {
                  publicId: 'Backgrounds/fagmiljo',
                  format: 'jpg',
                  x: 372,
                  y: 0,
                  width: 1143,
                  height: 500,
                },
              },
              description: 'Vi er stolte av å ha et godt fagmiljø med mange aktiviteter. Hos oss er veien kort til å dele kompetanse med kundene våre og med hverandre.',
              title: 'Fagmiljø',
            },
            {
              url: '/sosialt',
              icon: 'social',
              image: {
                large: {
                  publicId: 'Backgrounds/bg-blue',
                  format: 'jpg',
                  x: 160,
                  y: 145,
                  width: 1280,
                  height: 560,
                },
              },
              title: 'Sosialt',
              description: 'I Miles er det sosiale miljøet like viktig som det faglige. Derfor samles vi minst én gang i måneden og finner på noe kjekt sammen.',
            },
          ],
          serviceItems: [
            {
              icon: 'projects',
              url: '/prosjektleveranser',
              description: 'IT-prosjekter levert av team bestående av konsulenter fra våre kontorer i Norge og India.',
              title: 'Prosjektleveranser',
            },
            {
              icon: 'services',
              url: '/konsulentutleie',
              description: 'IT-konsulentene våre jobber med systemutvikling, arkitektur, testledelse, agile coaching og prosjektledelse...',
              title: 'Salg av konsulenttjenester',
            },
            {
              icon: 'advisory',
              url: '/forretningsradgivning',
              description: 'Ekspertrådgivning og analyser fra enkeltkonsulenter eller team.',
              title: 'Forretningsrådgivning',
            },
            {
              icon: 'ux',
              url: '/ux',
              description: 'Brukeropplevelser som engasjerer, begeistrer, og hjelper deg å nå dine forretningsmål.',
              title: 'UX',
            },
          ],
          serviceBanner: {
            header: 'Hva \nvi gjør',
            link: {
              title: 'Kontakt oss',
              url: '/kontakt',
            },
            image: {
              sameImageAcrossDevices: true,
              large: {
                publicId: 'Backgrounds/atle_opvgim',
                format: 'jpg',
                x: 134,
                y: 7,
                width: 1280,
                height: 560,
              },
              small: {
                publicId: 'Backgrounds/atle_opvgim',
                format: 'jpg',
                x: 134,
                y: 7,
                width: 1280,
                height: 560,
              },
            },
          },
          metaDescription: '',
          componentData: {},
          hasUnpublishedChanges: false,
          publishedBy: 'magne.skutle@miles.no',
        },
        {
          site: 'no',
          isValid: false,
          isDisabled: false,
          isSubmitting: false,
          pageTitle: 'Vårt superbra produkt selger bra',
          uri: '/',
          templateId: 'frontpage',
          lang: 'en',
          published: true,
          pageId: '409ac7a7-c5cc-4c2f-b5e3-7034ef4853b',
          revision: 29,
          created: '2017-11-22T13:06:04.737Z',
          createdBy: 'caroline.gannefors@miles.no',
          banner: {
            header: 'Hei,\nvi er Miles!',
            link: {
              title: 'Jobbe med oss',
              url: '/jobb',
            },
            image: {
              sameImageAcrossDevices: true,
              large: {
                publicId: 'Backgrounds/forside01',
                format: 'jpg',
                x: 387,
                y: 312,
                width: 2315,
                height: 1013,
              },
              small: {
                publicId: 'Backgrounds/forside01',
                format: 'jpg',
                x: 387,
                y: 312,
                width: 2315,
                height: 1013,
              },
            },
          },
          publicationDetails: {
            published: '2018-01-03T11:42:39.531Z',
          },
          navigationItems: [
            {
              url: '/dna',
              icon: 'dna',
              image: {
                large: {
                  publicId: 'Backgrounds/bg-red-small',
                  format: 'jpg',
                  x: 80,
                  y: 60,
                  width: 640,
                  height: 280,
                },
              },
              title: 'Vårt DNA',
              description: 'Vår visjon er å være en fremragende arbeidsplass basert på verdiene faglig autoritet og varme.',
            },
            {
              url: '/menneskene',
              icon: 'people',
              image: {
                large: {
                  publicId: 'Backgrounds/menneskene',
                  format: 'jpg',
                  x: 543,
                  y: 0,
                  width: 914,
                  height: 400,
                },
              },
              title: 'Menneskene',
              description: 'Menneskene som jobber hos oss, er blant de fremste i bransjen og brenner for faget sitt.',
            },
            {
              url: '/fagmiljo',
              icon: 'academic',
              image: {
                large: {
                  publicId: 'Backgrounds/fagmiljo',
                  format: 'jpg',
                  x: 372,
                  y: 0,
                  width: 1143,
                  height: 500,
                },
              },
              description: 'Vi er stolte av å ha et godt fagmiljø med mange aktiviteter. Hos oss er veien kort til å dele kompetanse med kundene våre og med hverandre.',
              title: 'Fagmiljø',
            },
            {
              url: '/sosialt',
              icon: 'social',
              image: {
                large: {
                  publicId: 'Backgrounds/bg-blue',
                  format: 'jpg',
                  x: 160,
                  y: 145,
                  width: 1280,
                  height: 560,
                },
              },
              title: 'Sosialt',
              description: 'I Miles er det sosiale miljøet like viktig som det faglige. Derfor samles vi minst én gang i måneden og finner på noe kjekt sammen.',
            },
          ],
          serviceItems: [
            {
              icon: 'projects',
              url: '/prosjektleveranser',
              description: 'IT-prosjekter levert av team bestående av konsulenter fra våre kontorer i Norge og India.',
              title: 'Prosjektleveranser',
            },
            {
              icon: 'services',
              url: '/konsulentutleie',
              description: 'IT-konsulentene våre jobber med systemutvikling, arkitektur, testledelse, agile coaching og prosjektledelse...',
              title: 'Salg av konsulenttjenester',
            },
            {
              icon: 'advisory',
              url: '/forretningsradgivning',
              description: 'Ekspertrådgivning og analyser fra enkeltkonsulenter eller team.',
              title: 'Forretningsrådgivning',
            },
            {
              icon: 'ux',
              url: '/ux',
              description: 'Brukeropplevelser som engasjerer, begeistrer, og hjelper deg å nå dine forretningsmål.',
              title: 'UX',
            },
          ],
          serviceBanner: {
            header: 'Hva \nvi gjør',
            link: {
              title: 'Kontakt oss',
              url: '/kontakt',
            },
            image: {
              sameImageAcrossDevices: true,
              large: {
                publicId: 'Backgrounds/atle_opvgim',
                format: 'jpg',
                x: 134,
                y: 7,
                width: 1280,
                height: 560,
              },
              small: {
                publicId: 'Backgrounds/atle_opvgim',
                format: 'jpg',
                x: 134,
                y: 7,
                width: 1280,
                height: 560,
              },
            },
          },
          metaDescription: '',
          componentData: {},
          hasUnpublishedChanges: true,
          publishedBy: 'magne.skutle@miles.no',
        },
      ],
    };
  }

  render() {
    return (
      <div className="admin-pagelist__wrapper">
        {
          this.state.pages.map((page) => {
            return (
              <PageListItem
                key={page.pageId}
                page={page}
                iconSize="small"
                onItemClick={() => { return handleItemClick(page); }}
              />);
          })
        }
      </div>
    );
  }
}

PageList.contextTypes = {
  lang: PropTypes.string,
  config: PropTypes.object,
  adminConfig: PropTypes.object,
};

