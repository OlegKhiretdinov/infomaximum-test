const url = 'http://localhost:4000/api';

export const  sendLoginData = (email, password) => {

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
  .catch(err => ({errors:[{message: err.message,}]}))
}

export const SendSignUpData = (firstName, secondName, email, password) => {
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
  .catch(err => ({errors:[{message: err.message,}]}))
}

export const getCurrentUserData = (token) => {
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

export const getProcessList = (token) => {
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
}
