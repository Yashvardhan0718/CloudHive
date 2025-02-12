# CloudHive - Frontend

[![CloudHive](https://img.shields.io/badge/CloudHive-Frontend-brightgreen)](https://github.com/SomnathKar000/CloudHive)
[![Backend Repo](https://img.shields.io/badge/Backend%20Repo-CloudHive%20Backend-blue)](https://github.com/SomnathKar000/CloudHive-Backend)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Cloud%20Hive-9cf)](https://cloud-hive.vercel.app/)

CloudHive is a web application that allows users to securely upload and manage files in the cloud. This repository contains the frontend code for the CloudHive project. It is built using React, Material-UI, Redux with Redux Thunk for state management, and Axios for API calls. The project is built with Vite for fast and efficient development.

## Features

- **User-Friendly Interface:** Built with React and Material-UI to provide a visually appealing and intuitive user interface.

- **State Management:** Utilizes Redux with Redux Thunk for efficient state management and asynchronous actions.

- **API Calls:** Communicates with the CloudHive-Backend API using Axios for seamless data exchange.

- **Vite Build:** The project is built using Vite for a faster and more efficient development experience.

## Getting Started

Follow these steps to set up the CloudHive frontend locally:

1. **Clone the repository:**

   ```shell
   git clone https://github.com/your-username/CloudHive.git
   ```

2. **Install Dependencies:**

   ```shell
   cd CloudHive
   npm install
   ```

3. **Set Environment Variables:**

   - In your `.env` file, set the API endpoint for your CloudHive-Backend (e.g., `REACT_APP_API_URL=https://your-backend-api-url`).

4. **Start the Development Server:**
   ```shell
   npm run dev
   ```

Your frontend development server should now be running at `http://localhost:3000`.

## Folder Structure

The project folder structure is organized as follows:

- `src/`: Contains the main source code for the application.
  - `components/`: React components used in the application.
  - `store/`: Redux store.
  - `utils/`: Utility functions and helper files.
  - `App.js`: The entry point of the application.
  - `index.js`: The application's main ReactDOM render.

## Deployment

To deploy the CloudHive frontend, build the application using:

```shell
npm run build
```

The build files will be generated in the `build/` directory. You can then deploy these files to your hosting platform of choice.
