# Serving your SciKit Learn Model as a Prediction API

1. [Preparing the ML Model](https://mpolinowski.github.io/docs/IoT-and-Machine-Learning/AIOps/2023-06-17-scikit-learn-model-deployment/2023-06-17#preparing-the-ml-model)
    * Pick a SKLearn model that fits your dataset
    * Preprocess your dataset and do test trainings / hyperparameter tuning
    * Fit the model to your dataset
    * Pickle the trained model for deployment
2. [Preparing the Model API](https://mpolinowski.github.io/docs/IoT-and-Machine-Learning/AIOps/2023-06-17-scikit-learn-model-deployment/2023-06-17#preparing-the-model-api)
    * Use Flask to prepare a REST API endpoint for your model
    * Test predictions using HTTP POST requests
3. [Containerizing the Application](https://mpolinowski.github.io/docs/IoT-and-Machine-Learning/AIOps/2023-06-17-scikit-learn-model-deployment/2023-06-17#containerizing-the-application)
    * Wrap the Flask application in a Docker image
4. [React.js Frontend](https://mpolinowski.github.io/docs/IoT-and-Machine-Learning/AIOps/2023-06-17-scikit-learn-model-deployment/2023-06-17#reactjs-frontend)
    * Write a React.js frontend that can interface with your REST API
4. [Serve Frontend using the Flask App](https://mpolinowski.github.io/docs/IoT-and-Machine-Learning/AIOps/2023-06-17-scikit-learn-model-deployment/2023-06-17)
    * Use Vite.js to render the React frontend to static HTML
    * Add a static route to your Flask app to serve the frontend from inside the Docker image


![Serving your SciKit Learn Model as a Prediction API](https://github.com/mpolinowski/sklearn-model-deployment/blob/master/04_react_frontend/SciKit_Learn_Model_API.gif)
