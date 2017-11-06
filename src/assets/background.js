/*
  Responsible for dealing with event listners
*/
import * as Main from './main';

chrome.extension.onMessage.addListener((request) => {
  switch (request.type) {
    case 'getDataFromBackground':
      Main.getData();
      break;
    case 'updateTaskInTimer':
      Main.updateTaskInTimer(request.body);
      break;
    default:
  }
});
