import React from 'react'
import { connect } from 'react-redux';
import { IState } from '../store';
import { getSerialInfoAction } from '../store/thunk/detail';
import { ICarTypeInfo, IDetailInfo } from '../utils/types';
import './ModelType.css'

interface IProps{
    info: Partial<IDetailInfo>,
    getSerialInfo: (id: string) =>void,
    serialId: string
}

class ModelType extends React.Component<IProps> {
    years: string[]|undefined = [];
    state = {
        curYear: ''
    }
    
    async componentDidMount(){
        if (!Object.keys(this.props.info).length || !this.props.info.list?.length){
            await this.props.getSerialInfo(this.props.serialId);
        }   
        let list = this.props.info.list;
        this.years = list && Array.from(new Set(list!.map(item=>item.market_attribute.year)));
        console.log('list...', list, this.years);
        this.setState({
            curYear: this.years![0]
        })
    }

    get curList(){
        let list = this.props.info.list?.filter(item=>item.market_attribute.year === this.state.curYear);
        return this.mergeCarType(list!);
    }

    mergeCarType(list: ICarTypeInfo[]){
        let mergeCars: {key: string, list: ICarTypeInfo[]}[] = [];
        list.forEach(item=>{
            let key = `${item.exhaust_str}/${item.max_power_str} ${item.inhale_type}`;
            let index = mergeCars.findIndex(value=>value.key === key);
            if (index === -1){
                mergeCars.push({
                    key,
                    list: [item]
                })
            }else{
                mergeCars[index].list.push(item);
            }
        })
        return mergeCars;
    }

    changeYear(year: string){
        this.setState({
            curYear: year
        })
    }

    render() {
        // let {colorList, closeColorDialog} = this.props;
        let list = this.props.info.list;
        let {curYear} = this.state;
        if (!list || !this.years){
            return null;
        }
        return (<div className="dialog typeDialog">
                <button onClick={()=>{}} >全部车款</button>
                <section>{
                    this.years!.map(item=>{
                        return <span onClick={()=>this.changeYear(item)} className={curYear===item?'active': ''} key={item}>{item}</span>
                    })
                }</section>
                <div>{
                    this.curList.map(item=>{
                        return <ul key={item.key}>
                            <p>{item.key}</p>
                            {item.list.map(value=>{
                                return <li key={value.car_id}>
                                    <p>
                                        <span>{value.car_name}</span>
                                        <span>{value.market_attribute.dealer_price_min}起</span>
                                    </p>
                                    <p>
                                        <span>{`${value.horse_power}马力${value.gear_num}档`}</span>
                                        <span>指导价 {value.market_attribute.official_refer_price}起</span>
                                    </p>
                                </li>
                            })}
                        </ul>
                    })
                }</div>
            </div>
        )
    }
}

const mapStateToProps = (state: IState)=>{
    return {
        info: state.detail.info
    };
}

const mapDispatchToProps = (dispatch: Function)=>{
    return {
        getSerialInfo: (id: string)=>dispatch(getSerialInfoAction(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelType);