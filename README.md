# Paidy Test


## Get started


## Project Setup

1. Install node modules
   ```bash
   yarn
   ```
    or
  
   ```bash
   npm install
   ```

2. Running the Project

   ```bash
   yarn ios
   ```
   ```bash
   yarn android
   ```
    or
  

   ```bash
   npm run ios
   ```
   ```bash
   npm run android
   ```
  


## Architecture
  ## Workflow
  I created the app in both bare and expo managed workflow. 
  To Use the expo bare workflow you can clone this branch: 
  To use the managed workflow you can clone this branch:

 ## State management 
  For the state management, i made use of the context API as opposed to redux due to the simplicity of the project. For larger projects redux might be a more suitable option

  ## UI
  - For the UI components, i made you of the atomic design system pattern. for more info: https://bradfrost.com/blog/post/atomic-web-design/

  - I also made use of my published npm package called 'react-native-swipeout-component' to render the todo lists. https://www.npmjs.com/package/react-native-swipeout-component

  ## Unit Tests
  I made use of jest for the Unit tests


  ## IOS simulator local authentication setup
  To setup/enroll the local authentication on ios simulator you can follow the steps in the image below :)
  

   <img width="1431" alt="Screenshot 2025-01-22 at 21 37 19" src="https://github.com/user-attachments/assets/eaadcb51-e90e-4a3e-9069-8b8246a141e0" />
