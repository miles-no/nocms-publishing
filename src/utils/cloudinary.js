import { Cloudinary } from 'cloudinary-core';
// @TODO: Image breakpoints should be in config
const url = (publicId, cloudName, options) => {
  const cl = Cloudinary.new();
  cl.config({
    cloud_name: cloudName,
    secure: true,
  });

  return cl.url(publicId, options);
};

const getImageOptions = (transformation, imageOptions, aspectRatio) => {
  return Object.assign({}, transformation, {
    x: imageOptions.x,
    y: imageOptions.y,
    radius: imageOptions.radius,
    gravity: imageOptions.gravity,
    width: imageOptions.width,
    aspect_ratio: `${aspectRatio.width}:${aspectRatio.height}`,
  });
};

const getImageUrl = (cloudName, transformation, image, aspectRatio) => {
  const options = getImageOptions(transformation, image.large, aspectRatio);
  return url(image.large.publicId, cloudName, options);
};

const responsiveUrl = (cloudName, transformation, image, aspectRatio) => {
  let cloudinaryUrl = '';
  let options = {};
  const transformations = [];
  const innerWidth = window.innerWidth;
  if (innerWidth > 700) {
    options = getImageOptions(transformation, image.large, aspectRatio.large);
    cloudinaryUrl = url(image.large.publicId, cloudName, options);
  } else {
    options = getImageOptions(transformation, image.small, aspectRatio.small);
    transformations.push(options, { width: 1400, crop: 'lfill' });
    cloudinaryUrl = url(image.small.publicId, cloudName, { transformation: transformations });
  }
  return cloudinaryUrl;
};

const getResponsiveImgBg = (cloudName, transformation, image, aspectRatio) => {
  let imgBgUrl;
  if (Object.keys(image).length === 0) {
    imgBgUrl = { backgroundImage: 'url(/assets/img/dummy.jpg)' };
  } else if (typeof window !== 'undefined') {
    const cloudinaryUrl = responsiveUrl(cloudName, transformation, image, aspectRatio);
    imgBgUrl = { backgroundImage: `url(${cloudinaryUrl})` };
  }
  return imgBgUrl;
};

const getResponsiveImgUrl = (cloudName, transformation, image, aspectRatio) => {
  let imgUrl;
  if (Object.keys(image).length === 0) {
    imgUrl = '/assets/img/dummy.jpg';
  } else if (typeof window !== 'undefined') {
    imgUrl = responsiveUrl(cloudName, transformation, image, aspectRatio);
  }
  return imgUrl;
};

export default {
  url,
  getImageUrl,
  getImageOptions,
  getResponsiveImgBg,
  getResponsiveImgUrl,
};
