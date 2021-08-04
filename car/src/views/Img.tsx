import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router'
import { IState } from '../store';
import {getImageListAction} from '../store/thunk/detail'
import {IImageItem } from '../utils/types';
import './Img.css'
// 引入颜色选择组件
import ModelColor from '../components/ModelColor';

interface IPorps{
    imageList: IImageItem[],
    getImageList: (id: string) =>void
}
class Img extends Component<IPorps & RouteComponentProps<{id: string}>> {
    constructor(props: IPorps & RouteComponentProps<{id: string}>){
        super(props);
        this.closeColorDialog = this.closeColorDialog.bind(this);
    }
    state = {
        showColorDialog: false
    }

    componentDidMount(){
        let id  = this.props.match.params.id;
        this.props.getImageList(id);
    }

    closeColorDialog(){
        this.setState({showColorDialog: false});
    }

    render() {
        let {imageList} = this.props;
        let {showColorDialog} = this.state;
        let id  = this.props.match.params.id;

        return (
            <div className="img">
                <header>
                    <span onClick={()=>this.setState({showColorDialog:true})}>选择颜色</span>
                    <span>选择车款</span>
                </header>
                <section>{
                    imageList.map(item=>{
                        return <ul key={item.Id}>
                            <p>
                                <span>{item.Name}</span>
                                <span>{item.Count+'张>'}</span>
                            </p>
                            {
                                item.List.map(value=>{
                                    return <li key={value.Url} style={{backgroundImage: `url(${value.Url.replace('{0}', String(value.LowSize))})`}}></li>
                                })
                            }
                        </ul>
                    })
                }</section>
                {showColorDialog && <ModelColor closeColorDialog={this.closeColorDialog} serialId={id}/>}
            </div>
        )
    }
}

const mapStateToProps = (state: IState)=>{
    return {imageList: state.img.imageList};
}

const mapDispatchToProps = (dispatch: Function)=>{
    return {
        getImageList: (id: string)=>dispatch(getImageListAction(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Img);