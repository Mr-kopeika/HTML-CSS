'use strict';
import { createFormValidate, isFields } from "./validation.js";
//мне не очень нравится, что enum и type Inputs создаются отдельно
//но как создать Inputs из вот этих вот enum я не нашел
var FormElement;
(function (FormElement) {
    FormElement[FormElement["[object HTMLInputElement]"] = 0] = "[object HTMLInputElement]";
    FormElement[FormElement["[object HTMLOutputElement]"] = 1] = "[object HTMLOutputElement]";
    FormElement[FormElement["[object HTMLButtonElement]"] = 2] = "[object HTMLButtonElement]";
    FormElement[FormElement["[object HTMLSelectElement]"] = 3] = "[object HTMLSelectElement]";
    FormElement[FormElement["[object HTMLTextAreaElement]"] = 4] = "[object HTMLTextAreaElement]";
})(FormElement || (FormElement = {}));
const activePage = 'active-item';
let currentPage = correctType(document.querySelector('#navbar > button'), HTMLButtonElement);
const navigationHistory = [currentPage];
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
function isType(s, t, message) {
    if (s instanceof t)
        return true;
    else {
        console.error('Error: ', message ? message : `${s} is not ${t}`);
        return false;
    }
}
function correctType(s, t, message) {
    if (s instanceof t)
        return s;
    else {
        throw new Error(message ? message : `${s} is not ${t}`);
    }
}
function isNull(arg) {
    if (arg == null) {
        console.error(`${arg} is null or undefined`);
        return true;
    }
    else
        return false;
}
function isFormElement(arg) {
    return (arg.toString() in FormElement) ? true : false;
}
function changeCurrentPage(page) {
    if (isNull(currentPage))
        return;
    currentPage.classList.remove(activePage);
    currentPage = page;
    currentPage.classList.add(activePage);
}
function setPageTitle(title) {
    const pageTitle = document.getElementById('page-title');
    if (isNull(pageTitle))
        return;
    pageTitle.textContent = title;
}
function changePage(event) {
    const target = correctType(event.target, Element);
    const page = correctType(target.closest('button'), HTMLButtonElement);
    if (isNull(navbar) || isNull(navbar.contains(page))) {
        return;
    }
    const out = correctType(page.querySelector('output'), HTMLOutputElement);
    out.textContent += '+';
    if (isNull(currentPage) || isNull(page.dataset.name) || page == currentPage)
        return;
    setPageTitle(page.dataset.name);
    changeCurrentPage(page);
    if (!isType(currentPage, HTMLButtonElement))
        return;
    navigationHistory.push(currentPage);
}
function backPage() {
    if (navigationHistory.length <= 1) {
        window.scrollTo(0, 0);
        return;
    }
    ;
    navigationHistory.pop();
    const page = navigationHistory[navigationHistory.length - 1];
    changeCurrentPage(page);
    if (isNull(currentPage.dataset.name))
        return;
    setPageTitle(currentPage.dataset.name);
    window.scrollTo(0, 0);
}
function createInvalid(element, text) {
    element.insertAdjacentHTML('beforeend', `<p class="invalid">${text}</p>`);
}
function removeInvalid() {
    if (isNull(createForm))
        return;
    const invalids = createForm.querySelectorAll('form label ~ p');
    for (let invalid of invalids) {
        invalid.remove();
    }
}
function formSubmit(event) {
    event.preventDefault();
    if (!isType(createForm, HTMLFormElement))
        return;
    const formData = new FormData(createForm);
    createFormValidate(formData)
        .then((validationResult) => {
        if (validationResult.valid) {
            saveForm(formData);
            return;
        }
        for (let field of createForm.elements) {
            if (isFormElement(field) && isFields(field.name)) {
                let text = validationResult.detail[field.name];
                if (!text)
                    continue;
                if (field.parentElement && field.parentElement.querySelector('p') == null) {
                    createInvalid(field.parentElement, text);
                }
            }
        }
    })
        .catch((error) => alert(error));
}
function saveForm(formData) {
    const table = document.getElementById('user-courses');
    table.style.visibility = 'visible';
    const output = correctType(table.querySelector('tbody'), HTMLTableSectionElement);
    const template = correctType(document.getElementById('course-line'), HTMLTemplateElement);
    const clone = correctType(template.content.cloneNode(true), DocumentFragment);
    fillTableRow(formData, clone);
    output.append(clone);
    formCounter++;
    if (!isType(createForm, HTMLFormElement))
        return;
    createForm.reset();
    const selectEvent = new Event('change');
    select.dispatchEvent(selectEvent);
}
function fillTableRow(formData, row) {
    const tds = row.querySelectorAll('td');
    const type = formData.get('type');
    const title = formData.get('title');
    const description = formData.get('description');
    if (isNull(type) || isNull(title) || isNull(description))
        return;
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
function resetApplication() {
    if (!isType(createForm, HTMLFormElement))
        return;
    createForm.reset();
    const entries = document.querySelectorAll('#user-courses tr:nth-child(n + 2)');
    for (let entry of entries) {
        entry.remove();
    }
    const page = document.querySelector('#navbar > button');
    if (!page)
        return;
    changeCurrentPage(page);
    const pluses = document.querySelectorAll('#navbar output');
    for (let plus of pluses)
        plus.textContent = '';
    if (!currentPage.dataset.name)
        return;
    setPageTitle(currentPage.dataset.name);
    navigationHistory.length = 0;
    navigationHistory.push(currentPage);
    formCounter = 0;
    const table = document.getElementById('user-courses');
    if (table) {
        table.style.visibility = 'hidden';
    }
}
function selectType(event) {
    const target = correctType(event.target, HTMLSelectElement);
    const type = target.value;
    if (!isType(createForm, HTMLFormElement))
        return;
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
            break;
    }
}
//# sourceMappingURL=main.js.map