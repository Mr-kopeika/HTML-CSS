'use strict';

import createFormValidate from "./validation.js";

const activePage = 'active-item';

let currentPage: HTMLButtonElement = document.querySelector('#navbar > button');
const navigationHistory: HTMLButtonElement[] = [currentPage];
let formCounter = 0;


const navbar: HTMLElement = document.getElementById('navbar');
navbar.addEventListener('click', changePage);

const back = document.getElementById('back-button') as HTMLButtonElement;
back.addEventListener('click', backPage);

const createForm = document.forms['create-form' as keyof typeof document.forms] as HTMLFormElement;
createForm.addEventListener('submit', formSubmit);
createForm.addEventListener('input', removeInvalid);

const select: HTMLSelectElement = createForm['type'];
select.addEventListener('change', selectType);

const exitButton = document.getElementById('exit') as HTMLButtonElement;
exitButton.addEventListener('click', resetApplication);



const selectEvent = new Event('change');
select.dispatchEvent(selectEvent);



function changeCurrentPage(page: HTMLButtonElement): void {
  currentPage.classList.remove(activePage);
  currentPage = page;
  currentPage.classList.add(activePage);
}

function setPageTitle(title: string): void {
  document.getElementById('page-title').textContent = title;
}

function changePage(event: Event): void {

  const page: HTMLButtonElement = (event.target as HTMLElement).closest('button');


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

function backPage(): void {
  if (navigationHistory.length <= 1) {
    window.scrollTo(0, 0);
    return;
  };

  navigationHistory.pop();

  const page: HTMLButtonElement = navigationHistory[navigationHistory.length - 1];

  changeCurrentPage(page);
  setPageTitle(currentPage.dataset.name);

  window.scrollTo(0, 0);
}

function createInvalid(element: Element, text: string): void {
  element.insertAdjacentHTML('beforeend', `<p class="invalid">${text}</p>`);
}

function removeInvalid(): void {
  const invalids: NodeListOf<HTMLParagraphElement>  = createForm.querySelectorAll('form label ~ p');
  for (let invalid of invalids) {
    invalid.remove();
  }
}

function formSubmit(event: Event): void {

  event.preventDefault();

  const formData: FormData = new FormData(createForm);

  createFormValidate(formData)

    .then((validationResult) => {
      if (validationResult.valid) saveForm(formData)
      else {
        for (let field of createForm.elements) {

          const text: string = validationResult.detail[(field as HTMLInputElement).name];

          if (text) createInvalid(field.parentElement, text);
        }
      }
    })
    // .catch((error) => alert(error));
}

function saveForm(formData: FormData): void {

  const table = document.getElementById('user-courses') as HTMLTableElement;
  table.style.visibility = 'visible';

  const output: HTMLTableSectionElement = table.querySelector('tbody');
  const template = document.getElementById('course-line') as HTMLTemplateElement;
  const clone: Node = (template as HTMLTemplateElement).content.cloneNode(true);

  fillTableRow(formData, clone as HTMLTableRowElement);
  output.append(clone);

  formCounter++;
  createForm.reset();
}

function fillTableRow(formData: FormData, row: HTMLTableRowElement): void {

  const tds: NodeListOf<HTMLTableCellElement> = row.querySelectorAll('td');
  const type: FormDataEntryValue = formData.get('type');
  const title: FormDataEntryValue = formData.get('title');
  const description: FormDataEntryValue = formData.get('description');


  for (let td of tds) {
    switch (td.dataset.name) {
      case 'number':
        td.textContent = (formCounter + 1).toString();
        break;
      case 'type':
        td.textContent = type.toString();
        break;
      case 'title':
        td.textContent = title.toString();
        break;
      case 'description':
        td.textContent = description.toString();
        break;
      default:
        td.textContent = 'none';
        break;
    }
  }
}

function resetApplication(): void {
  createForm.reset();
  const entries: NodeListOf<HTMLTableRowElement> = document.querySelectorAll('#user-courses tr:nth-child(n + 2)');
  for (let entry of entries) { entry.remove(); }

  const page: HTMLButtonElement = document.querySelector('#navbar > button');
  changeCurrentPage(page);

  const pluses: NodeListOf<HTMLOutputElement> = document.querySelectorAll('#navbar output');
  for (let plus of pluses) plus.textContent = '';

  setPageTitle(currentPage.dataset.name);
  navigationHistory.length = 0;
  navigationHistory.push(currentPage);
  formCounter = 0;

  document.getElementById('user-courses').style.visibility = 'hidden';
}

function selectType(event: Event): void {
  const type: string = (event.target as HTMLSelectElement).value;
  const titleOutput: HTMLOutputElement = (createForm['title'] as any as HTMLInputElement).previousElementSibling.querySelector('output');
  const descriptionOutput: HTMLOutputElement = (createForm['description'] as HTMLInputElement).previousElementSibling.querySelector('output');

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
