import React from 'react';

const MainLayout:React.FC = (props)=>{
    return <div>
        {props.children}
        <footer>
            <span>首页</span>
            <span>分类</span>
            <span>购物车</span>
            <span>我的</span>
        </footer>
    </div>  
}

export default MainLayout;