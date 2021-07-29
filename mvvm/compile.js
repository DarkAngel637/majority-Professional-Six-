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
    compileElement(el){

    }
}

const compileUtil = {
    compileText(node, vm, exp){
        console.log('node...', node);

        let val = this._getVMVal(vm, exp);
        update.updateText(node, val);
    },
    _getVMVal(vm, exp){
        let keys = exp.split('.');
        let val = vm;
        for (let i = 0; i < keys.length; i++){
            val = val[keys[i]];
        }
        return val;
    }
}

const update = {
    updateText(node, val){
        node.textContent = val || '';
    }
}


export default Compile;