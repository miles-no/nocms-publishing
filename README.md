# NoCMS publishing

Publishing interface for NoCMS. 

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Dependency Status](https://david-dm.org/miles-no/nocms-publishing.svg)](https://david-dm.org/miles-no/nocms-publishing)
[![devDependencies](https://david-dm.org/miles-no/nocms-publishing/dev-status.svg)](https://david-dm.org/miles-no/nocms-publishing?type=dev)

## Installation

```
npm i nocms-publishing
```

## Features
  - AdminContent: Provide the menu on the right hand side. Most likely not used directly, but by nocms-server.
  - EditableArea: An editable area with the provided fields wrapped in an edit menu used by templates.
  - EditableComponentWrapper: A list of editable components used by templates.
  - EditImage: An image selector where you can pick responsive images, crop, zoom, add alt text, caption and attribution. Used by templates.
  - EditPdf: Pfd selector, used by templates.
  - EditSimpleImage: Select an image, used by templates

## Usage

### EditableArea
Example with Editable Area. editMode is a bool indicating editMode (the menu is open), but not necessarily activeEditMode (the group of input fields are in active edit state, e.g shown as input fields and with edit menu). EditableArea adds the activeEditMode bool, so it can be used by (in this example) ReactComponent.jsx.

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { EditableArea } from 'nocms-publishing';
import ReactComponent from '../components/ReactComponent.jsx';

const EditableAreaDemo = (props, context) => {
  const { content } = props;
  const { editMode} = context;
  const information = <ReactComponent scope="content.information" data={content.information} />;

  return (
    {editMode ?
      <EditableArea scope="content.information" label="Praktisk informasjon">{information}</EditableArea>
      : information}
  )
};

EditableAreaDemo.propTypes = {
  content: PropTypes.object,
};

EditableAreaDemo.defaultProps = {
  content: {},
};

EditableAreaDemo.contextTypes = {
  editMode: PropTypes.bool,
  lang: PropTypes.string,
};

export default EditableAreaDemo;
```

### EditImage
Example with EditImage. The example is very simplified. Most likely, you will need some logic to handle displaying different images according to viewport size or some strategy to avoid image "jumping".

The component itself is responsible for displaying the image when in not edit mode. See [`https://github.com/miles-no/nocms-cloudinary-utils`](nocms-cloudinary-utils) for helpers. Run the example for more options for the image dialog.

```jsx
import React, { Fragment } from 'react';
import { EditImage } from 'nocms-publishing';
import cloudinary from 'nocms-cloudinary-utils';

const aspectRatio = {
  large: {
    width: 5,
    height: 4,
  },
  small: {
    width: 2,
    height: 3,
  },
};
const ImageDemo = (props, context) => {
  const { activeEditMode, data, scope } = this.props;
  const { config, editMode } = this.context;
  const image = data.image || {};
  const transformation = {
    // for available options, see Clodinary docs
    quality: 'auto:eco',
    fetch_format: 'auto',
    use_root_path: true,
    crop: 'crop',
  };
  let src = cloudinary.getImageUrl(config.cloudinaryCloudName, transformation, image, aspectRatio.large);

  return (
    <Fragment>
      {editMode ?
        <EditImage
          scope={`${scope}.image`}
          data={image}
          activeEditMode={activeEditMode}
          targetDevices
          aspectRatio={aspectRatio}
          disableCaption
        />
      : null }
      {src}
    </Fragment>
  )
};
```
## Run the example
The example can be useful for more examples and demo. As a standalone example, most site interaction will fail in lack of a real web server, page and message api.

```
git clone https://github.com/miles-no/nocms-publishing.git
cd nocms-publishing
npm i
npm run dev
```

In another terminal window for images
```
npm run dev:backend
```

Go to http://localhost:9000/

## Commit message format and publishing

This repository is published using `semantic-release`, with the default [AngularJS Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit).
