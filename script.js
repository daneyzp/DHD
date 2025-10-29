const scriptURL = "https://script.google.com/macros/s/AKfycbw6juoHoRXc2K1OxDU4r1gUTMpL8lY5n9-d09lNMztAWK7zbFvrYDvZkzhka4AYgn6K/exec";

const icons = {
  pdf: "https://daneyzp.github.io/DHD-menuel/pdf.png"
//  pdf: "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg",
  doc: "https://upload.wikimedia.org/wikipedia/commons/1/19/Microsoft_Office_Word_%282019%E2%80%932025%29.svg",
  docx: "https://upload.wikimedia.org/wikipedia/commons/f/fb/.docx_icon.svg",
  xls: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Microsoft_Office_Excel_%282019%E2%80%932025%29.svg",
  xlsx: "https://upload.wikimedia.org/wikipedia/commons/f/f3/.xlsx_icon.svg",
  jpg: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnQkzSeVQi8ppmQguKCvfNinYRRW9XUeET_7cSnu54pso-CcxkGus_qYmR7nmoeNo8z4rvlUCNaJVdR6VkhbXBMt6NsqrE7Wo3ysjIb_TWQEgLfroxpSDzsnJgsD1rdUdbtNwGns58ZW92HuB9BOnMOMuIlRTOrFGvKBzij3EhlqPkzNrd5thm3IN6u6yJ/s512/10260602.png",
  jpeg: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjhpKX2-ZVo6azybTvj3Vl3AtW4Oy2pRd9YhZrCsYYVsuzH7DSsmcx7v_OrSryY_A537ER9rhlysXcAVClkWN4I_VT7FNtsz_Vyztrt62U0Lodz611bmHyBb5mmZZZkJF75ZCw0ZEKYX2rS6x3vb09BVOTzGGZm2HLHgkAm9k-PyNePF9YYExjMAEIvIeXP/s512/jpeg-icon.png",
  png: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9Vw_IZLHStYLWLaLidFZ1No2av_DkU4UkZ_pki8oVyukaJPjtASiq6rkI41NIjdi1dRheNPouEzZD-6-rrmH_K7txCq55TSWYZYbGCqPCnEmPk9Um5QFkK8cpfPuFynniDGYpwa5TvH4dT2zKn36qzyJNVrsufDdSBWsZW8mYI-by8jbvKOaprPiJdcRb/s512/337948.png",
  gif: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhDkryULS8JC8QobL_zIoRCdyoSOGMIoVoP-KK-E1dnMp-HvmHwkHtfV7OQuwLgvyS90bYBJ-xmNPfUXPu1Iqs-T54U5cgdVgdmLmPI28kd-gbF8oPGBg0538apuQDcJFUy9FFEJHlhnphqiMPfFzye_-o0cNMMAtYB7ztPP78Q3UtziX3k9oPihwXxrvEr/s640/11237482.gif",
  html: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
  css: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
  js: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Javascript-shield.svg",
  php: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
  zip: "https://upload.wikimedia.org/wikipedia/commons/1/14/Deepin_Icon_Theme_%E2%80%93_application-x-zip_%2841%29.svg",
  rar: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Deepin_Icon_Theme_%E2%80%93_application-x-rar_%2830%29.svg",
txt: "https://upload.wikimedia.org/wikipedia/commons/2/23/Text-txt.svg",
  xml: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Deepin_Icon_Theme_%E2%80%93_text-xml_%289%29.svg",
  default: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyNCOzrzK3J0RskO1sKDtlFSkng5cq1Mn9vF7vjAAGMXbrOjqiEx2B6VL7prPKm_XiE_DE_89jiRg01npfB-BIoR7I9nSUqSbLvZG5DtCgs58Lx15Vzlzb_fHFGHWVrNSdNZVpWvNe3iO8dp0NPIOjAmIQtXY6sfNNh5hprqcB7hPpfmEOU3hgGrcxlP-1/s512/44386.png"
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
