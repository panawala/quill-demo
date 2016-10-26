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
    name: 'italic',
    value: true,
    selector: '#italic-button'
}, {
    name: 'underline',
    value: true,
    selector: '#underline-button'
}, {
    name: 'strike',
    value: true,
    selector: '#del-button'
}, {
    name: 'list',
    value: 'bullet',
    selector: '#list-dot-button'
}, {
    name: 'list',
    value: 'ordered',
    selector: '#list-num-button'
}, {
    name: 'go',
    value: 'red',
    selector: '#go-red-button'
}];

var selectionFormat = null;
quill.on(Quill.events.EDITOR_CHANGE, (type, range) => {
    if (type === Quill.events.SELECTION_CHANGE) {
        let formats = range == null ? {} : quill.getFormat(range);

        console.log(JSON.stringify(range));
        console.log(JSON.stringify(formats));
        // 使用刷子
        if (range && range.length > 0 && selectionFormat) {
            if (Object.keys(selectionFormat).length == 0) {
                let selectionRange = quill.getSelection(true);
                if (selectionRange) {
                    quill.removeFormat(selectionRange.index, selectionRange.length);
                    quill.format('go-text', true);
                }
                return
            }

            Object.keys(selectionFormat).forEach((formatKey) => {
                quill.format(formatKey, selectionFormat[formatKey], Quill.sources.API);
            });
        }

        // 对于工具栏中的刷子 按钮,单独处理
        if (selectionFormat) {
            $('#brush-button').addClass('active');
        } else {
            $('#brush-button').removeClass('active');
        }

        // 设置选中range后, 工具栏的样式变化
        toolbars.forEach((toolbar) => {
            if (formats[toolbar.name] == toolbar.value) {
                $(toolbar.selector).addClass('active')
            } else {
                $(toolbar.selector).removeClass('active')
            }
        });
    }
});

var toggleFormat = function (formatName, formatValue) {
     if(quill.getFormat()[formatName] == formatValue){
        quill.format(formatName, false, Quill.sources.USER);
    } else {
        quill.format(formatName, formatValue, Quill.sources.USER);
    }
};

$('#h1-button').click(function () {
    toggleFormat('header', 1)
});

$('#h2-button').click(function () {
    toggleFormat('header', 2)
});

$('#body-button').click(function () {
    let range = quill.getSelection(true);
    if (range) {
        quill.removeFormat(range.index, range.length);
        quill.format('go-text', true);
    }
});

$('#bold-button').click(function () {
    toggleFormat('bold', true);
});

$('#quote-button').click(function () {
    toggleFormat('blockquote', true);
});

$('#underline-button').click(function () {
    toggleFormat('underline', true);
});

$('#italic-button').click(function () {
    toggleFormat('italic', true);
});


$('#list-num-button').click(function () {
    toggleFormat('list', 'ordered');
});

$('#list-dot-button').click(function () {
    toggleFormat('list', 'bullet');
});

$('#del-button').click(function () {
    toggleFormat('strike', true);
});


$('#brush-button').click(function () {
    if (selectionFormat) {
        selectionFormat = null;
    } else {
        let range = quill.getSelection(true);
        if (range) {
            selectionFormat = quill.getFormat(range.index, range.length);
            document.body.style.cursor = 'pointer'
        }
    }
});

$('#color-button').change(function () {
    console.log($('#color-button').val());
    let selectedColor = $('#color-button').val();
    if (selectedColor) {
        quill.format('go-color', selectedColor, Quill.sources.USER);
    } else {
        quill.format('go-color', false, Quill.sources.USER);
    }
});

$('#align-button').change(function () {
    let selectedAlign = $('#align-button').val();
    console.log(selectedAlign);
    if (selectedAlign) {
        quill.format('go-align', selectedAlign, Quill.sources.USER);
    } else {
        quill.format('go-align', false, Quill.sources.USER);
    }
});

$('#img-button').click(function () {
    let fileInput = document.body.querySelector('input.ql-image[type=file]');
    if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/*');
        fileInput.setAttribute('multiple', 'multiple');
        fileInput.classList.add('ql-image');
        let index = 1
        fileInput.addEventListener('change', () => {
            if (fileInput.files != null && fileInput.files.length > 0) {
                Array.prototype.forEach.call(fileInput.files, (file) => {
                    var reader = new FileReader();
                    reader.readAsBinaryString(file);
                    reader.onload = function (e) {
                        console.log(e.target.result);

                        let range = quill.getSelection(true);
                        quill.insertText(range.index, '\n', Quill.sources.USER);
                        quill.insertEmbed(range.index + 1, 'myimage', {
                            alt: 'Quill Cloud' + index++,
                            url: 'http://7tszlo.com1.z0.glb.clouddn.com/28f6f382-5c68-11e5-afc1-00163e002e64.png'
                        }, Quill.sources.USER);
                        quill.setSelection(range.index + 2, Quill.sources.SILENT);
                        
                        var container = document.getElementsByClassName(".ql-editor");
                        var sort = Sortable.create(container, {
                            animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
                            handle: "img", // Restricts sort start click/touch to the specified element
                            draggable: "img" // Specifies which items inside the element should be sortable
                        });

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
    if (!url) {
        return;
    }
    var tvqqRegex = /^http:\/\/v\.qq\.com\/(\S*)\/(\S+)\.html$/;
    var tvqqMatch = tvqqRegex.exec(url);
    if (!tvqqMatch) {
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
    if (!feedId) {
        return;
    }

    setTimeout(()=> {
        var feedInfo = {
            id: feedId,
            covers: [{url: 'http://7tszlo.com1.z0.glb.clouddn.com/47d68b8e-4efa-11e6-847a-00163e002e64.jpg'}],
            addresses: [{name: '上海东方艺术中心'}],
            title: '天空之城 | 久石让&宫崎骏经典动漫作品视听音乐会',
            time: '3天后结束'
        };

        let range = quill.getSelection(true);
        quill.insertText(range.index, '\n', Quill.sources.USER);
        quill.insertEmbed(range.index + 1, 'feed', feedInfo, Quill.sources.USER);
        quill.setSelection(range.index + 2, Quill.sources.SILENT);
    }, 1000);
});

