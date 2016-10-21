import 'babel-polyfill';
import $ from 'webpack-zepto';
import Quill from 'quill'

require('./assets/go-editor.css');
// require('./assets/quill.core.css');


var options = {
    modules: {
        toolbar: [
            [{'font': []}, {'size': []}],
            ['bold', 'italic', 'underline', 'strike'],
            [{'color': []}, {'background': []}],
            [{'script': 'super'}, {'script': 'sub'}],
            [{'header': '1'}, {'header': '2'}, 'blockquote', 'code-block'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['direction', {'align': []}],
            ['link', 'image', 'video', 'formula'],
            ['clean']
        ]
    },
    placeholder: '请输入攻略 ...',
    // debug: 'info'
    theme: 'snow' // or 'bubble'
};
let quill = new Quill('#editor-container', options);

var toggleQlBlank = function () {
    let initContent = quill.getContents();
    if (initContent.ops.length == 1 && initContent.ops[0].insert == '\n') {
        quill.format('go', 'body', Quill.sources.USER);
        quill.root.classList.add('ql-blank');
    }
};

// toggleQlBlank();

quill.on('editor-change', function (eventName, ...args) {
    console.log(eventName);
    console.log(JSON.stringify(args));
    if (eventName === 'text-change') {
        // args[0] will be delta
        // console.log(JSON.stringify(args));
        toggleQlBlank();
    }
});


$('#h1-button').click(function () {
    quill.format('go', 'h1', Quill.sources.USER);
});
$('#h2-button').click(function () {
    quill.format('go', 'h2', Quill.sources.USER);
});
$('#body-button').click(function () {
    quill.format('go', 'body', Quill.sources.USER);
});
$('#bold-button').click(function () {
    quill.format('go', 'bold', Quill.sources.USER);
});
$('#quote-button').click(function () {
    quill.format('go', 'quote', Quill.sources.USER);
});
$('#center-button').click(function () {
    quill.format('go', 'center', Quill.sources.USER);
});
$('#red-button').click(function () {
    quill.format('go', 'red', Quill.sources.USER);
});


$('#img-button').click(function () {
    console.log('sdfasdfasdf');
    let range = quill.getSelection(true);

    // let initContent = quill.getContents();
    // if (initContent.ops.length == 1 && initContent.ops[0].insert == '\n') {
    // }

    console.log(JSON.stringify(range));
    quill.insertText(range.index, '\n', Quill.sources.USER);
    quill.insertEmbed(range.index + 1, 'myimage', {
        alt: 'Quill Cloud',
        url: 'http://7tszlo.com1.z0.glb.clouddn.com/28f6f382-5c68-11e5-afc1-00163e002e64.png'
    }, Quill.sources.USER);
    // 上面Quill.sources.API例子中为Quill.sources.USER(尚不清晰为啥会报错)
    // 因为quill 1.1.0 有bug.. modify.call
    quill.setSelection(range.index + 2, Quill.sources.SILENT);
});
