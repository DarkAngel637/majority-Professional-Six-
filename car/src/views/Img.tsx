import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router'
import { IState } from '../store';
import {getImageListAction} from '../store/thunk/detail'
import {IImageItem } from '../utils/types';
import './Img.css'
// 引入颜色选择组件
import ModelColor from '../components/ModelColor';
// 引入车款选择组件
import ModelType from '../components/ModelType';

interface IPorps{
    imageList: IImageItem[],
    getImageList: (params:{}) =>void
}
class Img extends Component<IPorps & RouteComponentProps<{id: string}>> {
    id: string = '';
    constructor(props: IPorps & RouteComponentProps<{id: string}>){
        super(props);
        this.closeColorDialog = this.closeColorDialog.bind(this);
    }
    state = {
        showTypeDialog: false,
        showColorDialog: false,
        ColorID: '',
        ColorName: '全部颜色'
    }

    componentDidMount(){
        let id = this.id = this.props.match.params.id;
        this.props.getImageList({SerialID: id});
    }

    closeColorDialog({ColorId, Name}:{[key:string]:string}){
        this.setState({
            showColorDialog: false,
            ColorID: ColorId,
            ColorName: Name
        }, ()=>{
            let params:{[key:string]:string} = {SerialID: this.id};
            if (ColorId){
                params.ColorID = ColorId;
            }
            this.props.getImageList(params);
        });
    }

    render() {
        let {imageList} = this.props;
        let {showColorDialog, ColorName, showTypeDialog} = this.state;
        let id  = this.props.match.params.id;

        return (
            <div className="img">
                <header>
                    <span onClick={()=>this.setState({showColorDialog:true})}>{ColorName}</span>
                    <span onClick={()=>this.setState({showTypeDialog:true})}>选择车款</span>
                </header>
               {!imageList.length && <img src="http://h5.chelun.com/2017/official/img/no-img.png" alt=""/>}
                <section className="img-list">{
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
                {showTypeDialog && <ModelType serialId={id}/>}
            </div>
        )
    }
}

const mapStateToProps = (state: IState)=>{
    return {imageList: state.img.imageList};
}

const mapDispatchToProps = (dispatch: Function)=>{
    return {
        getImageList: (params:{})=>dispatch(getImageListAction(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Img);