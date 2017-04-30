from flask import Flask, render_template, jsonify
from random import randint
app = Flask(__name__)

@app.route('/')
def main():
	try:
		return render_template("main.html")
	except Exception, e:
		return(str(e))

@app.route('/getTempTest')
def getTempTest():
    try:
        temp = randint(1, 100)
        return jsonify(temp)
    except Exception, e:
        return(str(e))

@app.route('/getHumTest')
def getHumTest():
    try:
        hum = randint(1, 100)
        return jsonify(hum)
    except Exception, e:
        return(str(e))

@app.route('/getTemp')
def getTemp():
	try:
		pass
	except Exception, e:
		return(str(e))

@app.route('/getHum')
def getHum():
	try:
		pass
	except Exception, e:
		return(str(e))

if __name__ == "__main__":
    app.run()
