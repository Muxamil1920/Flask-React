# Serving your SciKit Learn Model as a Prediction API

<!-- TOC -->

- [Serving your SciKit Learn Model as a Prediction API](#serving-your-scikit-learn-model-as-a-prediction-api)
  - [Preparing the ML Model](#preparing-the-ml-model)
    - [Data Preprocessing](#data-preprocessing)
    - [Model Training](#model-training)
      - [Model Validation](#model-validation)
      - [Model Testing](#model-testing)
    - [Model Saving](#model-saving)
    - [Model Loading](#model-loading)

<!-- /TOC -->

## Preparing the ML Model

[Advertisement Dataset](https://www.kaggle.com/datasets/ashydv/advertising-dataset): Use the advertising dataset given in ISLR and analyse the relationship between advertisement channels and sales.

```python
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.model_selection import train_test_split
```

```python
SEED = 42
```

### Data Preprocessing

```python
adv_df = pd.read_csv('dataset/advertising.csv')
adv_df.head(5)
```

|  | TV | Radio | Newspaper | Sales |
| -- | -- | -- | -- | -- |
| 0 | 230.1 | 37.8 | 69.2 | 22.1 |
| 1 | 44.5 | 39.3 | 45.1 | 10.4 |
| 2 | 17.2 | 45.9 | 69.3 | 9.3 |
| 3 | 151.5 | 41.3 | 58.5 | 18.5 |
| 4 | 180.8 | 10.8 | 58.4 | 12.9 |

```python
adv_df.describe()
```

|  | TV | Radio | Newspaper | Sales |
| -- | -- | -- | -- | -- |
| count | 200.000000 | 200.000000 | 200.000000 | 200.000000 |
| mean | 147.042500 | 23.264000 | 30.554000 | 14.022500 |
| std | 85.854236 | 14.846809 | 21.778621 | 5.217457 |
| min | 0.700000 | 0.000000 | 0.300000 | 1.600000 |
| 25% | 74.375000 | 9.975000 | 12.750000 | 10.375000 |
| 50% | 149.750000 | 22.900000 | 25.750000 | 12.900000 |
| 75% | 218.825000 | 36.525000 | 45.100000 | 17.400000 |
| max | 296.400000 | 49.600000 | 114.000000 | 27.000000 |

```python
# features / labels split
X = adv_df.drop('Sales', axis=1)
y = adv_df['Sales']
```

```python
# train, validation and test split
X_train, X_temp, y_train, y_temp = train_test_split(
    X, y, test_size=0.3, random_state=SEED
)

X_val, X_test, y_val, y_test = train_test_split(
    X_temp, y_temp, test_size=0.5, random_state=SEED
)

print(len(X), len(X_train), len(X_val), len(X_test))
# 200 140 30 30
```

### Model Training

```python
model = RandomForestRegressor(
    n_estimators=3,
    random_state=SEED
)
```

```python
model.fit(X_train, y_train)
```

#### Model Validation

```python
# validate model performance and tune hyper parameter
val_preds = model.predict(X_val)
```

```python
print(mean_absolute_error(y_val, val_preds))
print(mean_squared_error(y_val, val_preds)**0.5)
# 0.7566666666666663 MAE should be small compared to MEAN 14.022500
# 0.9330753611738063 RMSE should be small compared to STD 5.217457
adv_df.describe()['Sales']
```

| | |
| -- | -- |
| count    | 200.000000 |
| mean      | 14.022500 |
| std        | 5.217457 |
| min        | 1.600000 |
| 25%       | 10.375000 |
| 50%       | 12.900000 |
| 75%       | 17.400000 |
| max       | 27.000000 |
_Name: Sales, dtype: float64_

```python
# try to improve the model by adding estimators
model2 = RandomForestRegressor(
    n_estimators=30,
    random_state=SEED
)
model2.fit(X_train, y_train)
val_preds2 = model2.predict(X_val)

print(mean_absolute_error(y_val, val_preds2))
print(mean_squared_error(y_val, val_preds2)**0.5)
# 0.483111111111111 MAE should be small compared to MEAN 14.022500
# 0.6177971619660723 RMSE should be small compared to STD 5.217457
```

#### Model Testing

```python
# retest the optimized model on unseen data
test_preds = model2.predict(X_test)
```

```python
print(mean_absolute_error(y_test, test_preds))
print(mean_squared_error(y_test, test_preds)**0.5)
# 0.5649999999999998 MAE should be small compared to MEAN 14.022500
# 0.6758333675845999 RMSE should be small compared to STD 5.217457
```

### Model Saving

```python
production_model = RandomForestRegressor(
    n_estimators=30,
    random_state= SEED
)

# fit production model to entire dataset
production_model.fit(X, y)
```

```python
# save model for deployment
joblib.dump(production_model, 'models/production_model.pkl')
```

```python
list(X.columns)
# ['TV', 'Radio', 'Newspaper']
```

```python
joblib.dump(list(X.columns), 'models/production_model_column_names.pkl')
```

### Model Loading

```python
column_names = joblib.load('models/production_model_column_names.pkl')
column_names
# ['TV', 'Radio', 'Newspaper']
```

```python
loaded_model = joblib.load('models/production_model.pkl')
print(loaded_model.predict([X.iloc[42]]))
print(loaded_model.predict([[180.8, 10.8, 58.4]]))
# [20.68666667] TRUE 20.7
#[13.28] TRUE 12.9
```
