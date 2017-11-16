import uuid from 'uuid';

module.exports = {
  forComponent: (componentType) => {
    const id = uuid.v4();
    return `https://nocms/${componentType}/${id}`;
  },
};
