/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console, class-methods-use-this */

const createCarouselSlidesTable = (main, document, element) => {
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    let imgElement, link;
    slides.forEach (slide => {
        console.log(slide);
        const button = slide.querySelector('.button-container').querySelector('a');
        const image = slide.querySelector('.imageContainer');
        if (button) {
            const buttonText = button.textContent.trim();
            const href = button.href;
            link = document.createElement('a');
            link.href = href;
            link.textContent = buttonText;
            slide.querySelector('.button-container').textContent = "";
        } else {
            link = "";
        }
        if (image) {
            const imgSrc = image.querySelector('img').src;
            const img = document.createElement('img');
            img.src = imgSrc;
            imgElement = img;
        } else {
            imgElement = "";
        }
        const heading = slide.querySelector('h3').textContent;
        const content = slide.querySelector('p').textContent;
        let cells = [
            ['Carousel'],
            ['Image', imgElement],,
            ['Heading', heading],
            ['Content', content],
            ['Button', link]
        ];
        const table = WebImporter.DOMUtils.createTable(cells, document);
        main.append(table);
    });
}

export default {
    /**
     * Apply DOM operations to the provided document and return
     * the root element to be then transformed to Markdown.
     * @param {HTMLDocument} document The document
     * @param {string} url The url of the page imported
     * @param {string} html The raw html (the document is cleaned up during preprocessing)
     * @param {object} params Object containing some parameters given by the import process.
     * @returns {HTMLElement} The root element to be transformed
     */
    transformDOM: ({
      // eslint-disable-next-line no-unused-vars
      document, url, html, params,
    }) => {
      // define the main element: the one that will be transformed to Markdown
      const main = document.body;
  
      // attempt to remove non-content elements
      WebImporter.DOMUtils.remove(main, [
        '.global-nav',
        'footer',
        'iframe',
        'noscript',
      ]);
  
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      WebImporter.rules.convertIcons(main, document);

      const carouselSlides = document.querySelectorAll('.carousel-slide');
      carouselSlides.forEach(element => {
        createCarouselSlidesTable(main, document, element);
      });
  
      return main;
    },
  
    /**
     * Return a path that describes the document being transformed (file name, nesting...).
     * The path is then used to create the corresponding Word document.
     * @param {HTMLDocument} document The document
     * @param {string} url The url of the page imported
     * @param {string} html The raw html (the document is cleaned up during preprocessing)
     * @param {object} params Object containing some parameters given by the import process.
     * @return {string} The path
     */
    generateDocumentPath: ({
      // eslint-disable-next-line no-unused-vars
      document, url, html, params,
    }) => {
      let p = new URL(url).pathname;
      if (p.endsWith('/')) {
        p = `${p}index`;
      }
      return decodeURIComponent(p)
        .toLowerCase()
        .replace(/\.html$/, '')
        .replace(/[^a-z0-9/]/gm, '-');
    },
};