import Dep from './dep.js';

class Observer{
    constructor(data){
        this.data = data;
        this.dep = new Dep();
        for (let key in data){
            this.defineReactive(data, key, data[key]);
        }
    }

    defineReactive(object, key, value){
        if (Object.prototype.toString.call(value) === '[object Object]' && value !== null) {
            for (let _key in value) {
                this.defineReactive(value, _key, value[_key]);
            }
        }
        let me = this;
        Object.defineProperty(object, key, {
            get(){
                if (Dep.target){
                    me.dep.addSub(Dep.target);
                }
                console.log(`劫持了${key}的get方法，返回值是${value}`);
                return value;
            },
            set(newValue){
                console.log(`劫持了${key}的值是${newValue}`);
                if (newValue !== value) {
                    value = newValue;
                    me.dep.notify();
                }
            }
        })
    }
}

export default Observer;