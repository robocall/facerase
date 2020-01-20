from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/fml')
def index():
    title = 'Create the input'
    return render_template('index.html',
                           title=title)

if __name__ == '__main__':
	app.run()
    #app.run(ssl_context='adhoc')


"""
dependencies:
pip3 install pyopenssl
pip3 install flask

disable secure certificates in chrome:
https://www.technipages.com/chrome-enabledisable-not-secure-warning


run:


resources:
why do we neet this ssl stuff: https://blog.miguelgrinberg.com/post/running-your-flask-application-over-https

"""