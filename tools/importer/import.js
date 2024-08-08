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
  // -----------------------------------------------------------------------------
  // Card table function
  const createCardTable = (main, document) => {
    const cards = Array.from(document.querySelectorAll('.card'));
    
    // Create the table and the header row
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    
    const headerRow = document.createElement('tr');
    const headerCell = document.createElement('td');
    headerCell.textContent = 'Card';
    headerCell.colSpan = 2;
    headerRow.append(headerCell);
    tbody.append(headerRow);
    
    cards.forEach(card => {
      // Extract image source
      const imageElement = card.querySelector('img');
      const imgSrc = imageElement ? imageElement.src : '';
  
      // Create an img element
      let imgElement = '';
      if (imgSrc) {
        const img = document.createElement('img');
        img.src = imgSrc;
        imgElement = img;
      }
  
      // Extract title
      const titleElement = card.querySelector('h3');
      const title = titleElement ? titleElement.textContent.trim() : '';
  
      // Extract description
      const descriptionElement = card.querySelector('.md\\:line-clamp-3');
      const description = descriptionElement ? descriptionElement.textContent.trim() : '';
  
      // Extract link
      const linkElement = card.querySelector('a');
      let link = '';
      if (linkElement) {
        const linkText = linkElement.textContent.trim();
        const href = linkElement.href;
        link = document.createElement('a');
        link.href = href;
        link.textContent = linkText;
      }
  
      // Create a row for the card
      const row = document.createElement('tr');
      const imageCell = document.createElement('td');
      const contentCell = document.createElement('td');
      
      if (imgElement) {
        imageCell.append(imgElement);
      }
      
      const contentDiv = document.createElement('div');
      const heading = document.createElement('h3');
      heading.textContent = title;
      contentDiv.append(heading);
      
      const desc = document.createElement('p');
      desc.textContent = description;
      contentDiv.append(desc);
      
      if (link) {
        contentDiv.append(link);
      }
      
      contentCell.append(contentDiv);
      row.append(imageCell);
      row.append(contentCell);
      
      tbody.append(row);
    });
    
    table.append(tbody);
    main.append(table);
  };
  
  // -----------------------------------------------------------------------------
//Table import
function prependTableHeader(main, document) {
    // Select all tables with the class 'contenttable'
    const tables = document.querySelectorAll('.contenttable');
    
    tables.forEach((table) => {
      // Create a new row
      const newRow = document.createElement('tr');
      
      // Create a new cell
      const newCell = document.createElement('td');
      newCell.textContent = 'Table (bordered)';
      newCell.colSpan = 2;
      
      // Append the cell to the row
      newRow.appendChild(newCell);
      
      // Insert the new row at the top of the table body
      const tbody = table.querySelector('tbody');
      if (tbody) {
        tbody.insertBefore(newRow, tbody.firstChild);
      }
    });
  }
  // ----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------
//Table import
function prependNewsSectionMetadata(document) {
    // Find the element with the 'main' class
    const mainElement = document.querySelector('.main');
    
    if (!mainElement) {
        console.error("No element with the class 'main' found.");
        return;
    }

    // Create a new table element
    const table = document.createElement('table');

    // Create the first row
    const firstRow = document.createElement('tr');
    const firstRowCell = document.createElement('td');
    firstRowCell.setAttribute('colspan', '2');
    firstRowCell.textContent = 'Section Metadata';
    firstRow.appendChild(firstRowCell);

    // Create the second row
    const secondRow = document.createElement('tr');
    const styleCell = document.createElement('td');
    styleCell.textContent = 'style';
    const newsSectionCell = document.createElement('td');
    newsSectionCell.textContent = 'news-section';
    secondRow.appendChild(styleCell);
    secondRow.appendChild(newsSectionCell);

    // Append both rows to the table
    table.appendChild(firstRow);
    table.appendChild(secondRow);

    // Prepend the table to the 'main' element
    mainElement.prepend(table);
}
  // ----------------------------------------------------------------------------
  function addLeftSection(document) {
    // Find the parent div with the class 'flex flex-wrap flex-col-reverse'
    const parentDiv = document.querySelector('div.flex.flex-wrap.flex-col-reverse');
    
    if (!parentDiv) {
        console.error("No div with the class 'flex flex-wrap flex-col-reverse' found.");
        return;
    }

    // Find the first child div inside the parent
    const firstChildDiv = parentDiv.querySelector('div');

    if (!firstChildDiv) {
        console.error("No child div found inside the parent div.");
        return;
    }

    // Create a new table element
    const table = document.createElement('table');

    // Create the first row
    const firstRow = document.createElement('tr');
    const firstRowCell = document.createElement('td');
    firstRowCell.setAttribute('colspan', '2');
    firstRowCell.textContent = 'Section Metadata';
    firstRow.appendChild(firstRowCell);

    // Create the second row
    const secondRow = document.createElement('tr');
    const styleCell = document.createElement('td');
    styleCell.textContent = 'style';
    const leftSectionCell = document.createElement('td');
    leftSectionCell.textContent = 'left-section';
    secondRow.appendChild(styleCell);
    secondRow.appendChild(leftSectionCell);

    // Append both rows to the table
    table.appendChild(firstRow);
    table.appendChild(secondRow);

    // Prepend the table to the first child div of the parent div
    firstChildDiv.prepend(table);
}
//---------------------------------------------------------------------------
//recreate paragraph links
function processParagraphLinks(main, document) {
    // Select all <p> tags within the main element
    const paragraphs = main.querySelectorAll('p');
  
    paragraphs.forEach((p) => {
      // Select all <a> tags within each <p> tag
      const links = p.querySelectorAll('a');
  
      links.forEach((link) => {
        // Extract the href and text content of the <a> tag
        const href = link.href;
        const text = link.textContent;
  
        // Create a new <a> element
        const newLink = document.createElement('a');
        newLink.href = href;
        newLink.textContent = text;
  
        // Add any existing classes or attributes from the original link
        Array.from(link.attributes).forEach(attr => {
          if (attr.name !== 'href') {  // Exclude href as it's already set
            newLink.setAttribute(attr.name, attr.value);
          }
        });
  
        // Check if the original link has the 'external' class
        if (link.classList.contains('external')) {
          newLink.classList.add('external');
        }
  
        // Replace the original <a> tag with the new one
        p.replaceChild(newLink, link);
      });
    });
  }
// -----------------------------------------------------------------------------
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
        '.page-header',
        'footer',
        'iframe',
        'noscript',
        ".breadcrumb"
  
      ]);
  
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      WebImporter.rules.convertIcons(main, document);
      
 

  
    //   const carouselSlides = document.querySelectorAll('.carousel-slide');
    //   carouselSlides.forEach(element => {
    //     createCarouselSlidesTable(main, document, element);
    //   });
      const mainElement = document.querySelector('main');
      createCardTable(mainElement, document);
      prependTableHeader(mainElement, document);
      
    processParagraphLinks(mainElement, document);  
    prependNewsSectionMetadata(document);

    addLeftSection(document)

    // prependSection('.md:w-7/12.lg:w-7/12', 'news-left');
    // prependSection('.md:w-5/12.md:pl-12.md:pb-0.lg:w-4/12.pb-8', 'right-section');

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