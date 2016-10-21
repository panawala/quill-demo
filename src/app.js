import 'babel-polyfill';
import $ from 'webpack-zepto';
import Quill from './custom-quill'

require('./assets/go-editor.css');
require('./assets/quill.core.css');


var options = {
    modules: {
        toolbar: [
            [{'font': []}, {'size': []}],
            ['bold', 'italic', 'underline', 'strike'],
            [{'color': []}, {'background': []}],
            [{'script': 'super'}, {'script': 'sub'}],
            [{'header': '1'}, {'header': '2'}, 'blockquote', 'code-block'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            [{'align': []}],
            ['link', 'image', 'video'],
            ['clean']
        ]
    },
    placeholder: '请输入攻略 ...',
    // debug: 'info'
    theme: 'snow' // or 'bubble'
};
let quill = new Quill('#editor-container', options);

var toolbar = quill.getModule('toolbar');
toolbar.addHandler('image', function (value) {
    console.log('value');
    console.log(value);

    // let range = this.quill.getSelection(true);
    // this.quill.insertText(range.index, '\n', Quill.sources.USER);
    // this.quill.insertEmbed(range.index + 1, 'myimage', {
    //     alt: 'Quill Cloud',
    //     url: 'http://7tszlo.com1.z0.glb.clouddn.com/28f6f382-5c68-11e5-afc1-00163e002e64.png'
    // }, Quill.sources.USER);
    // this.quill.setSelection(range.index + 2, Quill.sources.SILENT);

    let fileInput = this.quill.container.querySelector('input.ql-image[type=file]');
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
                    // reader.readAsDataURL(file);
                    reader.readAsBinaryString(file);
                    reader.onload = function(e){
                        console.log(e.target.result);
                    };
                })
            }
        });
        this.quill.container.appendChild(fileInput);
    }
    fileInput.click();
});

toolbar.addHandler('link', function (value) {
    console.log(value);
    let range = this.quill.getSelection(true);
    this.quill.insertText(range.index, '\n', Quill.sources.USER);

    let url = 'https://v.qq.com/iframe/player.html?vid=u0330jo858m&auto=0';
    this.quill.insertEmbed(range.index + 1, 'vqq-video', url, Quill.sources.USER);
    // quill.formatText(range.index + 1, 1, { height: '170', width: '400' });

    // this.quill.insertEmbed(range.index + 1, 'feed', 11, Quill.sources.USER);
    this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
});
