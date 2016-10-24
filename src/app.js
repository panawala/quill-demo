import 'babel-polyfill';
import $ from 'webpack-zepto';
import Quill from './custom-quill'

require('./assets/go-editor.css');
require('./assets/quill.core.css');


var options = {
    // modules: {
    //     toolbar: [
    //         [{'font': []}, {'size': []}],
    //         ['bold', 'italic', 'underline', 'strike'],
    //         [{'color': []}, {'background': []}],
    //         [{'script': 'super'}, {'script': 'sub'}],
    //         [{'header': '1'}, {'header': '2'}, 'blockquote', 'code-block'],
    //         [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    //         [{'align': []}],
    //         ['link', 'image', 'video'],
    //         ['clean']
    //     ]
    // },
    placeholder: '请输入攻略 ...'
    // debug: 'info'
    // theme: 'snow' // or 'bubble'
};
let quill = new Quill('#editor-container', options);

// quill.on('editor-change', function(eventName, ...args) {
//     if (eventName === 'text-change') {
//         console.log('text-change');
//     } else if (eventName === 'selection-change') {
//         console.log('selection-change');
//
//         let range = quill.getSelection(true);
//         let formats = range == null ? {} : this.quill.getFormat(range);
//         console.log(formats);
//         console.log(JSON.stringify(formats));
//     }
// });

let toolbars = [{
    name: 'header',
    value: 1,
    selector: '#h1-button'
}, {
    name: 'header',
    value: 2,
    selector: '#h2-button'
}, {
    name: 'bold',
    value: true,
    selector: '#bold-button'
}, {
    name: 'blockquote',
    value: true,
    selector: '#quote-button'
}, {
    name: 'underline',
    value: true,
    selector: '#underline-button'
}, {
    name: 'italic',
    value: true,
    selector: '#italic-button'
}, {
    name: 'go',
    value: 'center',
    selector: '#center-button'
}];

quill.on(Quill.events.EDITOR_CHANGE, (type, range) => {
    if (type === Quill.events.SELECTION_CHANGE) {
        let formats = range == null ? {} : quill.getFormat(range);
        console.log(formats);
        toolbars.forEach((toolbar) => {
            if(formats[toolbar.name] == toolbar.value) {
               $(toolbar.selector).addClass('active')
            } else {
                $(toolbar.selector).removeClass('active')
            }
        });
    }
});

//

$('#h1-button').click(function () {
    quill.format('header', 1, Quill.sources.USER);
});
$('#h2-button').click(function () {
    quill.format('header', 2, Quill.sources.USER);
});
$('#body-button').click(function () {
    let range = quill.getSelection(true);
    if (range) {
        console.log('quill.removeFormat(range.index, range.length);');
        quill.removeFormat(range.index, range.length);
    }
});
$('#bold-button').click(function () {
    quill.format('bold', true, Quill.sources.USER);
});
$('#quote-button').click(function () {
    quill.format('blockquote', true, Quill.sources.USER);
});
$('#underline-button').click(function () {
    quill.format('underline', true, Quill.sources.USER);
});
$('#italic-button').click(function () {
    quill.format('italic', true, Quill.sources.USER);
});

$('#center-button').click(function () {
    quill.format('go', 'center', Quill.sources.USER);
});
$('#img-button').click(function () {
    let fileInput = document.body.querySelector('input.ql-image[type=file]');
    if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/*');
        fileInput.setAttribute('multiple', 'multiple');
        fileInput.classList.add('ql-image');
        fileInput.addEventListener('change', () => {
            if (fileInput.files != null && fileInput.files.length > 0) {
                Array.prototype.forEach.call(fileInput.files, (file) => {
                    var reader = new FileReader();
                    reader.readAsBinaryString(file);
                    reader.onload = function(e){
                        console.log(e.target.result);

                        let range = quill.getSelection(true);
                        quill.insertText(range.index, '\n', Quill.sources.USER);
                        quill.insertEmbed(range.index + 1, 'myimage', {
                            alt: 'Quill Cloud',
                            url: 'http://7tszlo.com1.z0.glb.clouddn.com/28f6f382-5c68-11e5-afc1-00163e002e64.png'
                        }, Quill.sources.USER);
                        quill.setSelection(range.index + 2, Quill.sources.SILENT);

                    };
                })
            }
        });
        document.body.appendChild(fileInput);
    }
    fileInput.click();
});


$('#video-button').click(function () {

    var url = "";
    url = prompt("插入腾讯视频网址", url);
    if(!url){
        return;
    }
    var tvqqRegex = /^http:\/\/v\.qq\.com\/(\S*)\/(\S+)\.html$/;
    var tvqqMatch = tvqqRegex.exec(url);
    if(!tvqqMatch) {
        alert('请输入正确的腾讯视频网址');
        return;
    }
    var tvqqVid = tvqqMatch[2];
    var qqUrl = "https://v.qq.com/iframe/player.html?vid=" + tvqqVid + "&auto=0";

    let range = quill.getSelection(true);
    quill.insertText(range.index, '\n', Quill.sources.USER);
    quill.insertEmbed(range.index + 1, 'vqq-video', qqUrl, Quill.sources.USER);
    quill.setSelection(range.index + 2, Quill.sources.SILENT);
});

$('#feed-button').click(function () {

    var feedId = "";
    feedId = prompt("插入feedId", feedId);
    if(!feedId){
        return;
    }

    setTimeout(()=> {
        var feedInfo = {
            id: feedId,
            covers:[{url:'http://7tszlo.com1.z0.glb.clouddn.com/47d68b8e-4efa-11e6-847a-00163e002e64.jpg'}],
            addresses:[{name:'上海东方艺术中心'}],
            title: '天空之城 | 久石让&宫崎骏经典动漫作品视听音乐会',
            time: '3天后结束'
        };

        let range = quill.getSelection(true);
        quill.insertText(range.index, '\n', Quill.sources.USER);
        quill.insertEmbed(range.index + 1, 'feed', feedInfo, Quill.sources.USER);
        quill.setSelection(range.index + 2, Quill.sources.SILENT);
    }, 1000);
});

// $('#red-button').click(function () {
//     quill.format('go', 'red', Quill.sources.USER);
// });


// var toolbar = quill.getModule('toolbar');
//
// var selectionFormat = null;
//
// toolbar.addHandler('code-block', function (value) {
//     console.log('value');
//     console.log(value);
//
//     let range = this.quill.getSelection(true);
//     let formats = this.quill.getFormat(range);
//     console.log(formats);
//     console.log(JSON.stringify(formats));
//     selectionFormat = formats
// });
//
// toolbar.addHandler('clean1', function (value) {
//     console.log('value');
//     console.log(value);
//
//     let range = this.quill.getSelection(true);
//     let formats = this.quill.formatText(range.index, range.length, selectionFormat);
//     selectionFormat = null;
// });
//

//
// toolbar.addHandler('video', function (value) {
//     console.log(value);
//
//     var url = "";
//     url = prompt("插入腾讯视频网址", url);
//     if(!url){
//         return;
//     }
//     var tvqqRegex = /^http:\/\/v\.qq\.com\/(\S*)\/(\S+)\.html$/;
//     var tvqqMatch = tvqqRegex.exec(url);
//     if(!tvqqMatch) {
//         alert('请输入正确的腾讯视频网址');
//         return;
//     }
//     var tvqqVid = tvqqMatch[2];
//     var qqUrl = "https://v.qq.com/iframe/player.html?vid=" + tvqqVid + "&auto=0";
//
//     let range = this.quill.getSelection(true);
//     this.quill.insertText(range.index, '\n', Quill.sources.USER);
//     this.quill.insertEmbed(range.index + 1, 'vqq-video', qqUrl, Quill.sources.USER);
//     this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
// });
//
// toolbar.addHandler('link', function (value) {
//     console.log(value);
//
//     var feedId = "";
//     feedId = prompt("插入feedId", feedId);
//     if(!feedId){
//         return;
//     }
//
//     setTimeout(()=> {
//         var feedInfo = {
//             id: feedId,
//             covers:[{url:'http://7tszlo.com1.z0.glb.clouddn.com/47d68b8e-4efa-11e6-847a-00163e002e64.jpg'}],
//             addresses:[{name:'上海东方艺术中心'}],
//             title: '天空之城 | 久石让&宫崎骏经典动漫作品视听音乐会',
//             time: '3天后结束'
//         };
//
//         let range = this.quill.getSelection(true);
//         this.quill.insertText(range.index, '\n', Quill.sources.USER);
//         this.quill.insertEmbed(range.index + 1, 'feed', feedInfo, Quill.sources.USER);
//         this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
//     }, 1000);
//
// });
//
// toolbar.addHandler('clean', function (value) {
//     console.log(value);
//     this.quill.format('go-color', 'rgb(255,255,255)');
// });
