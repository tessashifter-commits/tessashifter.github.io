

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

  const tabFiles = {
    "debrief": "assets/content/debrief.html",
    "incident-reports": "assets/content/incident-reports.html",
    "form-list": "assets/content/form-list.html",
    "known-associates": "assets/content/known-associates.html",
    "arsenal":"assets/content/arsenal.html"
  };

  if (debriefDisplay.dataset.initialized === "true") return;
  debriefDisplay.dataset.initialized = "true";

  const loadedDebriefs = new Map();

  async function loadDebrief(debriefId) {
    if (loadedDebriefs.has(debrief)) {
      debriefDisplay.innerHTML = loadedDebriefs.get(debriefId);
      return;
    }

      try {
        const response = await fetch(debriefFiles[debriefId]);

        if (!response.ok) {
          debriefDisplay.innerHTML = '<div class="awaiting input">Data retrieva; failure</div>';
          return ;
        }

          const html = await response.text();
        const wrappedHtml = '<div class="debrief-ducment">${html}</div>';

        loadedDebriefs.set(debriefId, wrappedHtml);
        debriefDisplay.innerHTML = wrappedHtml;

      } catch (error) {
        debriefDisplay.innerHTML = '<div class="awaiting-input">Data retrieval failure</div>';
      }
  }

debriefButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const debriefId = button.dataset.debrief;

    debriefButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    await loadDebrief(debriefId);
  });
});
}

function initializeSite() {
  initializeTopLevelTabs();
  loadTabContent("debrief");
  blink();
}

initializeSite();
