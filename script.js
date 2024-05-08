const openSidebar = document.getElementById('openSidebar');
const closeSidebar = document.getElementById('closeSidebar');
const sidebar = document.querySelector('.sidebar')
const cards = document.querySelector('.cards')
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');

if (window.innerWidth < 700) {
  sidebar.classList.add('hide-sidebar');
}
else{
  sidebar.classList.remove('hide-sidebar')
}

openSidebar.addEventListener('click', () => {
  sidebar.classList.remove('hide-sidebar')
})
closeSidebar.addEventListener('click', () => {
  sidebar.classList.add('hide-sidebar')
  
})




let games = [];

const fetchGames = async () => {
  try {
    const response = await fetch('./gamesData.json');
    const gameData = await response.json();
    games.push(gameData); 
    createGameCards(gameData);
  } catch (error) {
    console.error('Error fetching games:', error);
  }
}


const generateStars = (rating) => {
  return '<i class="ri-star-s-fill"></i>'.repeat(rating);
}


const createGameCards = (gameData) => {
  const fragment = document.createDocumentFragment();
  gameData.forEach((game) => {
    const card = createCard(game);
    fragment.appendChild(card);
  });
  cards.innerHTML = '';
  cards.appendChild(fragment);
}

// Create Card
const createCard = (game) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="img-container">
      <img src="${game.img}" alt="">
    </div>
    <div class="card-info">
      <span class="level">${game.level}</span>
      <h2 class="title">${game.title}</h2>
      <p class="description">${game.description}</p>
      <span class="category">${game.category}</span>
      <span class="rating">${generateStars(game.rating)}</span>
      <div class="pricing">
        <span class="discount">${game.discount * 100}%</span>
        <span class="price">$${game.price}</span>
      </div>
    </div>
  `;
  return card;
}


// Handle Search
const handleSearch = () => {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value.toLowerCase();
  let filteredGames = games[0];

  if (selectedCategory !== 'all') {
    filteredGames = filteredGames.filter(game => game.category.toLowerCase() === selectedCategory);
  }

  filteredGames = filteredGames.filter(game => game.title.toLowerCase().includes(searchText));
  renderFilteredGames(filteredGames);
};


// Render Filtered Games
const renderFilteredGames = (filteredGames) => {
  createGameCards(filteredGames);
}


// Event listeners
searchInput.addEventListener('input', handleSearch)
categorySelect.addEventListener('change', handleSearch);  

fetchGames()