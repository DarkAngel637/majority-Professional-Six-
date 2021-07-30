import Watch from './watch.js';

class Compile{
    constructor(el, $vm){
        this.$vm = $vm;
        // 获取要挂载的节点
        this.$el = el?document.querySelector(el): document.body;
        // 把节点转化成dom碎片编译
        this.$fragment = this.node2Fragment(this.$el);
        // 编辑模版
        this.compile(this.$fragment);
        // 把dom碎片添加到挂载节点后面
        this.$el.appendChild(this.$fragment);
    }  
    // dom节点转化成fragment
    node2Fragment($el){
        let $fragment = document.createDocumentFragment();
        if ($el.firstElementChild){
            $fragment.appendChild($el.firstElementChild);
        }
        return $fragment;
    } 
    // 编译模版
    compile(el){
        let childNodes = el.childNodes;
        console.log('childNodes...', childNodes);
        const textReg = /\{\{(.*)\}\}/;
        [...childNodes].forEach(node=>{
            if (node.nodeType === 1){
                this.compileElement(node);
            }else if (node.nodeType === 3){
                if (textReg.test(node.textContent)){
                    compileUtil.compileText(node, this.$vm, RegExp.$1)
                }
            }
            if (node.childNodes && node.childNodes.length){
                this.compile(node);
            }
        })
    }
    // 处理元素节点
    compileElement(node){
        let attributes = node.attributes;
        [...attributes].forEach(attr=>{
            if (this.isDirective(attr.name)){
                if (this.isEventDirective(attr.name)){
                    compileUtil.compileEventHandle(node, this.$vm, attr.name, attr.value);
                }else{
                    let dir, handleMethod;
                    if (attr.name.includes(':')){
                        dir = attr.name.split(':')[1];
                    }else{
                        dir = attr.name.slice(2);
                    }
                    handleMethod = 'compile'+dir[0].toUpperCase()+dir.slice(1);
                    
                    compileUtil[handleMethod] && compileUtil[handleMethod](node, this.$vm, attr.value);
                }
                node.removeAttribute(attr.name);
            }
        })
    }
    // 属性是否是指令
    isDirective(name){
        return name.includes('v-');
    }
    // 属性是否是事件
    isEventDirective(name){
        return name.includes('v-on');
    }
}

// 编辑工具
const compileUtil = {
    bindReactive(node, vm, exp, type){
        let val = this._getVMVal(vm, exp);
        update[type] && update[type](node, val);
        // 对使用到的exp添加监听
        new Watch(vm, exp, (newValue) =>{
            update[type](node, newValue);
        })
    },
    compileText(node, vm, exp){
        this.bindReactive(node, vm, exp, 'updateText');
    },
    compileHtml(node, vm, exp){
        this.bindReactive(node, vm, exp, 'updateHtml');

    },
    compileModel(node, vm, exp){
        if (node.type === 'checkbox' || node.type === 'radio'){
            this.bindReactive(node, vm, exp, 'updateCheck');
            node.addEventListener('change', (e)=>{
                this._setVMVal(vm, exp, e.target.checked)
            })
        }else{
            this.bindReactive(node, vm, exp, 'updateValue');
            node.addEventListener('change', (e)=>{
                this._setVMVal(vm, exp, e.target.value)
            })
        }
    },
    compileEventHandle(node, vm, dir, exp){
        dir = dir.split(':')[1];
        let fn = vm.$options.methods && vm.$options.methods[exp];
        if (dir && fn){
            node.addEventListener(dir, fn.bind(vm));
        }
    },
    _getVMVal(vm, exp){
        let keys = exp.split('.');
        let val = vm;
        for (let i = 0; i < keys.length; i++){
            val = val[keys[i]];
        }
        return val;
    },
    _setVMVal(vm, exp, newValue){
        let keys = exp.split('.');
        let val = vm;
        for (let i = 0; i < keys.length; i++){
            if (i === keys.length - 1){
                val[keys[i]] = newValue;
            }else{
                val = val[keys[i]];
            }
        }
        return val;
    }
}

// 更新工具
const update = {
    updateText(node, val){
        node.textContent = val || '';
    },
    updateHtml(node, val){
        node.innerHTML = val;
    },
    updateCheck(node, val){
        node.check = val;
    },
    updateValue(node, val){
        node.value = val;
    }
}


export default Compile;