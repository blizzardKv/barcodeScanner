// experimental
const BARCODE_SCANNER_INPUT_DELAY = 20;
const BARCODE_SCAN_EVENT_NAME = 'onBarcodeScan';

const defaultProps = {
  barcodeLength: 14,
};

export default class BarcodeScanner {
  constructor(props) {
    this.props = {
      ...defaultProps,
      ...props,
    };
  }

  initialize() {
    this.timeoutHandler = 0;
    this.inputString = '';

    this.onBarcodeScannerKeyPress = this.onBarcodeScannerKeyPress.bind(this);

    document.addEventListener('keypress', this.onBarcodeScannerKeyPress);

    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
    }

    this.timeoutHandler = setTimeout(() => {
      this.inputString = '';
    }, BARCODE_SCANNER_INPUT_DELAY);
  }

  unmount() {
    document.removeEventListener('keypress', this.onBarcodeScannerKeyPress);
  }

  onBarcodeScannerKeyPress(e) {
    // не триггерим enter с keypress
    e.preventDefault();

    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
      this.inputString += String.fromCharCode(e.keyCode);
    }

    this.timeoutHandler = setTimeout(() => {
      const { barcodeLength } = this;
      if (this.inputString.length < barcodeLength) {
        this.inputString = '';
        return;
      }

      const event = new CustomEvent(BARCODE_SCAN_EVENT_NAME, { detail: { barcode: this.inputString } });
      document.dispatchEvent(event);

      this.inputString = '';
    }, BARCODE_SCANNER_INPUT_DELAY);
  }
}

window.BarcodeScanner = BarcodeScanner;
