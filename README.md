
# Dorsal

Dorsal is a React application powered by Vite. This guide provides instructions for setting up and running the application locally.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16 or above recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/dorsal-fyi/dorsal-fyi-landing.git
```

2. **Install frontend dependencies**

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

3. **Setup Frontend Environment Variables**
Create a .env file in the root of the project and add the following variables:
```bash
VITE_MAP_ACCESS_TOKEN=zt7wt1ZXSBmlye8q8IQ6HuOv6p4idsbIbLl3Qi2ns2X4ZcbQbarIZpGE6YAkfi6L
VITE_API_BASE_URL=https://dorsaldata1.apurbatech.io
VITE_LANDING_BASE_URL=http://localhost:5000
```

4. **Running the App**

🖥️ Running the Frontend
To start the development server:
```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

🔧 Running the Backend
Navigate to the backend directory
```bash
cd backend
```

Install backend dependencies
```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

Create backend environment variables

Create a .env file in the backend/ directory and add the following variables:
```bash
SPREADSHEET_ID=10F52NcXEVgj41xw3_PS-aPnJ8fGsyEnX-D4qz2Tzafo
PORT=5000
```

Start the backend server

```bash
node index.js
```
