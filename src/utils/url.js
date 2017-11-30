import uuid from 'uuid';

export default {
  forComponent: (componentType) => {
    const id = uuid.v4();
    return `https://nocms/${componentType}/${id}`;
  },
};
