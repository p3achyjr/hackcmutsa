from flask import Flask, render_template, request
import json
import speedtest_cli
import subprocess

app = Flask(__name__)

def get_wifi_speed():
  return subprocess.check_output("speedtest-cli")

@app.route('/index/')
def hello_world():
  out = get_wifi_speed()
  return render_template('index.html', text = out)

if __name__ == '__main__':
  app.debug = True
  app.run()