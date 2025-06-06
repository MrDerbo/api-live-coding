const host = 'https://webdev-hw-api.vercel.app/api/v2/todos';

export function getTodos({ token }) {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        }
      })
        .then((response) => {
            if (response.status === 401) {
                throw new Error('Нет авторизации')
            }
          return response.json();
        })
}


export function deleteTodos({ token, id }) {
    return fetch(host + '/' + id, {
        method: "DELETE",
        headers: {
            Authorization: token,
        }
      })
        .then((response) => {
          return response.json();
        })
}

export function postTodos({ token, text }) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
          text,
        }),
        headers: {
            Authorization: token,
        },
      })
        .then((response) => {
          return response.json();
        })
}

export function loginTodos({ login, password }) {
    return fetch('https://webdev-hw-api.vercel.app/api/user/login', {
        method: "POST",
        body: JSON.stringify({
          login,
          password
        }),
      })
        .then((response) => {
          return response.json();
        })
}