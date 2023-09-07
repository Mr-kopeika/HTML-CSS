'use strict';

let currentPage = document.querySelector('.active-item');
let navigationHistory = [currentPage];
let isOpen = true;


function changePage() {
  if (currentPage.isEqualNode(this)) return;

  let pageName = document.querySelector('.page-name');

  pageName.textContent = this.getAttribute('value');

  currentPage.classList.toggle('active-item');
  this.classList.toggle('active-item');

  currentPage = this;
  navigationHistory.push(currentPage);
}

function backPage() {
  if (navigationHistory.length <= 1) return;

  let pageName = document.querySelector('.page-name');

  navigationHistory.pop();

  currentPage.classList.toggle('active-item');
  currentPage = navigationHistory[navigationHistory.length - 1];
  currentPage.classList.toggle('active-item');
  pageName.textContent = currentPage.getAttribute('value');
}

function collapseSidebar() {
  if (isOpen) {
    document.documentElement.style.setProperty('--sidebar-width', '50px');

    for (let i = 0; i < pages.length; i++) {
      pages[i].textContent = i + 1;
    }

  } else {
    document.documentElement.style.setProperty('--sidebar-width', '350px');

    for (let page of pages) {
      page.textContent = page.getAttribute('value');
    }

  }

  document.querySelector('.sidebar').classList.toggle('sidebar-close');
  isOpen = !isOpen;
}


let pages = document.body.querySelectorAll('.navbar-item');

for (let page of pages) {
  page.onclick = changePage;
}

document.querySelector('.back').onclick = backPage;

document.querySelector('.collapse-icon-close').onclick = collapseSidebar;