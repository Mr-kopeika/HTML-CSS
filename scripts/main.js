'use strict';


let currentPage = document.querySelector('.active-item');
let navigationHistory = [currentPage];
let isOpen = true;
let formCounter = 0;

/**
 * 1. Не использовать классы для поиска элементов
 * 2. <output>
 * 3. setPageTitle(page.dataset.name)
 * 4. const for 'active-item'
 * 5. Добавить SVG иконку в каждую кнопку, делегирование оставляем, но решаем проблему event.target === svg
 * 6. Добавить activate/deactivate для кнопок вместо copy/paste
 * 7. При клике на кнопку добавить новый символ "+" в нее, накапливаем их
 * 8. Sidebar без JS. Положим стили в отдельный файл
 * 9. PR
 * 10. async/await
 * 11. asyncValidate(values).then((validationResult) => { ... })
 *     Задать структуру для validationResult: либо успех, либо ошибку. Если ошибка, то знать какие поля с ошибками и какая именно ошибка
 *     Промис валидации может кинуть ошибку если title равен 111.
 * 12. Fix форму! Более строго, чтобы перемена полей местами не ломала JS код
 * 13. Добыть данные из формы без обращения к полям
 * 14. Submit ждет валидированные данные.
 * 15. Добавлять строку в таблицу используя template строки, не забудь про output
 *
 * ---
 *
 * TYPESCRIPT!!
 * 1. Не использовать `any`
 * 2. return type для функций
 * 3. interface для структур данных
 *
 * https://www.typescriptlang.org/docs/handbook/utility-types.html
 * https://www.typescriptlang.org/docs/handbook/enums.html
 * https://www.typescriptlang.org/docs/handbook/modules.html
 * tsc / tsconfig
 * package.json → scripts → "dev" чтобы TS перекомпилировал код при каждом изменении
 *    src с TS скриптами бюилдится в dist
 */

let sidebar = document.querySelector('.sidebar');
sidebar.addEventListener('click', changePage);

let back = document.querySelector('.back');
back.addEventListener('click', backPage);

let collapse = document.querySelector('.collapse-icon-close');
collapse.addEventListener('click', collapseSidebar);

let createForm = document.forms['create-form']
createForm.addEventListener('submit', validationCreateForm);

for (let formElement of createForm.elements) {
  formElement.addEventListener('input', removeInvalid);
}

let select = document.querySelector('.type-selector');
select.addEventListener('change', selectType);

let resetButton = document.querySelector('.exit-button');
resetButton.addEventListener('click', resetApplication);



let selectEvent = new Event('change');
select.dispatchEvent(selectEvent);



function changePage(event) {

  let page = event.target;

  if (!page
    || !(page.classList.contains('navbar-item'))
    || page.classList.contains('active-item')) {
    return;
  }

  // setPageTitle(page.dataset.name)
  let title = document.querySelector('.page-name');
  title.textContent = page.dataset.name;

  currentPage.classList.remove('active-item');
  page.classList.add('active-item');

  currentPage = page;
  navigationHistory.push(currentPage);
}

function backPage() {
  if (navigationHistory.length <= 1) {
    window.scrollTo(0, 0);
    return;
  };

  let pageName = document.querySelector('.page-name');

  navigationHistory.pop();

  currentPage.classList.remove('active-item');
  currentPage = navigationHistory[navigationHistory.length - 1];
  currentPage.classList.add('active-item');

  pageName.textContent = currentPage.dataset.name;

  window.scrollTo(0, 0);
}

function collapseSidebar() {

  let pages = document.querySelectorAll('.navbar-item');
  let exit = document.querySelector('.exit-button');


  if (isOpen) {
    document.documentElement.style.setProperty('--sidebar-width', '50px');


    for (let i = 0; i < pages.length; i++) {
      pages[i].textContent = i + 1;
    }

    exit.textContent = 'E';

  } else {
    document.documentElement.style.setProperty('--sidebar-width', '350px');

    for (let page of pages) {
      page.textContent = page.dataset.name;
    }

    exit.textContent = 'Exit';
  }

  document.querySelector('.sidebar').classList.toggle('sidebar-close');
  isOpen = !isOpen;
}

function validationCreateForm(event) {

  event.preventDefault();

  let form = event.target;
  let title = form[0];
  let description = form[1];
  let type = form[2];
  let button = form[3];


  let promise = new Promise((resolve) => {

    setTimeout(() => { resolve() }, 2000);
    button.textContent = 'Loading...';
  })

  promise.then(() => {
    switch (type.value) {
      case 'Computer Science':
        if (!title.value && !form.querySelector('.title > .invalid')) {
          createInvalid('.create-form .title', 'Required!');
        }
        if (!description.value && !form.querySelector('.description > .invalid')) {
          createInvalid('.create-form .description', 'Required!');
        }

        if (title.value && description.value) {
          saveForm();
        }
        break;
      case 'Art':
        if (!title.value && !form.querySelector('.title > .invalid')) {
          createInvalid('.create-form .title', 'Required!');
        } else saveForm();
        break;
      case 'Music':
        if (!description.value && !form.querySelector('.description > .invalid')) {
          createInvalid('.create-form .description', 'Required!');
        } else saveForm();
        break;
      default:
        if (!type.value && !form.querySelector('.type > .invalid')) {
          createInvalid('.create-form .type', 'Choose, please!');
        }
    }
    button.textContent = 'Save';
  })

}

function createInvalid(selector, text) {
  document
    .querySelector(selector)
    .insertAdjacentHTML('beforeend', `<p class="invalid">${text}</p>`);
}

function removeInvalid() {
  let invalids = document.forms['create-form'].querySelectorAll('.invalid');
  for (let invalid of invalids) {
    invalid.remove();
  }
}

function saveForm() {
  let table = document.querySelector('table.courses');
  table.style.visibility = 'visible';

  let form = document.forms['create-form'];
  let title = form.elements[0];
  let description = form.elements[1];
  let type = form.elements[2];

  let tr = document.createElement('tr');

  let td = document.createElement('td');
  td.textContent = formCounter + 1;
  tr.append(td);

  td = document.createElement('td');
  td.textContent = type.value;
  tr.append(td);

  td = document.createElement('td');
  td.textContent = title.value;
  tr.append(td);

  td = document.createElement('td');
  td.textContent = description.value;
  tr.append(td);

  table.append(tr);

  formCounter++;
  form.reset();
}

function resetApplication() {
  document.forms['create-form'].reset();
  let entries = document.querySelectorAll('.courses tr:nth-child(n + 2)');
  for (let entry of entries) { entry.remove(); }

  currentPage.classList.remove('active-item');
  currentPage = document.querySelector('.navbar-item');
  currentPage.classList.add('active-item');

  document.querySelector('.page-name').textContent = currentPage.dataset.name;
  navigationHistory = [currentPage];
  formCounter = 0;

  document.querySelector('table.courses').style.visibility = 'hidden';
}

function selectType (event) {
  let type = event.target.value;

  switch (type) {
    case 'Computer Science':
      document.querySelector('.title-label').textContent = 'Title*';
      document.querySelector('.description-label').textContent = 'Description*';
      break;
    case 'Art':
      document.querySelector('.title-label').textContent = 'Title*';
      document.querySelector('.description-label').textContent = 'Description';
      break;
    case 'Music':
      document.querySelector('.title-label').textContent = 'Title';
      document.querySelector('.description-label').textContent = 'Description*';
      break
  }
}