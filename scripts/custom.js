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