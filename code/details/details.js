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

const detailsStatus = document.getElementById("details-status");
const storyDetails = document.getElementById("story-details");

const storyCover = document.getElementById("story-cover");
const storyName = document.getElementById("story-name");
const storyAuthor = document.getElementById("story-author");
const storyDescription = document.getElementById("story-description");
const relationsContent = document.getElementById("relations-content");

const storyFolders = {
    originals: "originals",
    user_content: "user_content"
};

async function loadStoryDetails() {
    try {
        const params = new URLSearchParams(window.location.search);
        const storyPath = params.get("story");

        if (!storyPath) {
            throw new Error("No story was specified.");
        }

        const pathParts = storyPath.split("/");

        if (
            pathParts.length !== 2 ||
            !Object.hasOwn(storyFolders, pathParts[0]) ||
            !pathParts[1] ||
            pathParts[1] === "." ||
            pathParts[1] === ".."
        ) {
            throw new Error("Invalid story path.");
        }

        const [category, folder] = pathParts;
        const basePath = `../../stories/${storyFolders[category]}/${folder}`;

        const response = await fetch(`${basePath}/metadata.json`);

        if (!response.ok) {
            throw new Error("Could not load story metadata.");
        }

        const metadata = await response.json();

        storyName.textContent = metadata.name || folder;
        storyAuthor.textContent = metadata.author
            ? `By ${metadata.author}`
            : "Author unknown";

        storyDescription.textContent =
            metadata.description || "No description available.";

        storyCover.src = `${basePath}/cover.svg`;
        storyCover.alt = `Cover of ${storyName.textContent}`;

        storyCover.onerror = () => {
            storyCover.onerror = null;
            storyCover.src = "../library/404NotFound.svg";
        };

        const relations = metadata.relations || {};
        const previous = relations.previous || {};
        const future = relations.future || {};

        relationsContent.replaceChildren();

        const previousText = document.createElement("p");
        previousText.textContent = previous.exists
            ? `Previous volume: ${previous.uuid || "Reference unavailable"}`
            : "Previous volume: None";

        const futureText = document.createElement("p");
        futureText.textContent = future.exists
            ? `Next volume: ${future.uuid || "Reference unavailable"}`
            : "Next volume: None";

        relationsContent.append(previousText, futureText);

        detailsStatus.hidden = true;
        storyDetails.hidden = false;

    } catch (error) {
        console.error("Could not load story details:", error);
        detailsStatus.textContent =
            "Unable to load this story. Check the link or return to the Library.";
    }
}

document.getElementById("read-now").addEventListener("click", () => {
    detailsStatus.hidden = false;
    detailsStatus.textContent = "The Reader isn't available yet.";
});

loadStoryDetails();
