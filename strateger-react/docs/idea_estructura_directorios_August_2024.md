La estructura de directorios debe tener una estructura parecida a la siguiente '''

/strateger-react
├── /docs                   # Documentación del proyecto
│   ├── prompt_frontend_strateger_28-5-2024.md
│   ├── prompt_github.txt
│   └── prompt_update_component.txt
├── /public                 # Archivos públicos y estáticos
│   ├── index.html
│   └── favicon.ico
├── /src                    # Código fuente de la aplicación
│   ├── /assets             # Recursos estáticos
│   │   ├── /images         # Imágenes generales
│   │   ├── /icons          # Íconos utilizados en la UI
│   │   ├── /fonts          # Fuentes personalizadas
│   │   ├── /styles         # Archivos CSS globales y de terceros
│   │   └── /videos         # Videos utilizados en la aplicación
│   ├── /components         # Componentes de presentación y UI
│   │   ├── /Charts         # Componentes para gráficos y visualización de datos
│   │   │   ├── TradingChart.jsx
│   │   │   ├── AccountSummaryChart.jsx
│   │   │   └── LightweightChart.js
│   │   ├── /UI             # Elementos reutilizables de la interfaz de usuario
│   │   │   ├── Button.jsx
│   │   │   └── Modal.jsx
│   │   ├── /Common         # Componentes comunes reutilizables en toda la aplicación
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── /Trading        # Componentes específicos de trading
│   │   │   ├── OrderBook.jsx
│   │   │   └── TradeHistory.jsx
│   │   ├── /Portfolio      # Componentes para gestión del portafolio
│   │   │   ├── PortfolioOverview.jsx
│   │   │   ├── PerpCOINMposSummary.js
│   │   │   └── PerpUSDTposSummary.js
│   │   ├── /Alerts         # Componentes relacionados con alarmas y notificaciones
│   │   │   ├── AlertsDashboard.jsx
│   │   │   ├── AlertsTable.jsx
│   │   │   └── AlarmCandleChart.jsx
│   │   ├── /News           # Componentes para noticias y análisis de sentimiento
│   │   │   └── NewsDashboard.jsx
│   │   ├── /Settings       # Componentes para configuración de usuario
│   │   │   └── UserSettingsPanel.jsx
│   ├── /containers         # Contenedores que conectan componentes a Redux y gestionan la lógica
│   │   ├── TradingContainer.jsx
│   │   ├── AlertsContainer.jsx
│   │   └── PortfolioContainer.jsx
│   ├── /layouts            # Componentes de diseño y distribución general de la aplicación
│   │   ├── MainLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── DashboardLayout.jsx
│   ├── /pages              # Páginas de la aplicación, organizadas por rutas principales
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   └── Portfolio.jsx
│   ├── /redux              # Gestión del estado global con Redux
│   │   ├── /slices         # Slices de Redux que manejan partes específicas del estado
│   │   │   ├── accountSlice.js
│   │   │   ├── alarmSlice.js
│   │   │   ├── backtestingSlice.js
│   │   │   ├── diarySlice.js
│   │   │   ├── orderSlice.js
│   │   │   ├── positionSlice.js
│   │   │   ├── strategySlice.js
│   │   │   ├── tabSlice.js
│   │   │   ├── tickerSlice.js
│   │   │   └── timeSlice.js
│   │   └── /services       # Servicios para interactuar con las APIs externas
│   │       ├── bingxService.js
│   │       └── tradingViewService.js
│   ├── /tests              # Pruebas unitarias, de integración y end-to-end
│   │   ├── /unit           # Pruebas unitarias para componentes individuales
│   │   ├── /integration    # Pruebas de integración para varias partes del sistema
│   │   └── /e2e            # Pruebas end-to-end para flujos completos de usuario
│   └── /utils              # Utilidades y funciones helper generales
│       ├── formatters.js
│       └── validators.js
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
└── index.js
'''