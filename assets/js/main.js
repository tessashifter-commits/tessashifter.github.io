
<script>
  const header = document.getElementById("header");
  const pageContent = document.getElementById("page-content");

  const blinkText = "ACCESSING THREAT ASSESSMENT...";
  const finalText = "THREAT DOSSIER - TESSA";

  let blinkCount = 0;
  let visible = true;
  let i = 0;

  function blink( ) {
    if (!header || !pageContent) return;

    header.textContent = visible ? blinkText : "";
    visible = !visible;
    blinkCount++;

    if (blinkCount < 10) {
      setTimeout(blink, 300);
    } else {
      header.textContent = "";
      pageContent.classList.remove("hidden-content");
      pageContent.classList.add("visible-content");
      typeWriter();
    }
  }

  function typeWriter() {
    if (!header) return;

    if (i < finalText.length) {
      header.textContent += finalText.charAt(i);
      i++;
      setTimeout(typeWriter, 80);
    }
  }

  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  const tabFIles = {
    "debrief": "assets/content/debrief.html",
    "incident-reports": "assets/content/incident-reports.html",
    "form-list": "assets/content/form-list.html",
    "known-associates": "assets/content/known-associates.html",
    "arsenal":"assets/content/arsenal.html"
  };



  </script>
