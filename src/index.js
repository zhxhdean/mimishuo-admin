
import ReactDOM from 'react-dom';
import './index.less';
import {rootRouter} from './router'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(rootRouter, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
