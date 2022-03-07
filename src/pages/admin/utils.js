import areas from '../../static/area.json';
import { types } from './daashboard/staticsvars';
export const checker = (arr1, arr2) => {
  if (Number(arr1[0]) < Number(arr2[0])) {
  } else if (Number(arr1[0]) > Number(arr2[0])) {
    return true;
  } else {
    if (Number(arr1[1]) < Number(arr2[1])) {
    } else if (Number(arr1[1]) > Number(arr2[1])) {
      return true;
    } else {
      if (Number(arr1[2]) < Number(arr2[2])) {
      } else {
        return true;
      }
    }
  }
  return false;
};

export const findUtil = (user, lev) => {
  let Utils = findOne(areas, 0, user, lev);
  return Utils;
};

const findOne = (obj, level, user, lev) => {
  let next;
  if (user.role[level] === 'all') {
    return findAll(obj, level, user, lev);
  }
  if (types[level] !== 'ps') {
    next = obj[types[level]].find((item) => {
      return item.name.toLowerCase() === user.role[level].toLowerCase();
    });
  } else {
    next = obj[types[level]].find((item) => {
      return item.toLowerCase() === user.role[level].toLowerCase();
    });
    return [next];
  }
  if (user.role[level + 1] !== 'all') {
    return findOne(next, level + 1, user, lev);
  } else {
    return findAll(next, level + 1, user, lev);
  }
};
const findAll = (obj, level, user, lev) => {
  let next;
  if (level === lev) {
    if (lev === 4) next = obj[types[level]];
    else next = obj[types[level]].map((i) => i.name);
    // console.log({ next, obj });
    return next;
  } else {
    let station = [];
     obj[types[level]] &&  obj[types[level]].forEach((item) => {
      station = [...station, ...findAll(item, level + 1, user, lev)];
    });
    // console.log({ next, station });
    return station;
  }
};
