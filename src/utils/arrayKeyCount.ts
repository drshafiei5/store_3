const ArrayKeyCount = <T>(data: T[], key: keyof T) => {
  return data.reduce((obj, v) => {
    obj[v[key]] = (obj[v[key]] || 0) + 1;
    return obj;
  }, {});
};

export default ArrayKeyCount;
