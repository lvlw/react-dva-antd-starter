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
  effects: {},
  subscriptions: {
    setup({ history }) {
      return history.listen(() => {});
    },
  },
};
