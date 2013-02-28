test:
	./node_modules/.bin/vows \
		test/*.js \
		test/parse/*.js \
		--spec

docs:
	@./bin/simple \
		--out docs \
		lib/**/*.js

lint:
	./node_modules/.bin/jshint \
		./lib/**/*.js \
		./test/**/*.js

.PHONY: test docs lint