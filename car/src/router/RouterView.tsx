import React from 'react';
import {Switch, Redirect, Route, RouteComponentProps} from 'react-router-dom';
interface IRouteItem{
    path: string;
    component: React.FunctionComponent | React.ComponentClass | string; 
    from: string;
    to: string;
    children: IRouteItem[];
}

interface IProps{
    routes: Partial<IRouteItem>[]
}
export default (props: IProps) => {
    return <Switch>{
        props.routes.map(item=>{
            if (item.to){
                console.log('item...', item);
                if (item.from){
                    return <Redirect key={item.to} from={item.from} exact to={item.to!}></Redirect>
                }
                return <Redirect key={item.to} to={item.to!}></Redirect>
            }
            return <Route path={item.path} key={item.path} render={(props: RouteComponentProps)=>{
                if (item.children){
                    return React.createElement(item.component!, {...props, routes: item.children} as React.Attributes);
                }else{
                    return React.createElement(item.component!, props as React.Attributes);
                }
            }}></Route>
        })
        }</Switch>
}