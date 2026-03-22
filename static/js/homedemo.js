document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('restaurantSearch');
    const restaurantCards = document.querySelectorAll('.card');

    function filterRestaurants() {
        const query = searchInput.value.toLowerCase();

        restaurantCards.forEach(card => {
            // Scrape the text from the Card's Title, Description, and Tags to make searching very robust!
            const name = card.querySelector('h2').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            const tags = card.querySelector('.tags').textContent.toLowerCase();

            if (name.includes(query) || desc.includes(query) || tags.includes(query)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Triggers automatically whenever the user types literally any letter or deletes one!
    searchInput.addEventListener('input', filterRestaurants);
});
