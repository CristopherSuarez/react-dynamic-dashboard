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

## 🧰 Tech Stack

| Category | Technology | Purpose |
|-----------|-------------|----------|
| ⚛️ Frontend Framework | **React 18 + TypeScript** | Core framework and type safety |
| 🎨 Styling | **Material UI** | Utility-first styling for fast UI building |
| 📊 Charts | **@mui/x-charts** | Chart components for visualizing data |
| 🧠 Data Fetching | **TanStack Query** | Handles async data fetching, caching, and synchronization |
| 🧪 Mock Data | **Faker.js (Custom Service)** | Generates realistic demo data for widgets |
| ⚙️ Build Tool | **Vite** | Fast development and optimized builds |
| 🧩 State Management | **React Context API** | Manages widget configurations and dashboard state |

## 🧱 Project Structure

```
src/
├── components/
│ ├── Dashboards/
│ ├── Widgets/
│ ├── Modal/ -> future common
│ ├── Tabs/ -> future common
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

### Clone the repository
```bash
git clone https://github.com/your-username/react-dynamic-dashboard.git
cd react-dynamic-dashboard

npm install

npm run dev
```

Then visit: http://localhost:5173

## 🧩 Widgets Overview
### 🧩 Adding a New Widget (Extending the Dashboard)
The system is designed to be **modular and scalable**, allowing developers to easily add new types of widgets without modifying the existing architecture.

### 🏗️ Widget Architecture Overview
Each widget lives inside the `/src/components/Widgets` directory and usually follows this structure:
```
Widgets/
├── ChartWidget/
│ ├── ChartWidget.tsx # Main visualization component
│ ├── ChartWidgetParser.ts # Parser to format fetched data
├── NumberWidget/
│ ├── NumberWidget.tsx
│ ├── NumberWidgetParser.ts
└──
```

#### Create the Widget Component
Example: `YourWidgetName.tsx`

```tsx
function YourWidgetName(widgetProps: WidgetProps) {
  const { label, query } = widgetProps;

  const { data = [], isLoading, error } = useQuery({
    queryKey: ['yourWidget', widgetProps.id],
    queryFn: async () => fetchCustomFakerData(query)
  });

  if (isLoading) return <EmptyPlaceHolder customMessage={`Loading ${label}...`} />;
  if (error) return <EmptyPlaceHolder customMessage={`Error loading ${label}`} />;
  if (!data.length) return <EmptyPlaceHolder customMessage="No data available" />;

  const parsed = parseYourWidgetData(data);

  return <SomeChartComponent {...parsed} />;
}

export default YourWidgetName;
```

### Create the data parser
```tsx
function parseYourWidgetData(data: Record<string, SimpleFakerType>[]) {
  // Validate and transform data
  .
  .
  .
  return { xAxis, series }; // Or any structure chart data
}

export default parseYourWidgetData;
```

### Register the new widget
in `src\components\Dashboards\Dashboard.tsx` **temporal widgets registry**

```tsx
const renderWidget = (widget: WidgetProps) => {
  switch (widget.type) {
    case 'number':
      return <NumberWidget {...widget} />;

    case 'barChart':
      return <ChartWidget {...widget} />;

    case 'pieChart':
      return <PieChartWidget {...widget} />;

    case 'yourWidgetName':
      return <YourWidgetComponent {...widget} />
    default:
      return <EmptyPlaceHolder customMessage="No widget found" />;
  }
};
```

### 🧩 JSON configuration
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

## Future main issues
- [Widget refactor](https://github.com/CristopherSuarez/react-dynamic-dashboard/issues/34)
- [Overview Dashboard](https://github.com/CristopherSuarez/react-dynamic-dashboard/issues/28)

## 🧑‍💻 Author

**Cristopher Suarez**  
[GitHub Profile](https://github.com/CristopherSuarez)
