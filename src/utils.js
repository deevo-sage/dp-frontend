const area = require("./static/area.json");
const fs = require("fs");
const types = ["zones", "ranges", "districts", "subdiv", "ps"];

const demouser = {
  name: "someuser",
  email: "user@user.com",
  role: [
    "western zone",
    "western range",
    "dwarka",
    "dwarka",
    "dwarka sec 23",
  ],
  password: String,
};

const findStations = (obj, user = demouser) => {
  let stations = findOne(obj, 0, user);
  console.log({ stations });
};
const findOne = (obj, level, user) => {
  let next;
  if (user.role[level] === "all") {
    return findAll(obj, level, user);
  }
  if (types[level] !== "ps") {
    next = obj[types[level]].find((item) => {
      return item.name.toLowerCase() === user.role[level].toLowerCase();
    });
  } else {
    next = obj[types[level]].find((item) => {
      return item.toLowerCase() === user.role[level].toLowerCase();
    });
    return [next];
  }
  if (user.role[level + 1] !== "all") {
    return findOne(next, level + 1, user);
  } else {
    return findAll(next, level + 1, user);
  }
};
const findAll = (obj, level, user) => {
  let next;
  if (types[level] === "subdiv") {
    next = obj[types[level]];
    // console.log({ next, obj });
    return next;
  } else {
    let station = [];
    next = obj[types[level]].map((item) => {
      station = [...station, ...findAll(item, level + 1, user)];
      return findAll(item, level + 1, user);
    });
    // console.log({ next, station });
    return station;
  }
};
findStations(area, demouser);
