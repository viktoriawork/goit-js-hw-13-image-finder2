export default class ApiServices {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async searchPhoto () {

    const options = {
      API_KEY: '22396555-b1231d50c505bf0243236f3be',
      BASE_URL: 'https://pixabay.com/api/?image_type=photo&orientation=horizontal',
    }
    return fetch(`${options.BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${options.API_KEY}`)
    .then(response => response.json())
    .then(data => {
      this.incrementPage()
      return data.hits;
    })
    .catch(error => error);
    
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

}



