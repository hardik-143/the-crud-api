// creata a helper function to remove _id and __v keys from the array of objects

const removePrivateKeyFromSingleObject = (data) => {
    delete data._id;
    delete data.__v;
    return data;
    };

const removePrivateKeys = (data) => {
  return data.map((item) => {
    const { _id, __v, ...rest } = item;
    return rest;
  });
};

export { removePrivateKeys,removePrivateKeyFromSingleObject };
