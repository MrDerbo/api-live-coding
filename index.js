import { deleteTodos, getTodos, postTodos } from "./api.js";
import { loginFinction } from "./components/login.js";
 
let tasks = [];
    const host = 'https://webdev-hw-api.vercel.app/api/v2/todos';
    let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';
    token = null;

    const fetchTodosAndRender = () => {
      return getTodos({ token })
        .then((responseData) => {
          tasks = responseData.todos;
          renderApp();
        });
    };

    const renderApp= () => {
      const appEl = document.getElementById('app');

      if (!token) {
      loginFinction({ appEl, 
        setToken: (newToken) => {
         token = newToken;
      }, fetchTodosAndRender })
      return;
    }
    
      const tasksHtml = tasks
        .map((task) => {
          return `
          <li class="task">
            <p class="task-text">
              ${task.text} (Создал: ${task.user?.name ?? 'Неизвестно'})
              <button data-id="${task.id}" class="button delete-button">Удалить</button>
            </p>
          </li>`;
        })
        .join("");
      
      const appHtml = `
        <h1>Список задач</h1>
      <ul class="tasks" id="list">
        ${tasksHtml}
      </ul>
      <br />
      <div class="form">
        <h3 class="form-title">Форма добавления</h3>
        <div class="form-row">
          Что нужно сделать:
          <input
            type="text"
            id="text-input"
            class="input"
            placeholder="Выпить кофе"
          />
        </div>
        <br />
        <button class="button" id="add-button">Добавить</button>
      </div>
      `;

      appEl.innerHTML = appHtml;

      // Назначаем обработчики событий после рендеринга
      const deleteButtons = document.querySelectorAll(".delete-button");
      const addButton = document.getElementById("add-button");
      const textInput = document.getElementById("text-input");

      for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation();

          const id = deleteButton.dataset.id;

          deleteTodos({ id, token })
            .then((responseData) => {
              tasks = responseData.todos;
              renderApp();
            });
        });
      }

      addButton.addEventListener("click", () => {
        if (textInput.value === "") {
          return;
        }

        addButton.disabled = true;
        addButton.textContent = "Задача добавляется...";

        postTodos({
            text: textInput.value,
            token
        })
          .then(() => {
            textInput.value = "";
          })
          .then(() => {
            return fetchTodosAndRender();
          })
          .then(() => {
            addButton.disabled = false;
            addButton.textContent = "Добавить";
          })
          .catch((error) => {
            console.error(error);
            alert("Кажется, у вас проблемы с интернетом, попробуйте позже");
            addButton.disabled = false;
            addButton.textContent = "Добавить";
          });
      });
    };

    renderApp();