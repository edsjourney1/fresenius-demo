// const createCardTable = (main, document) => {
//   const cards = Array.from(document.querySelectorAll('.card'));
  
//   cards.forEach(card => {
//     // Extract image source
//     const imageElement = card.querySelector('img');
//     const imgSrc = imageElement ? imageElement.src : '';

//     // Create an img element
//     let imgElement = '';
//     if (imgSrc) {
//       const img = document.createElement('img');
//       img.src = imgSrc;
//       imgElement = img;
//     }

//     // Extract title
//     const titleElement = card.querySelector('h3');
//     const title = titleElement ? titleElement.textContent.trim() : '';

//     // Extract description
//     const descriptionElement = card.querySelector('.md\\:line-clamp-3');
//     const description = descriptionElement ? descriptionElement.textContent.trim() : '';

//     // Extract link
//     const linkElement = card.querySelector('a');
//     let link = '';
//     if (linkElement) {
//       const linkText = linkElement.textContent.trim();
//       const href = linkElement.href;
//       link = document.createElement('a');
//       link.href = href;
//       link.textContent = linkText;
//     }

//     // Create table cells
//     const cells = [
//       ['Card'],
//       ['Image', imgElement],
//       ['Title', title],
//       ['Description', description],
//       ['Link', link]
//     ];

//     // Create a table from cells and append to main
//     const table = createTable(cells, document);
//     main.append(table);
//   });
// };

// // Utility function to create a table from cells array
// const createTable = (cells, document) => {
//   const table = document.createElement('table');
//   const tbody = document.createElement('tbody');

//   cells.forEach(([header, content]) => {
//     const row = document.createElement('tr');
//     const th = document.createElement('th');
//     const td = document.createElement('td');

//     th.textContent = header;
//     if (typeof content === 'string') {
//       td.textContent = content;
//     } else {
//       td.append(content);
//     }

//     row.append(th, td);
//     tbody.append(row);
//   });

//   table.append(tbody);
//   return table;
// };
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
// Usage example
const mainElement = document.querySelector('main');
createCardTable(mainElement, document);