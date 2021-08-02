import Observer from './observe.js';
import Compile from './compile.js';

class MVVM{
    /**
     * @param $options
     * el 模版挂载的位置
     * data MVVM实例驱动试图的数据 
     */
    constructor($options){
        this.$options = $options;
        this._data = $options.data;
        // 把_data内部的属性代理到this上
        this._proxyData(this._data);
        this._proxyComputed($options.computed);
        // 通过observe劫持data
        new Observer(this._data);

        // 挂载el
        new Compile($options.el, this);
    }
    // 使用this.property代理this._data.property
    _proxyData(data){
        for (let key in data){
            Object.defineProperty(this, key, {
                get(){
                    return this._data[key]
                },
                set(newValue){
                    this._data[key] = newValue;
                }
            })
        }
    }
    // 使用this.property代理$options.computed.property
    _proxyComputed(computed){
        for (let key in computed){
            Object.defineProperty(this, key, {
                get(){
                    if (computed[key] && typeof computed[key] === 'function'){
                        return computed[key].call(this);
                    }
                },
                set(newValue){
                    throw(new Error('can`t set value of computed'));
                }
            })
        }
    }
}

export default MVVM;
