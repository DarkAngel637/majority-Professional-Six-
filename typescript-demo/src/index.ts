const a:number = 100;

// const obj1: any = 100;

// any跟unkonw的区别
// obj1.a;

// const obj2: unknown = 100;

// obj2.a;
// obj2();

// const arr1: Array<number> = [1];
const arr1: number[] = [1];

const arr2: [number, string] = [100, ''];

enum Direction {
    top,
    bottom,
    left,
    right
}

const direction: Direction = Direction.top;

// 接口
interface IProps{
    list: {id: string; name: string}[],
    readonly cb: ()=>void
}
const obj1:Partial<IProps> = {list: [], cb: ()=>{}};

const obj2:Partial<IProps> = {};

obj2.list?.map(item=>{

})

function swap<T, U>(a: T, b: U): [U, T]{
    return [b, a];
}
swap<number, string>(1, '');


function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
}

// 交叉类型，联合类型和类型别名
const c: number|string = 0;

interface IOwnProps {
    name: string
}

const props: IOwnProps & IProps = {
    name: '1812A',
    list: [], 
    cb: ()=>{}
}

type noop = ()=>{};
type props = {
    name: string
}

interface IChildProps extends IOwnProps{
    age: 18
}

const childProps:IChildProps = {
    age: 18,
    name: '1812A'
}