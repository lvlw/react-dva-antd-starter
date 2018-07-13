import 'babel-polyfill';
import dva from 'dva';
import createLoading from 'dva-loading';
import { message } from 'antd';
import './index.css';

// 1. Initialize
const app = dva({
  onError(error) {
    message.error(error.message, 3);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
