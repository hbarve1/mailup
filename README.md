# MailUp: A Chat-Style Desktop Mail Client

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Electron](https://img.shields.io/badge/Electron-191970?logo=electron&logoColor=white)](https://www.electronjs.org/)

> **MailUp reimagines email as a chat experience.** Instead of traditional inboxes and threads, each email conversation appears like a messaging app—with chat bubbles, a sidebar for conversations, and a reply box at the bottom. The goal is to make email feel as fast, intuitive, and modern as chat, while supporting all the power of traditional email.

## ✨ Features

- **💬 Chat-style UI:** See your emails as chat bubbles in a conversation
- **📱 Unified conversations:** Sidebar lists all your email threads, just like chats
- **✍️ Rich replies:** Compose responses with formatting and attachments in a familiar chat interface
- **🖥️ System integration:** Native notifications, tray icon, and drag-and-drop attachments for a seamless desktop experience
- **📧 Multi-provider support:** Gmail, Outlook, Yahoo, and custom IMAP/SMTP accounts
- **⚡ Offline-first:** Access and compose emails even without an internet connection

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hbarve1/mailup.git
   cd mailup
   ```

2. **Install dependencies**
   ```bash
   cd desktop
   npm install
   ```

3. **Start development server**
   ```bash
   # Start Vite dev server
   npm run dev
   
   # In another terminal, start Electron
   npm start
   ```

### Building for Production

```bash
# Build the application
npm run build

# The built files will be in the `dist/` directory
# Electron will load from `dist/index.html`
```

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **Desktop**: Electron.js
- **State Management**: Zustand
- **Build Tool**: Vite
- **Database**: SQLite (planned)
- **Email Protocols**: IMAP/SMTP (planned)

### Project Structure

```
mailup/
├── desktop/                 # Main Electron application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ChatWindow/ # Main chat interface
│   │   │   ├── MessageList/# Message display
│   │   │   ├── MessageInput/# Reply interface
│   │   │   ├── Sidebar/    # Conversation list
│   │   │   └── AppHeader/  # Top navigation
│   │   ├── store/          # State management (Zustand)
│   │   ├── pages/          # Route pages
│   │   └── types/          # TypeScript definitions
│   ├── backend/            # Electron main process
│   │   └── index.cjs       # Main Electron window
│   └── package.json        # Dependencies & scripts
├── docs/                   # Documentation
│   └── prd.md             # Product Requirements Document
└── README.md              # This file
```

### Key Components

- **`ChatWindow`**: Main chat interface displaying messages as bubbles
- **`Sidebar`**: Conversation list with user avatars and previews
- **`MessageInput`**: Rich text editor for composing replies
- **`mailStore`**: Zustand store managing application state
- **`Electron Backend`**: Desktop integration and system features

## 🎨 UI/UX Design

MailUp features a modern, chat-inspired interface:

- **Gradient Background**: Beautiful green-to-blue gradient with glass-morphism effects
- **Chat Bubbles**: Messages displayed in familiar chat format
- **Responsive Design**: Adapts seamlessly to different screen sizes
- **Dark/Light Mode**: Planned feature for user preference
- **System Integration**: Native notifications and tray functionality

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start Vite development server
npm run start        # Launch Electron with built app
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### State Management

MailUp uses **Zustand** for state management with the following stores:

- **`mailStore`**: Manages email data, users, conversations, and messages
- **`userStore`**: User authentication and preferences
- **`chatStore`**: Real-time chat state and notifications

### Adding New Features

1. **Components**: Add new React components in `src/components/`
2. **Pages**: Create new routes in `src/pages/`
3. **State**: Extend stores in `src/store/`
4. **Types**: Define TypeScript interfaces in `src/types/`

## 🤝 Contributing

We welcome contributions from the open-source community! Here's how you can help:

### Getting Started

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- **Code Style**: Follow the existing ESLint configuration
- **TypeScript**: Use strict typing for all new code
- **Testing**: Add tests for new features (testing framework TBD)
- **Documentation**: Update docs for any API changes
- **Commits**: Use conventional commit messages

### Areas for Contribution

- **Email Integration**: IMAP/SMTP connectors for various providers
- **UI Components**: New chat features and interface improvements
- **Performance**: Optimizations for large email volumes
- **Testing**: Unit and integration tests
- **Documentation**: API docs, user guides, and tutorials
- **Localization**: Multi-language support

## 📋 Roadmap

### Phase 1: Core Email Integration
- [ ] IMAP/SMTP connectors for Gmail, Outlook, Yahoo
- [ ] Local SQLite database for offline caching
- [ ] Real-time email synchronization
- [ ] Basic attachment handling

### Phase 2: Enhanced Features
- [ ] Multiple account support
- [ ] Unified inbox across providers
- [ ] Advanced search and filtering
- [ ] Email templates and signatures
- [ ] Dark/Light theme toggle

### Phase 3: Advanced Capabilities
- [ ] AI-powered features (summarization, smart replies)
- [ ] Collaboration tools (shared inboxes)
- [ ] End-to-end encryption
- [ ] Offline-first architecture
- [ ] Mobile companion app

## 🐛 Issues & Support

- **Bug Reports**: Use the [GitHub Issues](https://github.com/hbarve1/mailup/issues) page
- **Feature Requests**: Submit via GitHub Issues with the "enhancement" label
- **Questions**: Start a [GitHub Discussion](https://github.com/hbarve1/mailup/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing frontend framework
- **Electron Team** for desktop app capabilities
- **Tailwind CSS** for the utility-first CSS framework
- **Zustand** for lightweight state management
- **Vite** for the fast build tool

## 📞 Contact

- **Project Link**: [https://github.com/hbarve1/mailup](https://github.com/hbarve1/mailup)
- **Issues**: [https://github.com/hbarve1/mailup/issues](https://github.com/hbarve1/mailup/issues)
- **Discussions**: [https://github.com/hbarve1/mailup/discussions](https://github.com/hbarve1/mailup/discussions)

---

**Made with ❤️ by the MailUp community**
