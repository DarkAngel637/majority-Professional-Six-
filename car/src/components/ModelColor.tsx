import React, { Component } from 'react'
import { connect } from 'react-redux';
import { IState } from '../store';
import { getModelColorAction } from '../store/thunk/detail';
import { IModelColorItem } from '../utils/types';
import './ModelColor.css'

interface IProps{
    serialId: string;
    colorList: {[key:string]: IModelColorItem[]};
    getModelColor: (id: string) => void;
    closeColorDialog: ()=>void;
}
class ModelColor extends Component<IProps> {
    state = {
        curYear: ''
    }
    
    async componentDidMount(){
        await this.props.getModelColor(this.props.serialId);
        this.setState({
            curYear: Object.keys(this.props.colorList)[0]
        })
    }

    get curList(){
        return this.props.colorList[this.state.curYear] || [];
    }

    changeYear(year: string){
        this.setState({
            curYear: year
        })
    }

    render() {
        let {colorList} = this.props;
        let {curYear} = this.state;
        console.log('colorList...', colorList, this.curList);
        let years = Object.keys(colorList);
        
        return (
            <div className="dialog colorDialog">
                <button>全部颜色</button>
                <section>{
                    years.map(item=>{
                        return <span onClick={()=>this.changeYear(item)} className={curYear===item?'active': ''} key={item}>{item}</span>
                    })
                }</section>
                <ul>{
                    this.curList.map(item=>{
                        return <li key={item.ColorId}>
                            <span style={{backgroundColor: item.Value}}></span>
                            <span>{item.Name}</span>
                        </li>
                    })
                }</ul>
            </div>
        )
    }
}

const mapStateToProps = (state: IState)=>{
    return {colorList: state.img.colorList};
}

const mapDispatchToProps = (dispatch: Function)=>{
    return {
        getModelColor: (id: string)=>dispatch(getModelColorAction(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelColor);