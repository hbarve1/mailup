
# ⚡ Iteration: MailChat (Electron.js Prototype)

## 🎯 Why Electron First?

* Cross-platform desktop app (Win/Mac/Linux) with one codebase.
* Easier to package as a **“new mail client”** without needing browser install.
* Can reuse **React/Next.js frontend** inside Electron window.
* Allows faster integration with system features (notifications, tray icon, clipboard, drag-drop).

---

## 🔑 Core Feature Set (Prototype Focus)

### 1. Chat-style UI

* **Sidebar:** List of conversations (like WhatsApp).
* **Main pane:** Chat bubbles for each mail in thread.
* **Top bar:** Contact name/email + actions (pin, mute, archive).
* **Bottom bar:** Reply box (rich text + attachments).

### 2. Email Handling

* **IMAP/SMTP connectors** for Gmail, Outlook, custom email.
* Store cached mails in **SQLite** (lightweight local DB).
* **Real-time sync:** Fetch new emails periodically or via push (Gmail API first).

### 3. System Integrations

* **Native notifications** on new mails.
* **Tray icon** with unread badge count.
* **Drag & drop attachments** into chat window.

### 4. Minimal AI Layer (Optional in Prototype)

* Inline **summarization** of long emails.
* “Smart reply” chips in reply box.

---

## 🛠️ Tech Stack (Prototype)

* **Electron.js** → Desktop container.
* **Frontend:** React + Tailwind (UI components).
* **State Mgmt:** Redux / Zustand for chat state.
* **Backend (inside app):** Node.js services for IMAP/SMTP sync.
* **Database:** SQLite (via Prisma/TypeORM) for local cache.

---

## 🔮 Future after Prototype

1. **Phase 2:**

   * Better sync engine (background worker).
   * Multiple accounts unified inbox.
   * Inline previews for PDF, DOC, etc.
   * AI chat-style summaries.

2. **Phase 3:**

   * Collaboration: shared inbox.
   * Offline-first design.
   * E2E encryption for private mails.

---

## 🚀 Next Steps for Prototype

1. **Scaffold Electron + React app**

   * One main window (chat UI).
   * System tray integration.

2. **Basic IMAP sync** (fetch last 50 mails per account).

3. **UI mockup in React**

   * Sidebar (chat list).
   * Chat window (mail bubbles).
   * Reply box.

4. **Local caching (SQLite)** so we can load mails even offline.
