'use strict';

import createFormValidate from "./validation.js";

const activePage = 'active-item';

let currentPage = document.querySelector('#navbar > button');
let navigationHistory = [currentPage];
let isOpen = true;
let formCounter = 0;


let navbar = document.getElementById('navbar');
navbar.addEventListener('click', changePage);

let back = document.getElementById('back-button');
back.addEventListener('click', backPage);

let createForm = document.forms['create-form'];
createForm.addEventListener('submit', formSubmit);
createForm.addEventListener('input', removeInvalid);

let select = createForm.elements.type;
select.addEventListener('change', selectType);

let exitButton = document.getElementById('exit');
exitButton.addEventListener('click', resetApplication);



let selectEvent = new Event('change');
select.dispatchEvent(selectEvent);



function changeCurrentPage(page) {
  currentPage.classList.remove(activePage);
  currentPage = page;
  currentPage.classList.add(activePage);
}

function setPageTitle(title) {
  document.getElementById('page-title').textContent = title;
}

function changePage(event) {

  let page = event.target.closest('button');


  //Существует, не текущая страница, находится внутри навигационной панели
  if (!event.target
    || !navbar.contains(page)) {
    return;
  }

  page.querySelector('output').textContent += '+';

  if (page == currentPage) return;

  setPageTitle(page.dataset.name);
  changeCurrentPage(page);


  navigationHistory.push(currentPage);
}

function backPage() {
  if (navigationHistory.length <= 1) {
    window.scrollTo(0, 0);
    return;
  };

  navigationHistory.pop();

  let page = navigationHistory[navigationHistory.length - 1];

  changeCurrentPage(page);
  setPageTitle(currentPage.dataset.name);

  window.scrollTo(0, 0);
}

function createInvalid(element, text) {
  element.insertAdjacentHTML('beforeend', `<p class="invalid">${text}</p>`);
}

function removeInvalid() {
  let invalids = createForm.querySelectorAll('form label ~ p');
  for (let invalid of invalids) {
    invalid.remove();
  }
}

function formSubmit(event) {

  event.preventDefault();

  let formData = new FormData(createForm);

  createFormValidate(formData)

    .then((validationResult) => {
      if (validationResult.valid) saveForm(formData)
      else {
        for (let field of createForm.elements) {

          let text = validationResult.detail[field.name];

          if (text) createInvalid(field.parentElement, text);
        }
      }
    })
    // .catch((error) => alert(error));

}

function saveForm(formData) {

  let table = document.getElementById('user-courses');
  table.style.visibility = 'visible';

  let output = table.querySelector('tbody');
  let template = document.getElementById('course-line');
  let clone = template.content.cloneNode(true);

  fillTableRow(formData, clone);
  output.append(clone);

  formCounter++;
  createForm.reset();
}

function fillTableRow(formData, row) {

  let tds = row.querySelectorAll('td');
  let type = formData.get('type');
  let title = formData.get('title');
  let description = formData.get('description');


  for (let td of tds) {
    switch (td.dataset.name) {
      case 'number':
        td.textContent = formCounter + 1;
        break;
      case 'type':
        td.textContent = type;
        break;
      case 'title':
        td.textContent = title;
        break;
      case 'description':
        td.textContent = description;
        break;
      default:
        td.textContent = 'none';
        break;
    }
  }
}

function resetApplication() {
  createForm.reset();
  let entries = document.querySelectorAll('#user-courses tr:nth-child(n + 2)');
  for (let entry of entries) { entry.remove(); }

  let page = document.querySelector('#navbar > button');
  changeCurrentPage(page);

  let pluses = document.querySelectorAll('#navbar output');
  for (let plus of pluses) { plus.textContent = '' };

  setPageTitle(currentPage.dataset.name);
  navigationHistory = [currentPage];
  formCounter = 0;

  document.getElementById('user-courses').style.visibility = 'hidden';
}

function selectType(event) {
  let type = event.target.value;
  let titleOutput = createForm['title'].previousElementSibling.querySelector('output');
  let descriptionOutput = createForm['description'].previousElementSibling.querySelector('output');

  switch (type) {
    case 'Computer Science':
      titleOutput.textContent = '*';
      descriptionOutput.textContent = "*";
      break;
    case 'Art':
      titleOutput.textContent = '*';
      descriptionOutput.textContent = "";
      break;
    case 'Music':
      titleOutput.textContent = '';
      descriptionOutput.textContent = "*";
      break
  }
}
