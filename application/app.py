from flask import render_template, request, jsonify
from flask.ext.socketio import SocketIO, emit
from sqlalchemy import text
from IPy import IP
from index import app, db


socketio = SocketIO(app)

# set postgres like this: export DATABASE_URL='postgresql://pat:[password]@localhost/ip_coordinates'

@socketio.on('client_pulse')
def client_pulse(msg):
	'''Called when server receives pulse msg from client'''

	ip_address = request.environ['REMOTE_ADDR']

	print "ip_address: " + str(ip_address)
	print "IP(ip_address).iptype(): " + str(IP(ip_address).iptype())

	if IP(ip_address).iptype() == 'PUBLIC':
		while ip_address:
			query = text("SELECT latitude, longitude FROM t_ip_coordinates WHERE ip_address LIKE '{}%' LIMIT 1".format(ip_address));
			result = db.engine.execute(query).first()

			print "result: " + str(result)

			if result == None:
				ip_address = ip_address[:-1]
			else:
				break
	else:
		sql = text('SELECT latitude, longitude FROM t_ip_coordinates OFFSET floor(random()*3870014) LIMIT 1;');
		result = db.engine.execute(sql).first()

	# If found result, send coordinates over to client
	if result:
		coord = {}
		coord['latitude'] = float(result['latitude'])
		coord['longitude'] = float(result['longitude'])
		coord['id'] = str(coord['latitude']) + str(coord['longitude'])

		emit('new_pulse', coord, broadcast=True)
	else:
		emit('lookup_error', {"message": "Could not find location by IP address"})

@app.route('/', methods=['GET'])
def index():
  return render_template('index.html')
