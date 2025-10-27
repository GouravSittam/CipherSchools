<div align="center">

# 🚀 CipherStudio

### *The Ultimate Browser-Based React IDE*

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

**🌟 A powerful, full-featured React IDE that runs entirely in your browser**

[🎯 Live Demo](https://your-app.vercel.app) • [📖 Documentation](#-features) • [🐛 Report Bug](https://github.com/GouravSittam/CipherSchools/issues) • [💡 Request Feature](https://github.com/GouravSittam/CipherSchools/issues)

</div>

---

## 🎯 What is CipherStudio?

CipherStudio is a revolutionary browser-based IDE that brings the power of modern React development directly to your web browser. No installations, no setup complexity – just pure coding bliss with real-time preview, intelligent file management, and a beautiful interface that adapts to your workflow.

### ✨ Why Choose CipherStudio?

- 🚀 **Instant Setup** - Start coding React in seconds, no local environment needed
- 🎨 **Beautiful UI** - Modern, responsive design with dark/light themes
- ⚡ **Real-time Preview** - See your changes instantly as you type
- 💾 **Smart Persistence** - Auto-save with MongoDB integration and localStorage fallback
- 📱 **Mobile Friendly** - Code on any device, anywhere
- 🔧 **Full-Featured** - Complete file management, project import/export, and more

---

## 🌟 Features

<table>
<tr>
<td width="50%">

### 🎨 **Modern IDE Experience**
- Full-screen, responsive layout
- Sticky toolbar with intuitive controls
- File explorer with drag-and-drop support
- Syntax highlighting and error detection
- Auto-completion and IntelliSense

### 📁 **Project Management**
- Create, rename, and delete files/folders
- Multiple sample projects included
- Project templates for quick starts
- Bulk operations and file organization

</td>
<td width="50%">

### 💾 **Smart Data Persistence**
- MongoDB integration for cloud storage
- localStorage fallback for offline work
- Auto-save with manual override option
- Project export/import as JSON
- Cross-device synchronization

### 🎯 **Developer Experience**
- Keyboard shortcuts for power users
- Light/dark theme toggle
- Real-time error highlighting
- Live preview with hot reload
- Mobile-responsive design

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Frontend | Backend | Styling | Tools |
|----------|---------|---------|-------|
| ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js) | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) | ![Vercel](https://img.shields.io/badge/Vercel-black?style=flat-square&logo=vercel) | ![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-black?style=flat-square) | ![Sandpack](https://img.shields.io/badge/Sandpack-orange?style=flat-square) |

</div>

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm/bun

### Installation

```bash
# Clone the repository
git clone https://github.com/GouravSittam/CipherSchools.git

# Navigate to project directory
cd CipherSchools

# Install dependencies
npm install

# Start development server
npm run dev
```

🎉 **That's it!** Open [http://localhost:3000](http://localhost:3000) and start coding!

---

## 📸 Screenshots

<div align="center">

### 🌙 Dark Theme
![Dark Theme](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=CipherStudio+Dark+Theme)

### ☀️ Light Theme  
![Light Theme](https://via.placeholder.com/800x400/ffffff/000000?text=CipherStudio+Light+Theme)

### 📱 Mobile Responsive
![Mobile View](https://via.placeholder.com/400x600/2563eb/ffffff?text=Mobile+Responsive)

</div>

---

## ⌨️ Keyboard Shortcuts

| Action | Shortcut | Description |
|--------|----------|-------------|
| Save Project | `Ctrl/Cmd + S` | Trigger manual save (shows toast) |
| Show Shortcuts | `Ctrl/Cmd + K` | Open shortcuts dialog |
| Toggle Theme | Click theme button | Switch between light/dark modes |
| New File | `Ctrl/Cmd + N` | Create new file (coming soon) |
| Quick Search | `Ctrl/Cmd + P` | File search (coming soon) |

---

## 🏗️ Project Structure

```
CipherStudio/
├── 📁 src/
│   ├── 📁 app/                 # Next.js App Router
│   │   ├── layout.tsx          # Root layout & providers
│   │   ├── page.tsx            # Main IDE page
│   │   ├── globals.css         # Global styles & themes
│   │   └── icon.svg            # App favicon
│   ├── 📁 components/          # React components
│   │   ├── CipherStudio.tsx    # Main IDE component
│   │   └── 📁 ui/              # Reusable UI components
│   ├── 📁 lib/                 # Utilities & services
│   │   └── 📁 services/        # API services
│   └── 📁 providers/           # Context providers
├── 📁 public/                  # Static assets
├── 📄 package.json             # Dependencies
├── 📄 tailwind.config.js       # Tailwind configuration
├── 📄 next.config.ts           # Next.js configuration
└── 📄 vercel.json              # Deployment config
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/GouravSittam/CipherSchools)

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Environment Variables

For MongoDB integration, set these in your deployment:

```env
MONGODB_URI=your-mongodb-connection-string
DATABASE_NAME=cipherstudio
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com
```

---

## 🤝 Contributing

We love contributions! Here's how you can help make CipherStudio even better:

### 🐛 Found a Bug?
1. Check if it's already reported in [Issues](https://github.com/GouravSittam/CipherSchools/issues)
2. Create a detailed bug report with steps to reproduce

### 💡 Have a Feature Idea?
1. Open a [Feature Request](https://github.com/GouravSittam/CipherSchools/issues/new)
2. Describe your idea and why it would be useful

### 🔧 Want to Code?
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📊 Roadmap

- [ ] 🔍 **Advanced Search** - Global file and content search
- [ ] 🎨 **Theme Customization** - Custom color schemes
- [ ] 🔌 **Plugin System** - Extensible architecture
- [ ] 👥 **Collaboration** - Real-time collaborative editing
- [ ] 📦 **Package Manager** - NPM package integration
- [ ] 🚀 **Deployment Integration** - One-click deploy to various platforms
- [ ] 🧪 **Testing Framework** - Built-in testing capabilities
- [ ] 📱 **PWA Support** - Offline-first progressive web app

---

## 🏆 Acknowledgments

<div align="center">

**Built with ❤️ by [Gourav Chaudhary](https://linkedin.com/in/GouravSittam)**

Special thanks to:
- [CodeSandbox](https://codesandbox.io/) for the amazing Sandpack editor
- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component patterns
- [Vercel](https://vercel.com/) for seamless deployment
- [Next.js](https://nextjs.org/) team for the incredible framework

</div>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🌟 Star this repo if you found it helpful!

[![GitHub stars](https://img.shields.io/github/stars/GouravSittam/CipherSchools?style=social)](https://github.com/GouravSittam/CipherSchools/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/GouravSittam/CipherSchools?style=social)](https://github.com/GouravSittam/CipherSchools/network/members)

**Made with 💻 and ☕ by developers, for developers**

[⬆️ Back to Top](#-cipherstudio)

</div>