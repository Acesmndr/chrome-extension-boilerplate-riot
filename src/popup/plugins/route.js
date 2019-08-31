import { mount, unmount } from 'riot';

export default function(component) {
  component.route = (page, options = {}) => {
    unmount(document.getElementById('root'), true);
    mount(document.getElementById('root'), options, page);
  };

  return component;
}