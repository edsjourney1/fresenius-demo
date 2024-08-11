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


  
// ----------------------------------------------------------------------------
function addTextSection(document) {
  // Find all elements with the class 'fmccontent_editorial_textonly'
  const elements = document.querySelectorAll('.fmccontent_editorial_textonly');

  // Iterate over each element
  elements.forEach(parentDiv => {
      // Insert an <hr> before each parentDiv
      parentDiv.before(document.createElement('hr'));

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
      leftSectionCell.textContent = 'text-section';
      secondRow.appendChild(styleCell);
      secondRow.appendChild(leftSectionCell);

      // Append both rows to the table
      table.appendChild(firstRow);
      table.appendChild(secondRow);

      // Prepend the table to the element
      parentDiv.prepend(table);
  });
}
//---------------------------------------------------------------------------
//Section Break functionality
function addSectionTable(document, parentClass, metadataText, styleText, sectionText) {
  // Find the parent div with the specified class
  const parentDiv = document.querySelector(`.${parentClass}`);

  if (!parentDiv) {
      console.error(`No div with the class '${parentClass}' found.`);
      return;
  }

  // Optionally, insert an <hr> before the element
  parentDiv.before(document.createElement('hr'));

  // Create a new table element
  const table = document.createElement('table');

  // Create the first row
  const firstRow = document.createElement('tr');
  const firstRowCell = document.createElement('td');
  firstRowCell.setAttribute('colspan', '2');
  firstRowCell.textContent = metadataText;
  firstRow.appendChild(firstRowCell);

  // Create the second row
  const secondRow = document.createElement('tr');
  const styleCell = document.createElement('td');
  styleCell.textContent = styleText;
  const sectionCell = document.createElement('td');
  sectionCell.textContent = sectionText;
  secondRow.appendChild(styleCell);
  secondRow.appendChild(sectionCell);

  // Append both rows to the table
  table.appendChild(firstRow);
  table.appendChild(secondRow);

  // Prepend the table to the first child div of the parent div
  parentDiv.prepend(table);
}

//---------------------------------------------------------------------
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

//----------------------------------------------------------
//Sustainibility two collayout with image
// Card table function
function prependTableToEditorialPageIntro(document) {
  // Find the element with the class 'fmccontent_editorialpageintro'
  const editorialElement = document.querySelector('.fmccontent_editorialpageintro');

  if (!editorialElement) {
      console.error("No element with the class 'fmccontent_editorialpageintro' found.");
      return;
  }

  // Find the image and text within the identified element
  const imgElement = editorialElement.querySelector('img');
  const headingElement = editorialElement.querySelector('h2');

  if (!imgElement || !headingElement) {
      console.error("No image or heading found within the 'fmccontent_editorialpageintro' element.");
      return;
  }

  // Create a new table element
  const table = document.createElement('table');
  table.style.width = "100%"; // Ensure the table takes up full width if desired

  // Create the first row with colspan
  const firstRow = document.createElement('tr');
  const firstRowCell = document.createElement('td');
  firstRowCell.setAttribute('colspan', '2');
  firstRowCell.textContent = 'Columns';
  firstRow.appendChild(firstRowCell);

  // Create the second row with two columns
  const secondRow = document.createElement('tr');

  // First column for the image
  const imgCell = document.createElement('td');
  const imgTag = document.createElement('img');
  imgTag.src = imgElement.src;
  imgTag.alt = imgElement.alt;
  imgTag.style.width = "100%"; // Make sure the image fits well in the table cell
  imgCell.appendChild(imgTag);
  secondRow.appendChild(imgCell);

  // Second column for the heading
  const headingCell = document.createElement('td');
  headingCell.appendChild(headingElement.cloneNode(true)); // Clone the heading element and append it
  secondRow.appendChild(headingCell);

  // Append both rows to the table
  table.appendChild(firstRow);
  table.appendChild(secondRow);

  // Prepend the table to the 'fmccontent_editorialpageintro' element
  const introChild = document.querySelector('.fmccontent_editorialpageintro div');
  introChild.replaceWith(table);

}
//--------------------------------------------------
// Relevant COntent
function createRelatedCardsTable(document) {
  // Find the element with the 'fmccontent_teaser_relatedcontent' class
  const relatedContentDiv = document.querySelector('.fmccontent_teaser_relatedcontent');

  if (!relatedContentDiv) {
      console.error("No element with the class 'fmccontent_teaser_relatedcontent' found.");
      return;
  }

  // Create the table and add the header row
  const table = document.createElement('table');

  const headerRow = document.createElement('tr');
  const headerCell = document.createElement('td');
  headerCell.setAttribute('colspan', '2');
  headerCell.textContent = 'Cards';
  headerRow.appendChild(headerCell);
  table.appendChild(headerRow);

  // Iterate over each .pb-8 div and create rows for the table
  const pb8Divs = relatedContentDiv.querySelectorAll('.pb-8');

  pb8Divs.forEach(pb8Div => {
      const row = document.createElement('tr');

      // First column: Image wrapped in a link
      const imageCol = document.createElement('td');
      const imageLink = pb8Div.querySelector('a');
      if (imageLink) {
          const imgElement = imageLink.querySelector('img');
          if (imgElement) {
              const imgClone = imgElement.cloneNode(true);
              imageLink.innerHTML = ''; // Clear the content inside the anchor tag
              imageLink.appendChild(imgClone); // Append the cloned image inside the anchor tag
              imageCol.appendChild(imageLink.cloneNode(true)); // Append the anchor tag with image inside the table cell
          }
      }
      row.appendChild(imageCol);

      // Second column: Heading with link and description
      const contentCol = document.createElement('td');
      const headingLink = pb8Div.querySelector('h3 a');
      if (headingLink) {
          const headingLinkClone = headingLink.cloneNode(true);
          contentCol.appendChild(headingLinkClone);
      }
      const description = pb8Div.querySelector('p');
      if (description) {
          const descriptionClone = description.cloneNode(true);
          contentCol.appendChild(document.createElement('br')); // Add a line break
          contentCol.appendChild(descriptionClone);
      }
      row.appendChild(contentCol);

      table.appendChild(row);
  });

  // Replace the first child of the related content div with the table
  const relatedChildDiv = relatedContentDiv.querySelector('div');
  relatedChildDiv.replaceWith(table);
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
        ".breadcrumb",
        '.lg\\:hidden',
        '.md\\:hidden'
  
      ]);
  
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      WebImporter.rules.convertIcons(main, document);

      const mainElement = document.querySelector('main');

      addSectionTable(document, 'fmccontent_teaser_relatedcontent', 'Section Metadata', 'style', 'related-section');
      addSectionTable(document, 'fmccontent_editorialpageintro', 'Section Metadata', 'style', 'home-twocol-img-text');
      processParagraphLinks(mainElement, document);  
      addTextSection(document);

      prependTableToEditorialPageIntro(document)
      createRelatedCardsTable(document);

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