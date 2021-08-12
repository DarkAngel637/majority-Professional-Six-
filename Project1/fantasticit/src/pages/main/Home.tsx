import React, { useEffect, useState } from 'react';

interface IListItem{
    finished: boolean;
    content: string;
    id: string;
}

const Home: React.FC = ()=>{
    const [content, setContent] = useState('');
    const [list, setList] = useState<IListItem []>([]);

    function addList(e: React.KeyboardEvent<HTMLInputElement>){
        if (content && (e.keyCode === 13)){
            setList(list=>{
                return [...list, {
                    id: String(+new Date()),
                    content,
                    finished: false
                }]
            })
        }
    }
    function handleCheck(e: React.ChangeEvent<HTMLInputElement>, id:string){
        let index = list.findIndex(item=>item.id === id);
        let newList = [...list];
        newList[index].finished = e.target.checked;
        setList(newList);
    }

    // 模拟didMount
    useEffect(()=>{
        console.log(123);
    }, []);
    

    // 模拟shouldComponentUpdate和componentDidUpdate
    useEffect(()=>{
        console.log(1234);
        return ()=>{
            // 在组件销毁的时候就会执行
        }
    }, [list]);

    return <div>
        <p>二级路由-Home</p>
        <header>
            <input type="text" value={content} 
                onChange={(e)=>setContent(e.target.value)} 
                onKeyDown={addList}/>
        </header>
        <section>{
            list.map(item=>{
                return <li key={item.id}>
                    <input type="checkbox" checked={item.finished} onChange={e=>handleCheck(e, item.id)}/>
                    <span>{item.id}</span>
                    <span>{item.content}</span>
                </li>
            })    
        }</section>
    </div>
}

export default Home;