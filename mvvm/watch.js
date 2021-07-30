import Dep from './dep.js';

class Watch{
    constructor(vm, exp, cb){
        this.$vm = vm;
        this.$cb = cb;
        this.$exp = exp;
        this.get();
    }
    get(){
        Dep.target = this;
        this.value = this._getVMVal(this.$vm, this.$exp);
        Dep.target = null;
        return this.value;
    }
    update(){
        let value = this.get();
        this.$cb(value);
    }
    _getVMVal(vm, exp){
        let keys = exp.split('.');
        let val = vm;
        for (let i = 0; i < keys.length; i++){
            val = val[keys[i]];
        }
        return val;
    }
}

export default Watch;