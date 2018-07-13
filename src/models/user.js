import { message } from 'antd';
import * as services from '../services/user';

export default {
  namespace: 'user',
  state: {
    users: [],
    city: [],
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
    *fetchCity({ payload }, { call, put }) {
      const { data: { city } } = yield call(services.fetchCity);
      yield put({
        type: 'save',
        payload: {
          city: city || [],
        },
      });
    },
    *fetchUsers({ payload }, { call, put }) {
      const name = payload ? payload.name : '';
      const { data: { users } } = yield call(services.fetchUsers, name);
      yield put({
        type: 'save',
        payload: {
          users: users || [],
        },
      });
    },
    *addUser({ payload: { user, cb } }, { call, put }) {
      yield call(services.addUser, user);
      message.success('新增成功！');
      if (cb) cb();
      yield put({ type: 'fetchUsers' });
    },
    *updateUser({ payload: { user, cb } }, { call, put }) {
      yield call(services.updateUser, user);
      message.success('修改成功！');
      if (cb) cb();
      yield put({ type: 'fetchUsers' });
    },
    *deleteUser({ payload: { user, cb } }, { call, put }) {
      yield call(services.deleteUser, user);
      message.success('删除成功！');
      if (cb) cb();
      yield put({ type: 'fetchUsers' });
    },
    *batchDelete({ payload: { keys, cb } }, { call, put }) {
      yield call(services.batchDelete, keys);
      message.success('批量删除成功！');
      if (cb) cb();
      yield put({ type: 'fetchUsers' });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(() => {
        dispatch({ type: 'fetchUsers' });
        dispatch({ type: 'fetchCity' });
      });
    },
  },
};
