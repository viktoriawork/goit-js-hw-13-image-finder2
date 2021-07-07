import './sass/main.scss';
import ApiServices from './apiService';
import articlesTpl from './templates/articles.hbs';
const debounce = require('lodash.debounce')

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('#loadMore'),
  btnSubmit: document.querySelector('#btnSubmit'),
}

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMore.addEventListener('click', onLoadMore)
refs.loadMore.style.display = 'none'

const apiServices = new ApiServices();

function onSearch (e) {
  e.preventDefault();
  
  apiServices.query = e.currentTarget.elements.query.value;
  apiServices.resetPage()
  clearPage()
  apiServices.searchPhoto()
  .then(images => {
    markUpArticles(images);
    refs.loadMore.style.display = 'block'
    if (images.length < 12) refs.loadMore.style.display = 'none';
  })
  .catch(error => error)
  

}
function clearPage() {
  refs.gallery.innerHTML = '';
}

function onLoadMore() {
  
  refs.loadMore.disabled = true;
  apiServices.searchPhoto().then(images => {
    markUpArticles(images);
    scrollDown();
    refs.loadMore.disabled = false;
    if (images.length < 12) refs.loadMore.style.display = 'none';
  })
  
}

function markUpArticles (article) {
  refs.gallery.insertAdjacentHTML('beforeend', articlesTpl(article))

  
}
function scrollDown () {
  const element = document.querySelector('.gallery').lastElementChild;
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
    
}