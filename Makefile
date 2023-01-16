install: 
	npm ci

test:
	npx jest

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage --coverageProvider=v8