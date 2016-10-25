// import Parchment from 'parchment';

import Quill from 'quill';
// import Parchment from 'parchment';
// 卧槽。上面不行。。Parchment库是含有状态的
let Parchment = Quill.import("parchment");


let goConfig = {
    scope: Parchment.Scope.BLOCK,
    whitelist: ['h1', 'h2', 'quote', 'bold', 'body', 'center', 'red']
};
let GoFormatClass = new Parchment.Attributor.Class('go', 'go', goConfig);

export { GoFormatClass };