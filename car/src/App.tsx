import config from './router/router.config';
import RouterView from './router/RouterView';

const App = ()=>{
  return <RouterView routes={config.routes}></RouterView>
}

export default App;