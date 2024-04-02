from flask import Flask, jsonify, render_template
from flask_cors import CORS
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import numpy as np
import pandas as pd
import traceback
import warnings
warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)

try:
    df = pd.read_csv('../data.csv')  # Adjust path if needed
    average_prices_df = df.groupby(['month', 'town'])['resale_price'].median().reset_index()
    average_prices_df.columns = ['month', 'town', 'average_price']

    average_prices_df['year'] = pd.to_datetime(df['month']).dt.year
    average_prices_df.drop('month', axis=1, inplace=True)
    label_encoder = LabelEncoder()
    average_prices_df['town_encoded'] = label_encoder.fit_transform(average_prices_df['town'])
    average_prices_df.drop('town', axis=1, inplace=True)

    # Prepare data for initial regression (2017-2024)
    initial_data = average_prices_df[average_prices_df['year'] <= 2024]
    X_initial = initial_data[['year', 'town_encoded']]
    y_initial = initial_data['average_price']

    # Train initial model
    model = RandomForestRegressor(n_estimators=50, random_state=42)
    model.fit(X_initial, y_initial)
except Exception as e:
    print("Error occurred during model training:", e)
    traceback.print_exc()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predicted_values', methods=['GET'])
def get_predicted_values():
    try:
        if 'model' not in globals():
            return jsonify({'error': 'Model not trained'}), 500

        predicted_values = []
        # Predict values iteratively for years 2025 to 2030 for each town
        town_unique_encoded = np.unique(average_prices_df['town_encoded'])
        for town_enc in town_unique_encoded:
            town_data = {}
            town_data['town'] = label_encoder.inverse_transform([town_enc])[0]

            data = []
            for year in range(2025, 2031):
                prediction = {}
                # Predict value for the current year and town
                X_year = np.array([[year, town_enc]])
                y_year_pred = model.predict(X_year)

                # Add the predicted value to the dictionary
                prediction['year'] = year
                prediction['medianPrice'] = int(y_year_pred[0])
                data.append(prediction)

                # Retrain model with the predicted value included
                updated_data = average_prices_df.copy()
                updated_data = updated_data.append({'year': year, 'town_encoded': town_enc, 'average_price': y_year_pred[0]}, ignore_index=True)
                X_updated = updated_data[['year', 'town_encoded']]
                y_updated = updated_data['average_price']
                model.fit(X_updated, y_updated)
            
            town_data['data'] = data
            predicted_values.append(town_data)

        return jsonify(predicted_values)
    except Exception as e:
        print("Error occurred during prediction:", e)
        traceback.print_exc()
        return jsonify({'error': 'Prediction failed'}), 500


if __name__ == '__main__':
    app.run(debug=True)
