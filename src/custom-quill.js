// import Quill from 'quill';
import Quill from 'quill'

import { GoFormatClass} from './custom-quill-format-class';
import { GoColorStyle, GoAlignStyle } from './custom-quill-format-style';
import { ImageBlot, FeedBlot, VqqVideoBlot, GoTextBlot } from './custom-quill-embed';

Quill.register({
    'formats/go': GoFormatClass,
    'formats/go-color': GoColorStyle,
    'formats/go-align': GoAlignStyle
}, true);

Quill.register(ImageBlot);
Quill.register(FeedBlot);
Quill.register(VqqVideoBlot);
Quill.register(GoTextBlot);

module.exports = Quill;