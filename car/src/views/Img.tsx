import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router'
import { IState } from '../store';
import {getImageListAction} from '../store/thunk/detail'
import {ICarTypeInfo, IImageItem } from '../utils/types';
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
        this.closeTypeDialog = this.closeTypeDialog.bind(this);
    }
    state = {
        showTypeDialog: false,
        showColorDialog: false,
        ColorID: '',
        ColorName: '全部颜色',
        CarID: '',
        CarName: '全部车款'
    }

    componentDidMount(){
        let id = this.id = this.props.match.params.id;
        this.getImageList();
    }

    // 选择颜色后的回调
    closeColorDialog({ColorId, Name}:{[key:string]:string}){
        this.setState({
            showColorDialog: false,
            ColorID: ColorId,
            ColorName: Name
        }, ()=>{
            this.getImageList();
        });
    }

    // 选择车款后的回调
    closeTypeDialog({car_name, car_id, market_attribute}: Partial<ICarTypeInfo>){
        this.setState({
            showTypeDialog: false,
            CarID: car_id,
            CarName: `${market_attribute?.year}款 ${car_name}`
        }, ()=>{
            this.getImageList();
        });
    }

    getImageList(){
        let params:{[key:string]:string} = {SerialID: this.id};
        if (this.state.CarID){
            params.CarID = this.state.CarID;
        }
        if (this.state.ColorID){
            params.ColorID = this.state.ColorID;
        }
        this.props.getImageList(params);
    }

    render() {
        let {imageList} = this.props;
        let {showColorDialog, ColorName, showTypeDialog, CarName} = this.state;
        let id  = this.props.match.params.id;

        return (
            <div className="img">
                <header>
                    <span onClick={()=>this.setState({showColorDialog:true})}>{ColorName}</span>
                    <span onClick={()=>this.setState({showTypeDialog:true})}>{CarName}</span>
                </header>
                <div>
                    {!imageList.length?<div className="no-img">
                        <img src="http://h5.chelun.com/2017/official/img/no-img.png" alt=""/>
                        <span>没有图片</span>
                    </div>:
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
                    }</section>}
                </div>
                {showColorDialog && <ModelColor closeColorDialog={this.closeColorDialog} serialId={id}/>}
                {showTypeDialog && <ModelType closeTypeDialog={this.closeTypeDialog} serialId={id}/>}
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