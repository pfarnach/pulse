from flask import render_template, request, jsonify
from flask.ext.socketio import SocketIO, emit
from sqlalchemy import text
from index import app, db


socketio = SocketIO(app)

# set postgres like this: export DATABASE_URL='postgresql://pat:[password]@localhost/ip_coordinates'

# @socketio.on('connect')
# def test_connect():
#   print "connect: "
#   emit('my response', {'data': 'Connected'})

@socketio.on('client_pulse')
def client_pulse(msg):
  sql = text('SELECT latitude, longitude FROM t_ip_coordinates OFFSET floor(random()*3870014) LIMIT 1;');
  result = db.engine.execute(sql)

  coord = {}

  for r in result:
    coord['latitude'] = float(r['latitude'])
    coord['longitude'] = float(r['longitude'])
    coord['id'] = str(coord['latitude']) + str(coord['longitude'])

  emit('new_pulse', coord, broadcast=True)

@app.route('/', methods=['GET'])
def index():
  return render_template('index.html')
