import { Node } from '@tiptap/core';

export const CustomDiv = Node.create({
  name: 'customDiv',

  group: 'block',

  content: 'block+', // Allows any block-level content as children

  parseHTML() {
    return [
      {
        tag: 'div[data-type="custom-div"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'custom-div', ...HTMLAttributes }, 0];
  },

 
});
