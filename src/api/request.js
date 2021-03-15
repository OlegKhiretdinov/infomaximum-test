const url = 'http://localhost:4000/api';

export const  sendLoginData = (email, password, loginError, setToken) => {

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
    if (data.errors) {
      loginError(data.errors);
    } else {
      setToken(data.data.login.token);
      loginError([]);
    }
  })
}

export const signUp = (firstName, secondName, email, password, loginError, setToken) => {
  const request = {
    query: `mutation{
      signup(firstName:"${firstName}" secondName:"${secondName}" email:"${email}" password:"${password}")
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
  .catch(err => ({
    data: {signup: null},
    errors:[{message: err.message}]
  }))
  .then(data => {
    if(data.data.signup === null) {
      loginError(data.errors);
    } else {
      setToken(data.data.signup);
      loginError([])
    }
  })
}

export const getCurrentUserData = (token, setUserData) => {
  const request = {
    query: `{currentUser {
      id
      firstName,
      secondName,
      email
    }}`
  }

  return fetch(url, {
    method: 'POST',
    headers: {
      "authorization": `bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  })
  .then(response => response.json())
  .then(data => setUserData(data.data.currentUser))
}


export const editCurrentUser = (token, id, fields) => {
  const changeFields = Object.entries(fields)
    .filter(item => item[1])
    .map(item => `${item[0]}:"${item[1]}"`)
    .join(' ')

  const request = {
    query: `mutation{
      editUser(id: ${id} ${changeFields}){
        id
        firstName,
        secondName,
        email
      }
    }`
  }

  return fetch(url, {
    method: 'POST',
    headers: {
      "authorization": `bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  }).then(response => response.json())
  .catch(err => ({errors: [{message: err.message}]}))
}

export const getProcessList = (token, setProcessLis) => {
  const request = {
    query: `{
      processList{
        id
        name
        numberOfExecutions
        averageLeadTime
        averageActiveTime
        employeesInvolvedProcess
        numberOfScenarios
        start
        end
        loading
      }
    }`
  }
  return fetch(url, {
    method: 'POST',
    headers: {
      "authorization": `bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  })
  .then(response => response.json())
  .then(data => setProcessLis(data.data.processList))
}
