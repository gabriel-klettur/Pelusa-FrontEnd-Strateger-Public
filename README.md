# 📘 **Pelusa FrontEnd Strateger Public**

## 📚 **Table of Contents**
1. [General Overview](#1--general-overview)
2. [Project Features](#2-project-features)
3. [Project Structure](#3-project-structure)
4. [Technologies Used](#4-technologies-used)
5. [Installation & Setup](#5-installation--setup)
6. [Usage](#6-usage)
7. [Component Development Lifecycle](#7-component-development-lifecycle)
8. [Git Workflow & Contributions](#8-git-workflow--contributions)
9. [Kanban Workflow](#9-kanban-workflow)
10. [License](#10-license)
11. [Contact](#11-contact)

---

## 📍 **1. General Overview**
**Project Name:** Pelusa FrontEnd Strateger Public  

**Description:**  
Pelusa FrontEnd Strateger Public is a React-based frontend for the Pelusa Trader ecosystem. It provides a modern, responsive, and professional interface to visualize, manage, and interact with trading strategies, alarms, orders, and positions. It connects to several backends, including AlarmHugger, Strateger, and Siteground DB. This project focuses on scalability, modularity, and clean UI/UX design using modern technologies like Redux Toolkit, Tailwind CSS, Headless UI, and Lightweight Charts.

### 🔑 **Key Goals**
- 📈 **Trading Dashboard**: Visualize, manage, and analyze orders, alarms, and strategies in real-time.
- 🧩 **Modular Design**: Organized file structure and clear separation of components, hooks, and utilities.
- 🎨 **Modern UI/UX**: Built with Tailwind CSS and Headless UI for a responsive, minimalist design.
- 🔗 **Backend Connectivity**: Interacts with FastAPI backends to pull trading data in real-time.
- ⚙️ **Automation Ready**: Ready for future automation and integration with the Pelusa Trader system.

---

## 🔥 **2. Project Features**
- **Modular Component Architecture**: Easily maintainable, reusable, and testable components.
- **Advanced Filtering Options**: Filter alarms and orders by intervals, strategies, tickers, and more.
- **Interactive Alarms Dashboard**: Real-time interaction with alarms, charts, and strategies.
- **Customizable Chart System**: Integrates Lightweight Charts for advanced data visualization.
- **Real-time Updates**: Keeps alarm, order, and position data updated.
- **Optimized Performance**: Built with Vite to ensure fast build times and optimal performance.
- **Dark Mode Ready**: Supports light and dark themes.
- **Global State Management**: Powered by Redux Toolkit for shared state and efficient updates.

---


## 📁 **3. Project Structure**
The project follows a modular file structure to ensure scalability, maintainability, and clarity.
```bash
📦 strateger-react/ 
├── 📂 config/ # Configuration files for Webpack, paths, and Jest 
├── 📂 docs/ # Documentation and project diagrams 
├── 📂 public/ # Public assets (favicon, manifest, etc.) 
├── 📂 scripts/ # Custom scripts (build, start, test) 
├── 📂 src/ # Main source folder for components, hooks, utils, and redux 
│ ├── 📂 components/ # Reusable React components  
│ ├── 📂 containers/ # Main container components 
│ ├── 📂 hooks/ # Custom React hooks  
│ ├── 📂 redux/ # Redux slices, thunks, and selectors  
│ ├── 📂 utils/ # Helper and utility functions 
│ └── 📂 styles/ # Global styles 
├── 📄 README.md # Project documentation 
├── 📄 package.json # Project dependencies and scripts 
└── 📄 tailwind.config.js # Tailwind CSS configuration
```
---


## 🛠️ **4. Technologies Used**

### **Frontend**
- **React**: Component-based UI library.
- **Redux Toolkit**: State management with slices and thunks.
- **Tailwind CSS**: Utility-first CSS framework for consistent design.
- **Headless UI**: Unstyled, accessible components for building menus, tabs, modals, etc.
- **Lightweight Charts**: Interactive charts for financial data visualization.
- **Chart.js**: Simple yet flexible JavaScript charting library.
- **Axios**: HTTP client to interact with backend services.

### **Testing**
- **Jest**: Unit and integration testing.
- **React Testing Library**: For testing React components.

---

## 🚀 **5. Installation & Setup**

1️⃣ **Clone the repository**
```bash
git clone https://github.com/your-username/strateger-react.git
```

2️⃣ Navigate to the project directory
```bash
cd strateger-react
```
3️⃣ Install dependencies
```bash
npm install
```
4️⃣ Start the development server
```bash
npm run dev
```
The app will be available at http://localhost:3000.


## 📚 **6. Usage**

Once the server is running, you can interact with the following modules:

- **Alarms**: Manage and view your trading alarms, visualize historical data, and track activity in real-time.
- **Orders**: Track and manage trading orders, with advanced filtering options.
- **Backtesting**: Simulate strategies to test profitability.
- **Account**: View and track account balance and summary.
- **Strategy**: Create, update, and view your trading strategies.

---

## 📦 **7. Component Development Lifecycle**

### **Building Cycle**
1. **Requirements Specification**: Define what the component does and why it's necessary.
2. **UI/UX Design**: Create the design, wireframe, and interaction logic.
3. **Logic Design**: Write logic for component actions, event listeners, and data flow.
4. **Data Design**: Define the structure of props, state, and API responses.
5. **Implementation**: Build the component.
6. **Testing**: Write unit and integration tests.

### **Consolidate Cycle**
1. **Usage Documentation**: Write instructions for use.
2. **Code Review**: Identify and resolve issues before production.
3. **Integration and Deployment**: Ensure the component works in production.

---

## 📘 **8. Git Workflow & Contributions**

### **Branch Strategy**
- **main**: Production-ready code.
- **develop**: Active development.

### **Branch Naming**
- **Features**: `feat/feature-name`
- **Bug Fixes**: `fix/bug-description`

### **Commit Messages**
Follow the **Conventional Commits** standard:
```bash
<type>(<scope>): <short description>
```
**Examples:**
- `feat(alarms): added AlarmStats component`
- `fix(toolbar): resolved issue with button alignment`

### **How to Contribute**
1. **Fork** the repository.
2. **Create a new branch**: 
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. Make your changes and commit them:
```bash
git commit -m "feat(scope): description"
```
4. Push your branch:
```bash
git push origin feat/your-feature-name
```
5. Create a Pull Request.

## 📝 **9. Kanban Workflow**

### **Kanban Columns**
- **No Status**: Unreviewed tasks.
- **Ready for Development**: Tasks ready for development.
- **In Progress**: Tasks in active development.
- **Review**: Pending review.
- **Blocked**: Tasks with issues to resolve.
- **Testing**: Tasks under testing.
- **Done**: Completed tasks.
- **Future Ideas**: Possible future features or optimizations.

### **Tags & Labels**
The following tags are used for Issues and Pull Requests:
- **enhancement**: New features.
- **bug**: Bug reports.
- **question**: Questions or clarification.
- **wontfix**: Issues that will not be fixed.
- **documentation**: Changes related to documentation.

---

## 📜 **10. License**

This project is licensed under the **MIT License**. See the `LICENSE` file for more information.

---

## 💬 **11. Contact**

If you have any questions, issues, or feedback, feel free to contact **Gaby** through:

- **GitHub Issues**: Open an issue in this repository.
- **Email**: [gabriel.astudillo.roca@gmail.com](mailto:your-email@example.com)

