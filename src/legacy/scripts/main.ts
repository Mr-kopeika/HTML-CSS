'use strict';

import { createFormValidate, isFields} from "./validation.js";

enum FormElement {
  '[object HTMLInputElement]',
  '[object HTMLOutputElement]',
  '[object HTMLButtonElement]',
  '[object HTMLSelectElement]',
  '[object HTMLTextAreaElement]',
}
type Inputs = HTMLInputElement | HTMLOutputElement |
  HTMLButtonElement | HTMLSelectElement | HTMLTextAreaElement;

type Constructor<T> = new (...args: any[]) => T;

const activePage = 'active-item';


let currentPage = correctType<HTMLButtonElement>(
  document.querySelector('#navbar > button'),
  HTMLButtonElement
);
const navigationHistory: HTMLButtonElement[] = [currentPage];
let formCounter = 0;

const navbar = correctType(document.getElementById('navbar'), HTMLElement);
navbar.addEventListener('click', changePage);

const back = correctType(document.getElementById('back-button'), HTMLButtonElement);
back.addEventListener('click', backPage);

const createForm = correctType(document.getElementById('create-form'), HTMLFormElement);
createForm.addEventListener('submit', formSubmit);
createForm.addEventListener('input', removeInvalid);

const select = correctType(createForm['type'], HTMLSelectElement);
select.addEventListener('change', selectType);

const exitButton = correctType(document.getElementById('exit'), HTMLButtonElement);
exitButton.addEventListener('click', resetApplication);

const selectEvent = new Event('change');
select.dispatchEvent(selectEvent);


function isType<T>(s: any, t: Constructor<T>, message?: string): s is T {
  if (s instanceof t) return true;
  else {
    console.error('Error: ', message ? message : `${s} is not ${t}`);
    return false;
  }
}

function correctType<T>(s: any, t: Constructor<T>, message?: string): T {
  if (s instanceof t) return s;
  else {
    throw new Error(message ? message : `${s} is not ${t}`);
  }
}

function isNull(arg: any): arg is null | undefined {
  if (arg == null) {
    console.error(`${arg} is null or undefined`);
    return true;
  }
  else return false;
}

function isFormElement(arg: any): arg is Inputs {
  return (arg.toString() in FormElement) ? true : false;
}

function changeCurrentPage(page: HTMLButtonElement): void {

  if (isNull(currentPage)) return;
  currentPage.classList.remove(activePage);
  currentPage = page;
  currentPage.classList.add(activePage);
}

function setPageTitle(title: string): void {
  const pageTitle = document.getElementById('page-title');
  if (isNull(pageTitle)) return;
  pageTitle.textContent = title;
}

function changePage(event: Event): void {

  const target = correctType(event.target, Element);

  const page = correctType(target.closest('button'), HTMLButtonElement);

  if (isNull(navbar) || isNull(navbar.contains(page))) {
    return;
  }

  const out = correctType(page.querySelector('output'), HTMLOutputElement);
  out.textContent += '+';

  if (isNull(currentPage) || isNull(page.dataset.name) || page == currentPage) return;

  setPageTitle(page.dataset.name);
  changeCurrentPage(page);

  if (!isType(currentPage, HTMLButtonElement)) return;
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
  if (isNull(currentPage.dataset.name)) return;
  setPageTitle(currentPage.dataset.name);

  window.scrollTo(0, 0);
}

function createInvalid(element: Element, text: string): void {
  element.insertAdjacentHTML('beforeend', `<p class="invalid">${text}</p>`);
}

function removeInvalid(): void {
  if (isNull(createForm)) return;
  const invalids: NodeListOf<HTMLParagraphElement> = createForm.querySelectorAll('form label ~ p');
  for (let invalid of invalids) {
    invalid.remove();
  }
}

function formSubmit(event: Event): void {

  event.preventDefault();

  if (!isType(createForm, HTMLFormElement)) return;
  const formData: FormData = new FormData(createForm);

  createFormValidate(formData)

    .then((validationResult) => {

      if (validationResult.valid) {
        saveForm(formData);
        return;
      }

      for (let field of createForm.elements) {

        if (isFormElement(field) && isFields(field.name)) {
          let text = validationResult.detail[field.name];
          if (!text) continue;
          if (field.parentElement && field.parentElement.querySelector('p') == null) {
            createInvalid(field.parentElement, text);
          }
        }
      }
    })
    .catch((error) => alert(error));
}

function saveForm(formData: FormData): void {

  const table = document.getElementById('user-courses') as HTMLTableElement;
  table.style.visibility = 'visible';

  const output = correctType(table.querySelector('tbody'), HTMLTableSectionElement);
  const template = correctType(document.getElementById('course-line'), HTMLTemplateElement);
  const clone = correctType(template.content.cloneNode(true), DocumentFragment);

  fillTableRow(formData, clone);
  output.append(clone);

  formCounter++;
  if (!isType(createForm, HTMLFormElement)) return;

  createForm.reset();
  const selectEvent = new Event('change');
  select.dispatchEvent(selectEvent);
}

function fillTableRow(formData: FormData, row: DocumentFragment): void {

  const tds: NodeListOf<HTMLTableCellElement> = row.querySelectorAll('td');
  const type = formData.get('type');
  const title = formData.get('title');
  const description = formData.get('description');
  if (isNull(type) || isNull(title) || isNull(description)) return;

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

  if (!isType(createForm, HTMLFormElement)) return;
  createForm.reset();
  const entries: NodeListOf<HTMLTableRowElement> = document.querySelectorAll('#user-courses tr:nth-child(n + 2)');
  for (let entry of entries) { entry.remove(); }

  const page: HTMLButtonElement | null = document.querySelector('#navbar > button');
  if (!page) return;
  changeCurrentPage(page);

  const pluses: NodeListOf<HTMLOutputElement> = document.querySelectorAll('#navbar output');
  for (let plus of pluses) plus.textContent = '';

  if (!currentPage.dataset.name) return;
  setPageTitle(currentPage.dataset.name);
  navigationHistory.length = 0;
  navigationHistory.push(currentPage);
  formCounter = 0;


  const table = document.getElementById('user-courses');
  if (table) {
    table.style.visibility = 'hidden';
  }
}

function selectType(event: Event): void {

  const target = correctType(event.target, HTMLSelectElement);
  const type: string = target.value;

  if (!isType(createForm, HTMLFormElement)) return;

  const titleInput = correctType(createForm['title'], HTMLInputElement);
  const descriptionInput = correctType(createForm['description'], HTMLTextAreaElement);

  const titleParent = correctType(titleInput.previousElementSibling, HTMLElement);
  const descriptionParent = correctType(descriptionInput.previousElementSibling, HTMLElement);

  const titleOutput = correctType(titleParent.querySelector('output'), HTMLOutputElement);
  const descriptionOutput = correctType(descriptionParent.querySelector('output'), HTMLOutputElement);

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

