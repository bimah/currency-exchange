const urlEncode = obj => Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');


const req = params => new Promise((resolve, reject) => fetch(params.endpoint, params.args)
  .then(response => {
    if (response.status > 400) reject(response);
    return response;
  })
  .then(response => response.text())
  .then(text => {
    try {
      const data = JSON.parse(text);
      if (!data || (data && data.error)) {
        reject(data || true);
      }
      resolve(data);
    } catch (error) {
      resolve(text);
    }
  })
  .catch(error => {
    reject(error);
  }));

const Request = {
  get: (endpoint, data) => req({
    endpoint: `${endpoint}${data ? `?${urlEncode(data)}` : ''}`,
    args: {
      method: 'GET'
    }
  })
};

export default Request;
