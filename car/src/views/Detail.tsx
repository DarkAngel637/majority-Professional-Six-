import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router'
import { IState } from '../store';
import {getSerialInfoAction} from '../store/thunk/detail'
import { IDetailInfo } from '../utils/types';

interface IPorps{
    info: Partial<IDetailInfo>,
    getSerialInfo: (id: string) =>void
}
class Detail extends Component<IPorps & RouteComponentProps<{id: string}>> {
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.getSerialInfo(id);
    }

    render() {
        console.log('props...', this.props);
        let {info} = this.props;
        if (!Object.keys(info).length){
            return null;
        }
        return (
            <div>
                <img src={info.CoverPhoto} alt="" />
            </div>
        )
    }
}

const mapStateToProps = (state: IState)=>{
    return {info: state.detail.info};
}

const mapDispatchToProps = (dispatch: Function)=>{
    return {
        getSerialInfo: (id: string)=>dispatch(getSerialInfoAction(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);