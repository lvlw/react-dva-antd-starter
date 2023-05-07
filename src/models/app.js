import * as services from '../services/login';
import { store } from './store';

export default {
  namespace: 'app',
  state: {
    currentInfo: {
      user: {
        account: 'zhangs@dianrong.com',
        name: '张三',
      },
    },
    collapsed: false,
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *logout({ payload: { cb } }, { call, put }) {
      yield call(services.logout);
      // 清空models里的用户信息
      yield put({
        type: 'save',
        payload: {
          currentInfo: {
            user: {
              account: '',
              name: '',
            },
          },
        },
      });
      // 全局对象 store 里的token清空
      store.token = '';
      if (cb) cb();
    },
    *login({ payload: { userInfo, cb } }, { call, put }) {
      const { data: { account, name, token } } = yield call(services.login, userInfo);
      // 用户信息记录到models里
      yield put({
        type: 'save',
        payload: {
          currentInfo: {
            user: {
              account,
              name,
            },
          },
        },
      });
      // token 放到全局对象 store 里  方便 请求的时候获取
      store.token = token;
      if (cb) cb();
    },
  },
  subscriptions: {
    setup({ history }) {
      return history.listen(() => {});
    },
  },
};
