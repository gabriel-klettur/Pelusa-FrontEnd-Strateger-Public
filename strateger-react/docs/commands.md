
### Run the app
```bash
npm start
```

### Build the app
```bash
npm run build
```

### Run the tests
```bash
npm test
```

### Run coverage tests
```bash 
npm test -- --coverage
```

### Run coverage tests for a specific file
```bash
npx jest --coverage --collectCoverageFrom="src/components/Alarms/**/*.{js,jsx}"
```

### Open report of coverage tests
```bash
open folder in  'coverage/lcov-report/'
open file 'index.html'
```

### Clear cache of jest
```bash
npx jest --clearCache
```