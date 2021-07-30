class Dep{
    constructor(){
        this.subs = [];
    }   
    addSub(sub){
        this.subs.push(sub);
    }
    notify(){
        this.subs.forEach(cb=>{cb.update()});
    }
}

export default Dep;