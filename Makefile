install: install-deps
	npx simple-git-hooks

test:
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .