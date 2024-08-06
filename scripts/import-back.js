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
  
      // Create table rows
      const rows = [
        createRow(['Card'], document, true), // Header row with colspan 2
        createRow([imgElement, createContent(title, description, link, document)], document)
      ];
  
      // Create a table from rows and append to main
      const table = createTable(rows, document);
      main.append(table);
    });
  };
  
  // Utility function to create a row
  const createRow = (cells, document, isHeader = false) => {
    const row = document.createElement('tr');
    
    if (isHeader) {
      const cell = document.createElement('td');
      cell.textContent = cells[0];
      cell.colSpan = 2;
      row.append(cell);
    } else {
      cells.forEach(content => {
        const cell = document.createElement('td');
        if (typeof content === 'string') {
          cell.textContent = content;
        } else {
          cell.append(content);
        }
        row.append(cell);
      });
    }
    
    return row;
  };
  
  // Utility function to create a content cell
  const createContent = (title, description, link, document) => {
    const div = document.createElement('div');
    
    const heading = document.createElement('h3');
    heading.textContent = title;
    div.append(heading);
    
    const desc = document.createElement('p');
    desc.textContent = description;
    div.append(desc);
    
    if (link) {
      div.append(link);
    }
    
    return div;
  };
  
  // Utility function to create a table from rows array
  const createTable = (rows, document) => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
  
    rows.forEach(row => {
      tbody.append(row);
    });
  
    table.append(tbody);
    return table;
  };

// Usage example
const mainElement = document.querySelector('main');
createCardTable(mainElement, document);