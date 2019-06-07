// Author: Syed Tanveer
// Last modified: August 31st, 2018
// OCIO: Congress.gov chrome extension
//
// this function will send an AJAX request to the constructed link in content.js
// and return the HTML of it. Then, the function will parse the HTML to gather
// the title of the legislation and the number of summaries of the legislation.
// Once that is complete and the HTML has been parsed properly, it will construct
// a message object and send it back to conent.js to be rendered onto the page.

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    $(document).ready(() => {
      $.ajax({
        type: 'GET',
        url: 'data.txt',
        dataType: 'text',
        success(data) { processData(data); },
      });
    });

    function processData(allText) {
      const record_num = 5; // or however many elements there are in each row
      const allTextLines = allText.split(/\r\n|\n/);
      const entries = allTextLines[0].split(',');
      const lines = [];

      const headings = entries.splice(0, record_num);
      while (entries.length > 0) {
        const tarr = [];
        for (let j = 0; j < record_num; j++) {
          tarr.push(`${headings[j]}:${entries.shift()}`);
        }
        lines.push(tarr);
      }
      // alert(lines);
    }
  },
);
