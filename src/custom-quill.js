// import Quill from 'quill';
import Quill from 'quill'

import { GoFormatClass, GoColorStyle } from './custom-quill-format-class';
import { ImageBlot, FeedBlot, VqqVideoBlot } from './custom-quill-embed';

Quill.register({
    'formats/go': GoFormatClass,
    'formats/go-color': GoColorStyle
}, true);
Quill.register(ImageBlot);
Quill.register(FeedBlot);
Quill.register(VqqVideoBlot);

module.exports = Quill;