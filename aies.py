from flask import Flask, render_template, jsonify
from random import randint
from serial import Serial
from subprocess import check_output
from re import findall
from sys import argv
app = Flask(__name__)

weatherState = {0: "Rain", 1: "High humidity / Light rain", 2: "Drought"}
prod = "prod" if argv[1] == "prod" else "test"

@app.route('/')
def main():
	try:
		return render_template("main.html", prod=prod)
	except Exception, e:
		return(str(e))

@app.route('/getTempTest')
def getTempTest():
    try:
        temp = randint(1, 100)
        return jsonify(data=temp)
    except Exception, e:
        return(str(e))

@app.route('/getHumTest')
def getHumTest():
    try:
        hum = randint(1, 100)
        return jsonify(data=hum)
    except Exception, e:
        return(str(e))

@app.route('/getRainTest')
def getRainTest():
	try:
		rain = randint(0, 2)
		return jsonify(data=weatherState[rain])
	except Exception, e:
		return(str(e))

@app.route('/getTemp')
def getTemp():
	try:
		command='get_temp'
		s.write(command.encode())
		temp = s.readline().decode('ascii').strip()
		return jsonify(data=float(temp))
	except Exception, e:
		return(str(e))

@app.route('/getHum')
def getHum():
	try:
		command='get_hum'
		s.write(command.encode())
		hum = s.readline().decode('ascii').strip()
		return jsonify(data=float(hum))
	except Exception, e:
		return(str(e))

@app.route('/getRain')
def getRain():
	try:
		command='get_rain'
		s.write(command.encode())
		rain = s.readline().decode('ascii').strip()
		return jsonify(data=weatherState[int(rain)])
	except Exception, e:
		return(str(e))

if __name__ == "__main__":
	if prod == "prod":
	    device = findall('ttyUSB[0-9]*', check_output(["ls","/dev"]))[0]
	    s = Serial('/dev/' + device, 9600)
	app.run()
