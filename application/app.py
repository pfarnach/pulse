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

	if request.headers.getlist("X-Forwarded-For"):
		ip_address = request.headers.getlist("X-Forwarded-For")[0]
	else:
		ip_address = request.remote_addr

	if IP(ip_address).iptype() == 'PUBLIC':
		while ip_address:
			queryString = "SELECT latitude, longitude FROM t_ip_coordinates WHERE ip_address LIKE '{}%' LIMIT 1".format(ip_address)
			print "queryString: " + queryString
			query = text(queryString);
			result = db.engine.execute(query).first()

			if result == None:
				ip_address = ip_address[:-1]
			else:
				break
	else:
		queryString = "SELECT latitude, longitude FROM t_ip_coordinates OFFSET floor(random()*3870014) LIMIT 1;"
		sql = text(queryString);
		result = db.engine.execute(sql).first()
	
	if not result:
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
