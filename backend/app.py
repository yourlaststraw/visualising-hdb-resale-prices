from flask import Flask, render_template, request
import json
import pandas as pd
from datetime import datetime, date


app = Flask(__name__, template_folder='../templates')

# Define routes

@app.route('/price')
def price():
    df = pd.read_csv('/Users/sujitharajan/visualising-hdb-resale-prices/data/ResaleflatpricesbasedonregistrationdatefromJan2017onwards.csv')
    data_json = df.to_json(orient='records')
    df1 = pd.read_csv('/Users/sujitharajan/visualising-hdb-resale-prices/data/remaining_lease.csv')
    data_json1 = df1.to_json(orient='records')
    return render_template('index.html', data_json=data_json, data_json1 =  data_json1)

@app.route('/prediction')
def prediction():
    df2 = pd.read_csv('/Users/sujitharajan/visualising-hdb-resale-prices/data/data.csv')
    data_json2 = df2.to_json(orient='records')
    return render_template('trend.html',data_json2 =  data_json2 )

@app.route('/', methods=["POST"])
def map():
    with open('/Users/sujitharajan/visualising-hdb-resale-prices/data/output_file.json', 'r') as f:
      fileData = json.load(f)
      f.close()
    min_price = float(request.form.get('min_price')) # Default to 0.0 if not provided
    max_price = float(request.form.get('max_price'))
    years = request.args.get('years', default=None)
    town = request.args.get('town', default=None)
    storey_range = request.args.get('storeyRange', default=None)
    flat_model = request.args.get('flatModel', default=None)
    filtered_data = [item for item in fileData if
                     (not town or item['town'] == town) and
                     (not storey_range or item['storey_range'] == storey_range) and
                     (not flat_model or item['flat_model'] == flat_model) and 
                     (min_price <= float(item['resale_price']) <= max_price)]
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
    year = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
    return render_template('map.html', fileData=filtered_data, towns=towns, storey_ranges=storey_ranges, flat_models=flat_models, 
                           town = town, storey_range =storey_range, flat_model=flat_model, year = year )


@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        data = request.form['data']
        # Process the data here
        return 'Data received: ' + data

if __name__ == '__main__':
    app.run(debug=True)
