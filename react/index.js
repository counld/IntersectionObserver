import ReactDOM from 'react-dom';
import AppWraper from './src/page/appWraper';
import App from './src/router';
import 'antd/dist/antd.css'


ReactDOM.render(AppWraper(App), document.getElementById('root'));
