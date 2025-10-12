const scriptURL = "https://script.google.com/macros/s/AKfycbw6juoHoRXc2K1OxDU4r1gUTMpL8lY5n9-d09lNMztAWK7zbFvrYDvZkzhka4AYgn6K/exec";

const icons = {
  pdf: "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg",
  doc: "https://upload.wikimedia.org/wikipedia/commons/1/19/Microsoft_Office_Word_%282019%E2%80%932025%29.svg",
  docx: "https://upload.wikimedia.org/wikipedia/commons/f/fb/.docx_icon.svg",
  xls: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Microsoft_Office_Excel_%282019%E2%80%932025%29.svg",
  xlsx: "https://upload.wikimedia.org/wikipedia/commons/f/f3/.xlsx_icon.svg",
  html: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
  css: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
  js: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Javascript-shield.svg",
  php: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
  zip: "https://upload.wikimedia.org/wikipedia/commons/1/14/Deepin_Icon_Theme_%E2%80%93_application-x-zip_%2841%29.svg",
  rar: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Deepin_Icon_Theme_%E2%80%93_application-x-rar_%2830%29.svg",
  jpg: "https://static.vecteezy.com/system/resources/previews/000/379/991/non_2x/jpg-vector-icon.jpg",
  jpeg: "https://upload.wikimedia.org/wikipedia/commons/2/24/Icon_round_Picture.svg",
  png: "https://upload.wikimedia.org/wikipedia/commons/2/24/Icon_round_Picture.svg",
  gif: "https://upload.wikimedia.org/wikipedia/commons/2/24/Icon_round_Picture.svg",
  default: "https://upload.wikimedia.org/wikipedia/commons/8/87/File_icon.svg"
};

function loadFiles() {
  fetch(scriptURL + "?folderId=" + folderId)
    .then(response => response.json())
    .then(files => {
      const container = document.getElementById('fileContainer');
      container.innerHTML = "";

      if(files.error){
        container.innerHTML = "<p>" + files.error + "</p>";
        return;
      }

      files.forEach(file => {
        const ext = (file.ext || "").toLowerCase();
        const iconURL = icons[ext] || icons.default;

        const card = document.createElement("div");
        card.className = "file-card";
        card.innerHTML = `
          <img class="file-icon" src="${iconURL}" alt="${ext.toUpperCase()} icon">
          <div class="file-info">
            <div class="file-name">${file.name}</div>
            <div class="file-size">${file.size}</div>
          </div>
          <a href="${file.download}" class="download-btn" target="_blank" title="Download">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path fill="white" d="M12 16l4-4h-3V4h-2v8H8l4 4zm4 4H8c-1.1 0-2-.9-2-2v-2h2v2h8v-2h2v2c0 1.1-.9 2-2 2z"/>
            </svg>
          </a>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => {
      document.getElementById('fileContainer').innerHTML = "<p>Error fetching files.</p>";
    });
}

loadFiles();