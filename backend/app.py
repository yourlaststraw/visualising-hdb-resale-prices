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
    fileData = 0
    with open('../data_sample.json', 'r') as f:
      fileData = json.load(f)
      f.close()
    return render_template('map.html', fileData = fileData)

# Example of handling form submission
@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        data = request.form['data']
        # Process the data here
        return 'Data received: ' + data

if __name__ == '__main__':
    app.run(debug=True)
