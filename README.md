# Install
    $ go install ./...
# Usage
    $ parsley [-env production] server
# Migrating
	$ go get bitbucket.org/liamstask/goose/cmd/goose
	$ goose up
	$ goose [-env production] up
## Note:
For development: You must have a local instance of postgres running.

For production: You will need to set $DATABASE_URL to that of the production db.