from flask import Flask, render_template, request
import json
import pandas as pd
from datetime import datetime, date
import os


app = Flask(__name__)

# Define routes


@app.route('/price')
def price():
    df = pd.read_csv('./data/ResaleflatpricesbasedonregistrationdatefromJan2017onwards.csv')
    data_json = df.to_json(orient='records')
    df1 = pd.read_csv('./data/remaining_lease.csv')
    data_json1 = df1.to_json(orient='records')
    return render_template('index.html', data_json=data_json, data_json1 =  data_json1)

@app.route('/prediction')
def prediction():
    df2 = pd.read_csv('./data/data.csv')
    data_json2 = df2.to_json(orient='records')
    return render_template('trend.html',data_json2 =  data_json2 )

@app.route('/', methods = ['GET'])
def map():
    with open('./data/output_file.json', 'r') as f:
      fileData = json.load(f)
      f.close()
    min_price = float(request.args.get('min_price', default = 160000.0))
    max_price = float(request.args.get('max_price', default = 1185000.0))
    selected_year = request.args.get('years', default='2017')
    town = request.args.get('town', default=None)
    storey_range = request.args.get('storeyRange', default=None)
    flat_model = request.args.get('flatModel', default=None)
    filtered_data = []
    for item in fileData:
        item_year = item['month'].split("-")[0]         
        if ((not selected_year or item_year == selected_year) and
            (not town or item['town'] == town) and
            (not storey_range or item['storey_range'] == storey_range) and
            (not flat_model or item['flat_model'] == flat_model) and
            min_price <= float(item['resale_price']) <= max_price):
            filtered_data.append(item)
    towns = ['', 'ANG MO KIO', 'BEDOK', 'BISHAN', 'BUKIT BATOK', 'BUKIT MERAH',
       'BUKIT PANJANG', 'BUKIT TIMAH', 'CENTRAL AREA', 'CHOA CHU KANG',
       'CLEMENTI', 'GEYLANG', 'HOUGANG', 'JURONG EAST', 'JURONG WEST',
       'KALLANG/WHAMPOA', 'MARINE PARADE', 'PASIR RIS', 'PUNGGOL',
       'QUEENSTOWN', 'SEMBAWANG', 'SENGKANG', 'SERANGOON', 'TAMPINES',
       'TOA PAYOH', 'WOODLANDS', 'YISHUN']
    
    storey_ranges =['','10 TO 12', '01 TO 03', '04 TO 06', '07 TO 09', '13 TO 15',
       '19 TO 21', '22 TO 24', '16 TO 18', '34 TO 36', '28 TO 30',
       '37 TO 39', '49 TO 51', '25 TO 27', '40 TO 42', '31 TO 33']
    
    flat_models = ['','Improved', 'New Generation', 'DBSS', 'Standard', 'Apartment',
       'Simplified', 'Model A', 'Premium Apartment', 'Adjoined flat',
       'Model A-Maisonette', 'Maisonette', 'Type S1', 'Type S2',
       'Model A2']
    years = [ 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
    return render_template('map.html', fileData=filtered_data, towns=towns, storey_ranges=storey_ranges, flat_models=flat_models, 
                           town = town, storey_range =storey_range, flat_model=flat_model, years = years, min_price =min_price,
                           max_price =max_price, selected_year=selected_year)


@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        data = request.form['data']
        # Process the data here
        return 'Data received: ' + data

if __name__ == '__main__':
    app.run(debug=True)
