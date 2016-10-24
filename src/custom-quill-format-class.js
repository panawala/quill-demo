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

class GoColorAttributor extends Parchment.Attributor.Style {
    value(domNode) {
        let value = super.value(domNode);
        if (!value.startsWith('rgb(')) return value;
        value = value.replace(/^[^\d]+/, '').replace(/[^\d]+$/, '');
        return '#' + value.split(',').map(function(component) {
                return ('00' + parseInt(component).toString(16)).slice(-2);
            }).join('');
    }
}
let GoColorStyle = new GoColorAttributor('go-color', 'color', {
    scope: Parchment.Scope.INLINE
});

export { GoFormatClass, GoColorStyle };