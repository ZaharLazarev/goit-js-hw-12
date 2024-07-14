export function renderCard(data) {
  return data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
      <a class="gallery-link" href=${largeImageURL}>
        <img
          class="gallery-image"
          src=${webformatURL}
          data-source=${largeImageURL}
          alt="${tags}"
        />
      </a>
      <div class="text-container">
        <p>Likes <span class="text-span">${likes}</span></p>
        <p>Views <span class="text-span">${views}</span></p>
        <p>Comments <span class="text-span">${comments}</span></p>
        <p>Downloads <span class="text-span">${downloads}</span></p>
      </div>
    </li>
  `).join("");
}
