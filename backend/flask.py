from flask import Flask, render_template, request

app = Flask(__name__)

# Define routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

# Example of handling form submission
@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        data = request.form['data']
        # Process the data here
        return 'Data received: ' + data

if __name__ == '__main__':
    app.run(debug=True)
