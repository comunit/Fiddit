import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {

  // get search term
  const searchTerm = searchInput.value;

  // get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  // get limit
  const searchLimit = document.getElementById('limit').value;

  // check input
  if (searchTerm === '') {
    // show message
    showMessage('Please add a search term', 'alert-danger');
  }

  // clear input
  searchInput.value = '';

  // search reddit
  reddit.search(searchTerm, searchLimit, sortBy)
  .then(results => {
    let output = '<div class="card-columns">';
    // loop through posts
    results.forEach(posts => {
      // check for image
      let image = posts.preview ? posts.preview.images[0].source.url : 'http://ichef.bbci.co.uk/news/976/cpsprodpb/23C1/production/_83835190_maxresdefault.jpg';

      output += `
      <div class="card">
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-block" style="padding: 10px">
          <h4 class="card-title" style="font-size: 1rem">${posts.title}</h4>
          <p class="card-text">${truncateText(posts.selftext, 100)}</p>
          <a href="${posts.url}" target="_blank" class="btn btn-primary">Read More</a>
          <hr>
          <span class="badge badge-secondary">Subreddit: ${posts.subreddit}</span>
          <span class="badge badge-dark">Score: ${posts.score}</span>
        </div>
      </div>
      `;
    });
    output +=  '</div>'
    document.getElementById('results').innerHTML = output;
  })

  e.preventDefault();
});

// show message
function showMessage(message, className) {
  // create div
  const div = document.createElement('div');
  // add classes
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent container
  const searchContainer = document.getElementById('search-container');
  // get search
  const search = document.getElementById('search');
  // insert message
  searchContainer.insertBefore(div, search);

  // timeout alert
  setTimeout(() => document.querySelector('.alert').remove(), 3000)
}

// truncate text
function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit);
  if(shortened == -1) return text;
  return text.substring(0, shortened);
}