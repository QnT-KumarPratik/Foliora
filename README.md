# Foliora

«Stories are more than words on a page.
They are worlds waiting to be opened.»

Foliora is a lightweight, browser-based platform for writing, publishing, and reading digital stories as interactive books.

It is built around a simple idea:

Let writers focus on writing, and let the reader experience the story as a book.

Foliora uses lightweight, open formats such as Markdown, JSON, and SVG, with the browser handling rendering, pagination, and book-like interaction.

---

## ✦ What is Foliora?

Foliora is being designed as a small publishing ecosystem with three parts:

- Library — a place to discover stories.
- Reader — an interactive digital book for reading them.
- Creator — tools for preparing and publishing stories.

The project is intentionally lightweight. Stories should remain mostly text and structured data, while the reader generates the presentation dynamically.

No giant application downloads.
No heavyweight media requirements.
Just a browser, a story, and enough time to get lost in it.

---

## 📖 The Idea

A story in Foliora is structured like a book:

Story
│
├── Volume
│   ├── Chapter
│   │   ├── Episode
│   │   └── Episode
│   │
│   └── Chapter
│
└── Volume

Each volume is treated as its own book.

The reader handles the visual presentation, while the story files contain the actual content.

This separation allows the same reader to display many different stories without every story needing its own website.

---

## 🗂️ Repository Structure

Foliora/
├── README.md
│
├── codes/
│   └── ...
│
└── stories/
    ├── originals/
    │   └── ...
    │
    └── user_content/
        └── ...

"codes/"

Contains the code that powers Foliora.

"stories/originals/"

Contains original/official Foliora stories.

"stories/user_content/"

Contains approved stories contributed by other writers.

---

## 🪶 Writing First

Foliora is built around the idea that the story itself should remain simple.

Writers should not need to manually build webpages, design every page, or create complicated layouts.

Instead, they provide the story and its structure.

Foliora handles the rest.

Markdown provides the writing format.

JSON provides structured information.

SVG provides lightweight visual presentation.

JavaScript brings everything together.

---

## 🌱 Development

Foliora is currently in early development.

Current milestone

V0.002 — Foundation

The initial repository structure and project foundation are being established.

Future milestones will gradually introduce:

- Story metadata
- Story rendering
- The digital book reader
- Markdown-based episodes
- Dynamic pagination
- Book interaction and page flipping
- Visual templates
- Story libraries
- Error reporting
- Creator tools
- Community content

Features will be added gradually rather than all at once.

The goal is to have something working and visible at every stage of development.

---

# ✧ Philosophy

«Build the book before building the library.
Build the library before building the world.»

Foliora is intentionally starting small.

The project will grow only after its foundations work.

---

# Status

Version: "0.002"
Stage: Foundation
Project: Foliora

---

Made for people who still believe a good story deserves a good page.