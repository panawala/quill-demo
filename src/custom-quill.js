// import Quill from 'quill';
import Quill from 'quill'

import { GoFormatClass } from './custom-quill-format-class';
import { ImageBlot } from './custom-quill-embed';

Quill.register({
    'formats/go': GoFormatClass
}, true);
Quill.register(ImageBlot);

module.exports = Quill;