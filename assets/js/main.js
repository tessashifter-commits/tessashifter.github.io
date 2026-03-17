
<script>
  const header = document.getElementById("header");
  const pageContent = document.getElementById("page-content");

  const blinkText = "ACCESSING THREAT ASSESSMENT...";
  const finalText = "THREAT DOSSIER - TESSA";

  let blinkCount = 0;
  let visible = true;

  function blink( ) {

    header.textContent = visible ? blinkText : "";

    visible = !visible;
    blinkCount++;

    if (blinkCount < 10) { 
      setTimeout(blink, 300);
    } else {
      header.textContent = "";
      pageContent.classList.remove("hidden-content");
      pageContent.classList.add("visible-content");
      typeWriter( ) ;
    }
  }

    let i = 0;

    function typeWriter() {

      if (i < finalText.length) {

        header.textContent += finalText.charAt(i);

        i++;

        setTimeout(typeWriter, 80);

      }
    }

    blink();

  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll (".tab-panel");

  const tabFiles = {
    "debrief": "assets/content/debrief.html",
    "incident-reports":"assets/content/incident-reports",
    "form-list":"assets/content/form-list",
    "known-associates":"assets/content/known-associates",
    "arsenal":"assets/content/arsenal"
  };

  const loadedTabs = new Set();

  async function loadTabContent(tabId) {

    if (loadedTabs.has(tabId)) return;

    const container = document.getElementById('$[tabId}-content');

    if (!container) return;

    try {

      const response = await fetch(tabFiles[tabId]);

      if (!response.ok) {
        container.innerHTML = "<p>Data retrieval failure</p>"
        return;
      }

      const html = await response.text();
      container.innerHTML = html;

      loadedTabs.add(tabId);

    } catch (error) {
      container.innerHTML = "<p>Data retrieval failure</p>"
    }
  }

    tabButtons.forEach((button) => {
      button.addEventListener("click", async () => {

        const targetId = button.dataset.tab;
        const targetPanel = document.getElementById(targetId);

        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabPanels.forEach((panel) => panel.classList.remove("active"));

        button.classList.add("active");

        if (targetPanel) {
          targetPanel.add("active");
          await loadTabContent(targetId);
        }
      });
    });

    loadTabContent("debrief");
     

    
  </script>
