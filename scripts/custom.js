function addClassToMain(document) {

    const mainElement = document.querySelector('main');

    if (!mainElement) {
        console.error("No 'main' tag found.");
        return;
    }
    const leftSection = mainElement.querySelector('.left-news-section');
    const rightSection = mainElement.querySelector('.right-news-section');

    if (leftSection && rightSection) {
        // Add the 'news-section' class to the main tag
        mainElement.classList.add('news-section');
    }
}

addClassToMain(document);

function ImageLink() {
      const imageDiv = document.querySelector('.right-news-section .default-content-wrapper');
      if (imageDiv) {
        // Find the 'picture' and 'a' elements inside the 'cards-card-image' div
        const pictureTag = imageDiv.querySelector('picture');
        const anchorTag = imageDiv.querySelector('a');
  
        if (pictureTag && anchorTag) {
          // Move the 'picture' tag inside the 'a' tag
          anchorTag.innerHTML = ''; // Clear the anchor tag content
          anchorTag.setAttribute("title", "");
          anchorTag.appendChild(pictureTag); // Append the picture tag inside the anchor tag
          imageDiv.append(anchorTag, imageDiv.firstChild); // Ensure the anchor tag is the first element
        }
      }
  }
  ImageLink();