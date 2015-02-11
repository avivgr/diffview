from flask import Flask
from flask import request,render_template
import json

app = Flask(__name__)
app.config['DEBUG'] = True

# Note: We don't need to call run() since our application is embedded within
# the App Engine WSGI application server.

@app.route('/hello')
def hello():
    """Return a friendly HTTP greeting."""
    return 'Hello World!'

@app.route('/')
def index():
	return render_template('index.html', fileId = '0ByeqPocLstLbYnlTNjQzdHZ1d0U')

@app.route('/open/', methods=['POST', 'GET'])
def open():
    state_data = json.loads(request.args.get('state', '{}'))
    action = state_data['action']
    ids = map(str, state_data.get('ids', []))
    return render_template('index.html', fileId = ids[0])

@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, nothing at this URL.', 404
