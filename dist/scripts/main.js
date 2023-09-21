'use strict';
import createFormValidate from "./validation.js";
const activePage = 'active-item';
let currentPage = document.querySelector('#navbar > button');
const navigationHistory = [currentPage];
let formCounter = 0;
const navbar = document.getElementById('navbar');
navbar.addEventListener('click', changePage);
const back = document.getElementById('back-button');
back.addEventListener('click', backPage);
const createForm = document.forms['create-form'];
createForm.addEventListener('submit', formSubmit);
createForm.addEventListener('input', removeInvalid);
const select = createForm['type'];
select.addEventListener('change', selectType);
const exitButton = document.getElementById('exit');
exitButton.addEventListener('click', resetApplication);
const selectEvent = new Event('change');
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
    const page = event.target.closest('button');
    //Существует, не текущая страница, находится внутри навигационной панели
    if (!event.target
        || !navbar.contains(page)) {
        return;
    }
    page.querySelector('output').textContent += '+';
    if (page == currentPage)
        return;
    setPageTitle(page.dataset.name);
    changeCurrentPage(page);
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
    setPageTitle(currentPage.dataset.name);
    window.scrollTo(0, 0);
}
function createInvalid(element, text) {
    element.insertAdjacentHTML('beforeend', `<p class="invalid">${text}</p>`);
}
function removeInvalid() {
    const invalids = createForm.querySelectorAll('form label ~ p');
    for (let invalid of invalids) {
        invalid.remove();
    }
}
function formSubmit(event) {
    event.preventDefault();
    const formData = new FormData(createForm);
    createFormValidate(formData)
        .then((validationResult) => {
        if (validationResult.valid)
            saveForm(formData);
        else {
            for (let field of createForm.elements) {
                const text = validationResult.detail[field.name];
                if (text)
                    createInvalid(field.parentElement, text);
            }
        }
    });
    // .catch((error) => alert(error));
}
function saveForm(formData) {
    const table = document.getElementById('user-courses');
    table.style.visibility = 'visible';
    const output = table.querySelector('tbody');
    const template = document.getElementById('course-line');
    const clone = template.content.cloneNode(true);
    fillTableRow(formData, clone);
    output.append(clone);
    formCounter++;
    createForm.reset();
}
function fillTableRow(formData, row) {
    const tds = row.querySelectorAll('td');
    const type = formData.get('type');
    const title = formData.get('title');
    const description = formData.get('description');
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
    createForm.reset();
    const entries = document.querySelectorAll('#user-courses tr:nth-child(n + 2)');
    for (let entry of entries) {
        entry.remove();
    }
    const page = document.querySelector('#navbar > button');
    changeCurrentPage(page);
    const pluses = document.querySelectorAll('#navbar output');
    for (let plus of pluses)
        plus.textContent = '';
    setPageTitle(currentPage.dataset.name);
    navigationHistory.length = 0;
    navigationHistory.push(currentPage);
    formCounter = 0;
    document.getElementById('user-courses').style.visibility = 'hidden';
}
function selectType(event) {
    const type = event.target.value;
    const titleOutput = createForm['title'].previousElementSibling.querySelector('output');
    const descriptionOutput = createForm['description'].previousElementSibling.querySelector('output');
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