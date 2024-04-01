from flask import Flask, render_template, request
import json

app = Flask(__name__, template_folder='../frontend/templates')

# Define routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/map')
def map():
    with open('../data/data_sample.json', 'r') as f:
      fileData = json.load(f)
      f.close()
    town = request.args.get('town', default=None)
    
    storey_range = request.args.get('storeyRange', default=None)
    flat_model = request.args.get('flatModel', default=None)
    filtered_data = [item for item in fileData if
                     (not town or item['town'] == town) and
                     (not storey_range or item['storey_range'] == storey_range) and
                     (not flat_model or item['flat_model'] == flat_model)]
    towns = [
        'ANG MO KIO', 'BEDOK', 'BISHAN', 'BUKIT BATOK', 'BUKIT MERAH', 'BUKIT PANJANG',
        'BUKIT TIMAH', 'CENTRAL AREA', 'CHOA CHU KANG', 'CLEMENTI', 'GEYLANG',
        'HOUGANG', 'JURONG EAST', 'JURONG WEST', 'KALLANG/WHAMPOA', 'MARINE PARADE',
        'PASIR RIS', 'PUNGGOL', 'QUEENSTOWN', 'SEMBAWANG', 'SENGKANG', 'SERANGOON',
        'TAMPINES', 'TOA PAYOH', 'WOODLANDS', 'YISHUN', 'CLEME'
    ]
    
    storey_ranges = [
        '01 TO 03', '04 TO 06', '07 TO 09', '10 TO 12', '13 TO 15', '16 TO 18',
        '19 TO 21', '22 TO 24', '25 TO 27', '28 TO 30', '31 TO 33', '34 TO 36',
        '37 TO 39', '40 TO 42', '43 TO 45', '46 TO 48', '49 TO 51'
    ]
    
    flat_models = [
        '2-room', '3Gen', 'Adjoined flat', 'Apartment', 'DBSS', 'Improved',
        'Improved-Maisonette', 'Maisonette', 'Model A', 'Model A-Maisonette', 'Model A2',
        'Multi Generation', 'New Generation', 'Premium Apartment', 'Premium Apartment Loft',
        'Premium Maisonette', 'Simplified', 'Standard', 'Terrace', 'Type S1', 'Type S2'
    ]
    return render_template('map.html', fileData=filtered_data, towns=towns, storey_ranges=storey_ranges, flat_models=flat_models, 
                           town = town, storey_range =storey_range, flat_model=flat_model )
# Example of handling form submission
@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        data = request.form['data']
        # Process the data here
        return 'Data received: ' + data

if __name__ == '__main__':
    app.run(debug=True)
