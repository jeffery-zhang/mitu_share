import axios from 'axios';

export default function () {
  const method = 'get';
  const getFunction = (url, params) => {
    return axios({
      method,
      url,
      headers: {xToken: 'test'},
      params,
    })
      .then(res => res.data);
  };
  return {
    getWorkInfo(params) {
      return getFunction('/work/info', params);
    },
  };
};
