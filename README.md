# React Dynamic Dashboard

A dynamic, modular, and data-driven dashboard built with React + TypeScript.  
Easily add, configure, and visualize widgets such as charts, numbers, and cards with flexible layouts.


## ✨ Features

- Dynamic widgets (Bar, Pie, Number)
- JSON-based widget configuration
- Modular architecture with reusable components
- Faker integration for demo data
- Context-driven state management
- Material UI styling
- Easily extendable for new widget types

## 🧱 Project Structure

```
src/
├── components/
│ ├── Dashboards/
│ ├── Widgets/
│ ├── Modal/
│ ├── Tabs/
│ └── common/
├── context/
├── config/
├── services/
├── utils/
├── assets/
├── App.tsx
└── main.tsx
```

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/react-dynamic-dashboard.git
cd react-dynamic-dashboard

npm install

npm run dev
```

Then visit: http://localhost:5173

---

### 5. 🧩 Widgets Overview
Explica brevemente cómo funciona la arquitectura de widgets.

```md
## 🧩 Widgets Overview

Each widget is defined using a **JSON configuration** that describes:
- `label`: The widget name
- `type`: The chart type (e.g. `barChart`, `pieChart`, `number`)
- `query`: Object containing the number of entries and fields for data generation

Example:
```json
{
  "label": "Monthly Revenue",
  "type": "barChart",
  "query": {
    "quantity": 12,
    "fields": {
      "group": "word",
      "revenue": "number",
      "profit": "number"
    }
  }
}
```

## 🧰 Tech Stack

- React 18 + TypeScript
- Faker.js (for demo data)
- Material UICharts (for chart rendering)
- Vite (for fast dev build)

## 🧑‍💻 Author

**Cristopher Suarez**  
[GitHub Profile](https://github.com/CristopherSuarez)
