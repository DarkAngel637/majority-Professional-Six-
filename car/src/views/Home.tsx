import React, { Component } from 'react'
import {getBrandList} from '../service'
import {IBrandItem, IBrandList} from '../utils/types'
interface IState{
    letters: string[];
    brandList: IBrandList [];
}

export default class Home extends Component<{}, IState> {
    state:IState = {
        letters: [],
        brandList: []
    }

    async componentDidMount(){
        let result = (await getBrandList()) as unknown as IBrandItem[];
        // 处理数据
        let letters = Array.from(new Set(result.map(item=>item.Spelling[0])));
        let brandList: IBrandList[] = [];
        result.forEach(item=>{
            let letter = item.Spelling[0];
            let index = brandList.findIndex(item=>item.letter === letter);
            if (index === -1){
                brandList.push({letter, list: [item]})
            }else{
                brandList[index].list.push(item);
            }
        })
        this.setState({
            letters,
            brandList
        })
    }

    render() {
        let {brandList} = this.state;
        return (
            <div>
                {/* 渲染侧边导航 */}
                {/* 渲染品牌列表 */}
                <div>{
                    brandList.map(item=>{
                        return <div key={item.letter}>
                            <p>{item.letter}</p>
                            <ul>{
                                item.list.map(value=>{
                                    return <li key={value.MasterID}>
                                        <img src={value.CoverPhoto} alt="" />
                                        <span>{value.Name}</span>
                                    </li>
                                })    
                            }</ul>
                        </div>
                    })
                }</div>
                {/* 渲染车系列表 */}
            </div>
        )
    }
}
