# The Central Library

> **Seventeen books for people who build systems.**
> 17 volumes · 3,000 chapters · free to read, nothing to sign up for.

Chapter-by-chapter guides to AI engineering, backends, databases, distributed systems, cloud, security and Python, and to the product, leadership and sales work that surrounds them.

**Curated by [Harsh Jha](https://www.linkedin.com/in/harshjha-iiti/), AI Lead at Formee Holdings. Built by a team of IITians.**

**Live site:** [https://harshdotcom.github.io/AI-Systems/](https://harshdotcom.github.io/AI-Systems/)

---

## About

Most technical writing is either a toy tutorial or a lecture on theory. These books are written for the part in between, where a system has to run in production and somebody has to answer for it.

So the chapters stay close to real constraints: KV cache budgets, consensus, query plans, context windows, guardrails. Product discovery, team leadership and enterprise selling share the shelf with infrastructure on purpose, because shipping a system takes all of them.

---

## The catalogue

| No. | Volume | Subject | Chapters | What it covers |
| :-: | :--- | :--- | :-: | :--- |
| 01 | **AI System Design** | Artificial Intelligence | 200 | Retrieval pipelines, distributed deployment, KV cache scaling, model evaluation, latency budgets |
| 02 | **AI Agents** | Artificial Intelligence | 200 | Agent reasoning, tools, context and memory, orchestration, evaluation, reliability, security |
| 03 | **AI Architecture** | Artificial Intelligence | 200 | Context engineering, RAG, tools, agents, orchestration, evaluation, operations, governance |
| 04 | **AI Engineering** | Artificial Intelligence | 200 | Neural networks, transformers, APIs, prompt engineering, RAG, agents, fine-tuning, serving, safety |
| 05 | **LLM Deployment** | Artificial Intelligence | 100 | vLLM, INT4/FP8 quantization, GPU capacity planning, multi-user serving |
| 06 | **Harness Engineering** | Artificial Intelligence | 100 | Runtime scaffolding, context pipelines, feedback loops, verification environments for agents |
| 07 | **AI Security** | Artificial Intelligence | 100 | Prompt injection, jailbreaks, extraction attacks, data poisoning, defenses and governance |
| 08 | **Sovereign AI** | Artificial Intelligence | 100 | Compute clusters, data localization, regulatory frameworks, national AI infrastructure |
| 09 | **AI Product Manager** | Artificial Intelligence | 200 | Problem discovery, synthetic datasets, evals, UX, roadmap execution |
| 10 | **AI Team Lead** | Artificial Intelligence | 200 | Leading AI engineering teams, planning work, communication, experimentation habits |
| 11 | **Database Engineering** | Engineering | 200 | Relational modeling, SQL, indexing, transactions, query optimization, replication, distributed databases |
| 12 | **Backend & API Engineering** | Engineering | 200 | API design, authentication, data access, background jobs, testing, security, observability, deployment |
| 13 | **Cloud & DevOps Engineering** | Engineering | 200 | Linux, cloud platforms, networking, infrastructure as code, CI/CD, Kubernetes, reliability, FinOps |
| 14 | **Distributed Systems Engineering** | Engineering | 200 | Consensus, replication, data systems, fault tolerance, operations, case studies |
| 15 | **Cybersecurity & Application Security** | Engineering | 200 | Cryptography, identity and access, network and web application security, API security, secure development, testing, security operations |
| 16 | **Python Mastery** | Programming | 200 | Language fundamentals, tooling, data, testing, application design, production practices |
| 17 | **Sales Mastery** | Business | 200 | Cold outreach, technical demos, executive negotiation, enterprise renewals |

---

## What the site does

- **The shelf.** Every volume sits spine-out on the first page, grouped by subject. Click a spine to open the book; a red ribbon marks the ones you have started.
- **The catalogue.** A searchable index of all seventeen volumes, filterable by subject or by what you have in progress. Press `/` to search.
- **The reader.** Each book opens in a full-screen reader with a chapter stepper, a table of contents, a progress count and a shareable link to the chapter you are on. `←` and `→` move between chapters, `Esc` returns to the library.
- **Focus dock.** A 25-minute focus timer and ambient sound, available on every page.
- **Light and dark.** One switch, remembered between visits.
- **Private by default.** No account, no analytics, no cookies. Your place in each book is kept in your browser's `localStorage` and nowhere else.

---

## How it is built

Plain HTML, CSS and vanilla JavaScript. There is no build step and no package to install: `index.html` is the library, and each book is a single self-contained HTML file next to it.

The only external requests are for web fonts (Zodiak and Switzer from Fontshare on the first page; IBM Plex from Google Fonts inside the books). Without a connection the site still works and falls back to system fonts.

---

## Running locally

```bash
git clone https://github.com/harshdotcom/AI-Systems.git
cd AI-Systems
```

Open `index.html` in a browser, or serve the folder:

```bash
# Linux
xdg-open index.html

# macOS
open index.html

# Or serve via Python
python3 -m http.server 8000
```

---

## Deployment on GitHub Pages

The repository is ready for GitHub Pages:

- `.nojekyll` is included so Pages serves the files as they are.
- Every book is linked relatively, so the site works at `https://harshdotcom.github.io/AI-Systems/` or under any other path.

---

## Credits

Curated by **[Harsh Jha](https://www.linkedin.com/in/harshjha-iiti/)**, AI Lead at Formee Holdings.
Built by a team of IITians.

### About the curator

I'm [Harsh Jha](https://www.linkedin.com/in/harshjha-iiti/). I lead AI engineering at Formee Holdings in Bengaluru, where we build generative AI, RAG and agentic systems that have to hold up in production.

I came to AI from backend engineering. At SimplyPhi I shipped more than twenty production features and fifty REST APIs in Go and Python, on Azure and Oracle Cloud, and led a team of developers. I studied civil engineering at IIT Indore and taught myself to program. I curate this library with a team of fellow IITians.

| | |
| :--- | :--- |
| 2026 – | **Formee Holdings**, AI Lead. Bengaluru. |
| 2024 – 26 | **SimplyPhi**, Software Engineer, then Senior and Full Stack Engineer. Indore. |
| 2023 – 24 | **Prodigal AI**, Associate Software Engineer. Singapore. |
| 2020 – 24 | **IIT Indore**, Bachelor of Technology, Civil Engineering. |
