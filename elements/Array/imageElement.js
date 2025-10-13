// elements/imageElement.js
export const imageElements = [
  {
    name: 'Placeholder Image',
    tag: 'img',
    attributes: {
      src: 'https://via.placeholder.com/150',
      alt: 'Placeholder Image',
    },
    styles: {
      width: '150px',
      height: '150px',
      borderRadius: '8px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Rounded Image',
    tag: 'img',
    attributes: {
      src: 'https://via.placeholder.com/100',
      alt: 'Rounded Image',
    },
    styles: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
  },
];