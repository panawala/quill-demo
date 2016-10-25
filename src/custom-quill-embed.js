import Quill from 'quill';

let BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {
    static create(value) {
        let node = super.create();
        node.setAttribute('alt', value.alt);
        node.setAttribute('src', value.url);
        return node;
    }

    static value(node) {
        return {
            alt: node.getAttribute('alt'),
            url: node.getAttribute('src')
        };
    }
}
ImageBlot.blotName = 'myimage';
ImageBlot.tagName = 'img';


var generateFeedHtml = function(feedInfo){
    var feedId = feedInfo.id;
    var feedCover = feedInfo.covers[0].url.replace('-owebp', '') + '?imageMogr2/auto-orient/thumbnail/100x100!';
    var feedTitle = feedInfo.tiny_title ? feedInfo.tiny_title : feedInfo.title;
    // var feedAddress = feedInfo.addresses[0].name + '·' + feedInfo.time;
    var feedAddress = feedInfo.addresses[0].name;

    var feedHtml =
        '<a style="text-decoration: none;" id="feed-' + feedId + '" href="letsgo://v1/feeds/' + feedId + '" class="feed close-wrapper" contenteditable="false">\n' +
        '   <img class="feed-cover" src="' + feedCover + '">\n' +
        '   <div class="feed-info">\n' +
        '       <div class="feed-title">' + feedTitle + '</div>\n' +
        '       <div class="feed-address">' + feedAddress + '</div>\n' +
        '   </div>\n' +
        '   <div class="close right-top"></div>' +
        '</a>\n';
    return feedHtml;
};

class FeedBlot extends BlockEmbed {
    static create(feedInfo) {
        let node = super.create();
        node.dataset.id = feedInfo.id;
        node.innerHTML = generateFeedHtml(feedInfo);
        return node;
    }

    static value(domNode) {
        return domNode.dataset.id;
    }
}
FeedBlot.blotName = 'feed';
FeedBlot.tagName = 'div';
FeedBlot.className = 'feed';


class VqqVideoBlot extends BlockEmbed {
    static create(url) {
        let node = super.create();
        // Set non-format related attributes with static values
        node.setAttribute('frameborder', '0');
        node.setAttribute('allowfullscreen', true);
        node.setAttribute('scrolling', 'no');
        node.setAttribute('src', url);
        node.setAttribute('style', 'min-width: 100%; width: 100px;*width: 100%;text-align:center;margin 0 auto;height:290px;');

        return node;
    }

    static formats(node) {
        // We still need to report unregistered embed formats
        let format = {};
        if (node.hasAttribute('height')) {
            format.height = node.getAttribute('height');
        }
        if (node.hasAttribute('width')) {
            format.width = node.getAttribute('width');
        }
        return format;
    }

    static value(node) {
        return node.getAttribute('src');
    }

    format(name, value) {
        // Handle unregistered embed formats
        if (name === 'height' || name === 'width') {
            if (value) {
                this.domNode.setAttribute(name, value);
            } else {
                this.domNode.removeAttribute(name, value);
            }
        } else {
            super.format(name, value);
        }
    }
}
VqqVideoBlot.blotName = 'vqq-video';
VqqVideoBlot.tagName = 'iframe';


let Block = Quill.import('blots/block');

class GoTextBlot extends Block { }
GoTextBlot.blotName = 'go-text';
GoTextBlot.tagName = 'p';


export { ImageBlot, FeedBlot, VqqVideoBlot, GoTextBlot };
