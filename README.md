## Steps
- ng --version
- update angular: ng update @angular/cli @angular/core
- ng add @angular/material
-- npm install --save @angular/material @angular/cdk @angular/animations
- npm install @angular/flex-layout --save
- npm install ng2-charts chart.js --save
  - npm i chartjs-plugin-datalabels: why we're using this?


## Errors
- Angular-flex: No provider for StyleUtils
  > Check if it's version 9 and angular is version 8.  Bump up the version to match
- If the hamburger button looks weird, make sure you have both matbuttonmodule an maticonmodule imported

## Flex layout
- fxLayoutAlign="center center" means justify-content: center, align-items: center; align-content: center
  https://github.com/angular/flex-layout/wiki/fxLayoutAlign-API
- fxLayout: for parent
- fxFlex: for children