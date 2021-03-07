const url = 'http://localhost:4000/api';

export function sendLoginData(email, password, loginError, setToken) {

  const request = {
    query: `mutation{
      login(email:"${email}" password:"${password}"){
      token
      } 
    }`
  }

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })
  .then(response => response.json())
  .catch(err => {
    return{
      data: {login: null},
      errors:[{message: err.message,}]
    }
  })
  .then(data => {
    if (data.data.login === null) {
      loginError(data.errors);
    } else {
      setToken(data.data.login.token);
      loginError([]);
    }
  })
}
