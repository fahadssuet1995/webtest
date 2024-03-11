
  const searchButton = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchKeyword');
  const searchResults = document.getElementById('search-results');

  searchButton.addEventListener('click', () => {
        window.location.href = `results.html?input=${searchInput.value}`;

    
  });
  