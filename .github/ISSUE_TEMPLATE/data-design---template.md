---
name: Data Design - Template
about: Template of Data Design for Components
title: ''
labels: ''
assignees: ''

---

---
name: Data Design
about: Define how the component interacts with data sources (APIs, DB).
title: "Data Design for [Component Name]"
labels: data-design
assignees: Gaby
---

## **Input Data**
- What data does the component receive? Include types and formats.
  - Example: `{ alarms: Array<Alarm>, filters: Array<string> }`

## **Output Data**
- What data or events does the component emit?
  - Example: `{ appliedFilters: Array<string> }`

## **API Integration**
- List all API endpoints the component interacts with.
  - Example: `GET /alarms?interval=[value]&type=[value]`
