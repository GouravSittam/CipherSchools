# CipherStudio – Browser‑Based React IDE (Next.js)

**Author:** Gourav Chaudhary

CipherStudio is a full‑screen, responsive, browser‑based IDE for building and previewing small React projects in real time. It's powered by Next.js (App Router) and CodeSandbox Sandpack, with a modern UI built using Tailwind CSS and a Shadcn‑inspired component set.

The app opens to a complete IDE layout: a file explorer, code editor, and live preview. Projects are stored in localStorage and can be exported/imported as JSON.

## ✨ Features

- Full‑screen, responsive IDE layout (desktop‑first, mobile friendly)
- Sticky toolbar with project controls
- File explorer, code editor, and live preview via Sandpack
- Multiple sample projects to start from
- Create / Rename / Delete files and folders
- Export / Import project JSON
- Auto‑save to localStorage (toggleable)
- Light/Dark theme toggle
- Keyboard shortcuts (e.g., Ctrl/Cmd + S)
- Safe favicon via `src/app/icon.svg`

## 🧱 Tech Stack

- Next.js (App Router) with TypeScript
- Tailwind CSS with theming tokens
- Shadcn‑style UI components in `src/components/ui`
- CodeSandbox Sandpack (`@codesandbox/sandpack-react`)

## 📁 Project Structure

- `src/app/` – App Router entrypoints
  - `layout.tsx` – Root layout and providers
  - `page.tsx` – Renders the `CipherStudio` IDE
  - `globals.css` – Tailwind, theme tokens, base rules
  - `icon.svg` – Favicon (preferred over `favicon.ico`)
- `src/components/CipherStudio.tsx` – Main IDE experience
- `src/components/ui/*` – Reusable UI primitives
- `src/providers/ThemeProvider.tsx` – Theme switching

## 🚀 Getting Started

Prerequisites: Node 18+, and a package manager (npm, yarn, pnpm, or bun).

Install dependencies and run the dev server:

```bash
npm install
npm run dev
# or: yarn dev / pnpm dev / bun dev
```

Open `http://localhost:3000` in your browser.

## 🖥️ Full‑Screen & Responsive Behavior

This project is tuned to always fill the viewport and avoid horizontal scroll bars:

- Global CSS sets `html, body` to full viewport and hides horizontal overflow.
- `layout.tsx` and `page.tsx` use `h-screen w-screen overflow-hidden` wrappers.
- `CipherStudio.tsx` uses a `flex` column layout with a sticky header and a `flex-1 h-0` content area so Sandpack panes occupy 100% of the remaining height.

If you still see scrollbars, ensure no browser extensions inject extra page UI and confirm zoom is at 100%.

## ⌨️ Keyboard Shortcuts

- Save (toast): `Ctrl/Cmd + S`
- Open Shortcuts dialog: `Ctrl/Cmd + K`

## 💾 Persistence

Projects are saved to `localStorage` under the key `cipherstudio-projects`. You can disable auto‑save in Settings and save manually.

## 🔁 Import / Export

- Export the current project to a `.json` file.
- Import a project by pasting JSON in the Import dialog.

## 🧩 Theming

Toggle between light and dark themes with the toolbar button. Theme is provided via `next-themes` and tokens in `globals.css`.

## 🛠️ Scripts

```bash
npm run dev       # start development server
npm run build     # build for production
npm run start     # start production server
npm run lint      # run lint checks
```

## 🧪 Troubleshooting

- Favicon error (ICO decode): We use `src/app/icon.svg` to avoid ICO parsing issues. If you add `favicon.ico`, ensure it’s a valid ICO with standard sizes (16/32/48px).
- Viewport not full‑screen: Clear cache and ensure browser zoom is 100%. The layout relies on Tailwind classes and dvh/screen units.

## 📦 Deploy

CipherStudio deploys cleanly to Vercel or any Node host.

```bash
npm run build
npm run start
```

On Vercel, use the default Next.js preset (framework: Next.js). No extra env vars are required.

## 📝 License

MIT. See `LICENSE` if provided.

## 👨‍💻 Author

**Gourav Chaudhary** - Full-stack developer and creator of CipherStudio

## 🙌 Acknowledgements

- CodeSandbox Sandpack for the embedded editor/preview
- Shadcn UI patterns for component structure