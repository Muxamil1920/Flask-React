# Serving your SciKit Learn Model as a Prediction API

1. [Preparing the ML Model](https://github.com/Muxamil1920/Flask-React/tree/main/01_Model_Preparation)
    * Pick a SKLearn model that fits your dataset
    * Preprocess your dataset and do test trainings / hyperparameter tuning
    * Fit the model to your dataset
    * Pickle the trained model for deployment
2. [Preparing the Model API](https://github.com/Muxamil1920/Flask-React/tree/main/02_Prediction_API)
    * Use Flask to prepare a REST API endpoint for your model
    * Test predictions using HTTP POST requests
3. [Containerizing the Application](https://github.com/Muxamil1920/Flask-React/tree/main/03_Containerized_Application)
    * Wrap the Flask application in a Docker image
4. [React.js Frontend](https://github.com/Muxamil1920/Flask-React/tree/main/04_react_frontend)
    * Write a React.js frontend that can interface with your REST API
4. [Serve Frontend using the Flask App](https://github.com/Muxamil1920/Flask-React/tree/main/05_Add_Frontend_to_Container)
    * Use Vite.js to render the React frontend to static HTML
    * Add a static route to your Flask app to serve the frontend from inside the Docker image


![Serving your SciKit Learn Model as a Prediction API](https://github.com/Muxamil1920/Flask-React/blob/main/04_react_frontend/SciKit_Learn_Model_API.gif)
