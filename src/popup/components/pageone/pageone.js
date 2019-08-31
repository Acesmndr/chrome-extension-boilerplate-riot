import { sendMessage } from '../../../chrome/chrome-utils';

export default {
  goToSecondPage() {
    this.route('pagetwo', {});
  },
  getAjaxDataFromBackground() {
    sendMessage({ type: 'sendAjaxRequest' });
  },
  onMounted() {
    console.log("First page has been mounted");
  },
};
