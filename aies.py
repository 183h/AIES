from flask import Flask, render_template
app = Flask(__name__)

@app.route('/main')
def main():
	try:
		return render_template("main.html")
	except Exception, e:
		return(str(e))

if __name__ == "__main__":
    app.run()
