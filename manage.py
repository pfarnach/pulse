from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand

from application.app import app, db, socketio

migrate = Migrate(app, db)
manager = Manager(app)

# migrations
manager.add_command('db', MigrateCommand)


@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()


if __name__ == '__main__':
    socketio.run(app)
