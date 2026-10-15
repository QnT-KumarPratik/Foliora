const themeToggle = document.getElementById("theme-toggle");  
  
const savedTheme = localStorage.getItem("foliora-theme");  
  
if (savedTheme === "dark") {  
    document.body.classList.add("dark");  
}  
  
function updateThemeButton() {  
    const isDark = document.body.classList.contains("dark");  
  
    themeToggle.textContent = isDark ? "☀️" : "🌙";  
    themeToggle.setAttribute(  
        "aria-label",  
        isDark ? "Switch to light theme" : "Switch to dark theme"  
    );  
}  
  
themeToggle.addEventListener("click", () => {  
    const isDark = document.body.classList.toggle("dark");  
  
    localStorage.setItem(  
        "foliora-theme",  
        isDark ? "dark" : "light"  
    );  
  
    updateThemeButton();  
});  
  
updateThemeButton();  


const libraryStatus = document.getElementById("library-status");
const categoryLists = {
    org: document.getElementById("original-list"),
    ccc: document.getElementById("creator-list")
};

const catalogURL = "../../stories/index.json";

const storyFolders = {
    org: "originals",
    ccc: "user_content"
};

async function loadLibrary() {
    try {
        const response = await fetch(catalogURL);

        if (!response.ok) {
            throw new Error("Could not load story catalog.");
        }

        const catalog = await response.json();
        let storyCount = 0;

        for (const category of ["org", "ccc"]) {
            const folders = catalog[category] || [];
            const parentFolder = storyFolders[category];

            for (const folder of folders) {
                if (!folder) continue;

                const storyPath =
                    `../../stories/${parentFolder}/${folder}`;

                try {
                    const metadataResponse = await fetch(
                        `${storyPath}/metadata.json`
                    );

                    if (!metadataResponse.ok) {
                        throw new Error("Metadata not found.");
                    }

                    const metadata = await metadataResponse.json();
                    const storyName = metadata.name || folder;

                    const card = document.createElement("article");
                    card.style.display = "inline-flex";
                    card.style.flexDirection = "column";
                    card.style.verticalAlign = "top";
                    card.style.width = "180px";
                    card.style.margin = "12px";
                    card.style.gap = "8px";

                    const cover = document.createElement("img");
                    cover.src = `${storyPath}/cover.svg`;
                    cover.alt = `Cover of ${metadata.name}`;
                    cover.style.width = "100%";
                    cover.style.aspectRatio = "2 / 3";
                    cover.style.objectFit = "contain";

                    cover.onerror = async () => {
                    cover.onerror = null;

                    try {
                        const response = await fetch("404NotFound.svg");

                        if (!response.ok) {
                            throw new Error("Could not load fallback cover.");
                        }

                        let svgText = await response.text();

                        const safeStoryName = storyName
                            .replace(/&/g, "&amp;")
                            .replace(/</g, "&lt;")
                            .replace(/>/g, "&gt;")
                            .replace(/"/g, "&quot;")
                            .replace(/'/g, "&apos;");

                        const placeholder = "{{Story Name}}";

                        svgText = svgText.replace(placeholder, safeStoryName);

                        cover.src = URL.createObjectURL(
                            new Blob([svgText], { type: "image/svg+xml" })
                        );
                    } catch (error) {
                        console.error("Could not load fallback cover:", error);
                        cover.hidden = true;
                    }
                };

                    const title = document.createElement("h2");
                  
                    const titleLink = document.createElement("a");
                    titleLink.textContent = storyName;
                    titleLink.href =
    `../details/details.html?story=${encodeURIComponent(
        `${parentFolder}/${folder}`
    )}`;
                    title.appendChild(titleLink);

                    title.style.fontSize = "1.1rem";
                    title.style.margin = "0";

                    card.append(cover, title);
                    categoryLists[category].appendChild(card);

                    storyCount++;
                } catch (error) {
                    console.error(
                        `Failed to load story: ${folder}`,
                        error
                    );
                }
            }
        }

        libraryStatus.textContent = storyCount
            ? `${storyCount} stor${storyCount === 1 ? "y" : "ies"} in the library`
            : "No stories could be loaded.";

    } catch (error) {
        console.error("Library loading failed:", error);
        libraryStatus.textContent =
            "Unable to load the library. Please try again later.";
    }
}

loadLibrary();
          
