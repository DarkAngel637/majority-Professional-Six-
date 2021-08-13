
const Layouts: React.FC = (props)=>{
    return <div>
        <header>头部</header>
        {props.children}
        <footer>底部</footer>
    </div>
}

export default Layouts;