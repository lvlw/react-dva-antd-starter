// import request from '../utils/request';
import { getRandomBetweenMaxAndMin } from '../utils';
import { PREFIX, NATIVE_USERS, FIRST_NAMES } from '../utils/constants';

const city = [
  {
    id: 1,
    name: '成都',
  },
  {
    id: 2,
    name: '上海',
  },
  {
    id: 3,
    name: '深圳',
  },
  {
    id: 4,
    name: '武汉',
  },
  {
    id: 5,
    name: '北京',
  },
  {
    id: 6,
    name: '广州',
  },
  {
    id: 7,
    name: '大连',
  },
];
const game = ['王者荣耀', 'DotA', 'DotA2', '英雄联盟', 'QQ飞车'];
const ranking = ['青铜', '白银', '黄金', '铂金', '钻石', '王者'];
const level = ['I', 'II', 'III', 'IV', 'V'];
const interest = ['写代码', '游戏', '听歌', '篮球', '足球', '旅行', '吃', '睡觉', '撩妹', '撩汉', '舞蹈', '厨艺'];
const min = 19968;
const max = 20500;
const generateName = () => {
  const firstNameArray = FIRST_NAMES.split(' ');
  const firstName = firstNameArray[getRandomBetweenMaxAndMin(0, firstNameArray.length)];
  const lastNameLength = getRandomBetweenMaxAndMin(1, 2);
  const lastNameArray = [];
  for (let i = 0; i < lastNameLength; i += 1) {
    lastNameArray.push(String.fromCharCode(getRandomBetweenMaxAndMin(min, max)));
  }
  return `${firstName}${lastNameArray.join('')}`;
};
const getInterest = () => { // 随机生成1-3个兴趣爱好
  const tempInterest = interest.slice(0); // 深拷贝
  const myInterest = [];
  const interestCount = getRandomBetweenMaxAndMin(1, 3);
  for (let j = 0; j < interestCount; j += 1) {
    const curIndex = getRandomBetweenMaxAndMin(0, tempInterest.length - 1);
    myInterest.push(tempInterest[curIndex]);
    tempInterest.splice(curIndex, 1);
  }
  return myInterest.join(',');
};
const getGamesRanking = () => {
  const tempGame = game.slice(0);
  const myGamesRanking = [];
  const count = getRandomBetweenMaxAndMin(1, 3);
  for (let j = 0; j < count; j += 1) {
    const curIndex = getRandomBetweenMaxAndMin(0, tempGame.length - 1);
    myGamesRanking.push({
      name: tempGame[curIndex],
      ranking: ranking[getRandomBetweenMaxAndMin(0, ranking.length - 1)],
      level: level[getRandomBetweenMaxAndMin(0, level.length - 1)],
    });
    tempGame.splice(curIndex, 1);
  }
  return myGamesRanking;
};

export function fetchCity() {
  return {
    data: {
      city,
    },
  };
}

export function fetchUsers(name) {
  // return request(`${PREFIX}/info`, {
  //   method: 'GET',
  // });
  let nativeUsers = localStorage.getItem(NATIVE_USERS);
  if (!nativeUsers) {
    nativeUsers = [];
    for (let i = 1; i < getRandomBetweenMaxAndMin(301, 501); i += 1) { // 随机生成100-200个user
      nativeUsers.push({
        id: i,
        name: generateName(),
        sex: getRandomBetweenMaxAndMin(1, 2), // 1是男 2是女
        age: getRandomBetweenMaxAndMin(12, 40), // 16 -40
        city: getRandomBetweenMaxAndMin(1, 7),
        email: null,
        phone: null,
        interest: getInterest(),
        // gamesRanking: game.map((item) => {
        //   const myGame = {};
        //   myGame.name = item;
        //   myGame.ranking = ranking[getRandomBetweenMaxAndMin(0, ranking.length - 1)];
        //   myGame.level = level[getRandomBetweenMaxAndMin(0, level.length - 1)];
        //   return myGame;
        // }),
        gamesRanking: getGamesRanking(),
        profile: '',
        status: getRandomBetweenMaxAndMin(0, 1), // 0 禁用  1启用
      });
    }
    nativeUsers.sort((a, b) => b.id - a.id);
    localStorage.setItem(NATIVE_USERS, JSON.stringify(nativeUsers));
    return {
      data: {
        users: nativeUsers,
      },
    };
  } else {
    const users = JSON.parse(nativeUsers);
    return {
      data: {
        users: name ? users.filter(n => n.name.includes(name)) : users,
      },
    };
  }

}
export function addUser(user) {
  const nativeUsers = JSON.parse(localStorage.getItem(NATIVE_USERS));
  const lastUser = nativeUsers[0];
  nativeUsers.push({
    ...user,
    id: lastUser.id + 1,
  });
  nativeUsers.sort((a, b) => b.id - a.id);
  localStorage.setItem(NATIVE_USERS, JSON.stringify(nativeUsers));
}

export function updateUser(user) {
  const nativeUsers = JSON.parse(localStorage.getItem(NATIVE_USERS));
  const index = nativeUsers.findIndex(n => n.id === user.id);
  nativeUsers[index] = user;
  localStorage.setItem(NATIVE_USERS, JSON.stringify(nativeUsers));
}

export function deleteUser(user) {
  const nativeUsers = JSON.parse(localStorage.getItem(NATIVE_USERS));
  const index = nativeUsers.findIndex(n => n.id === user.id);
  nativeUsers.splice(index, 1);
  localStorage.setItem(NATIVE_USERS, JSON.stringify(nativeUsers));
}

export function batchDelete(keys) {
  const nativeUsers = JSON.parse(localStorage.getItem(NATIVE_USERS));
  for (const key of keys) {
    const index = nativeUsers.findIndex(n => n.id === key);
    nativeUsers.splice(index, 1);
  }
  localStorage.setItem(NATIVE_USERS, JSON.stringify(nativeUsers));
}

