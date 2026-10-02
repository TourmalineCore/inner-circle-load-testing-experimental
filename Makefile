help:
	@echo "Available API load tests:"
	@echo "  make run-compensations-api - run compensations-api load test"
	@echo "  make run-employees-api - run employees-api load test"
	@echo "  make run-books-api - run books-api load test"
	@echo "  make run-time-api - run time-api load test"
	@echo "  make run-invoices-api - run invoices-api load test"
	@echo "  make run-auth-api - run auth-api load test"
	@echo "  make run-accounts-api - run accounts-api load test"
	@echo "  make run-items-api - run items-api load test"

run-compensations-api:
	BEARER_TOKEN=$$(curl -s 'http://localhost:30090/api/auth/login' \
		--data-raw '{"login":"ceo@tourmalinecore.com","password":"cEoPa$$$$wo1d"}' \
		| jq -r .accessToken.value) && \
	BEARER_TOKEN="$$BEARER_TOKEN" \
	k6 run scripts/compensations-api.js

run-employees-api:
	BEARER_TOKEN=$$(curl -s 'http://localhost:30090/api/auth/login' \
		--data-raw '{"login":"ceo@tourmalinecore.com","password":"cEoPa$$$$wo1d"}' \
		| jq -r .accessToken.value) && \
	BEARER_TOKEN="$$BEARER_TOKEN" \
	k6 run scripts/employees-api.js

run-books-api:
	BEARER_TOKEN=$$(curl -s 'http://localhost:30090/api/auth/login' \
		--data-raw '{"login":"ceo@tourmalinecore.com","password":"cEoPa$$$$wo1d"}' \
		| jq -r .accessToken.value) && \
	BEARER_TOKEN="$$BEARER_TOKEN" \
	k6 run scripts/books-api.js

run-time-api:
	BEARER_TOKEN=$$(curl -s 'http://localhost:30090/api/auth/login' \
		--data-raw '{"login":"ceo@tourmalinecore.com","password":"cEoPa$$$$wo1d"}' \
		| jq -r .accessToken.value) && \
	BEARER_TOKEN="$$BEARER_TOKEN" \
	k6 run scripts/time-api.js

run-invoices-api:
	BEARER_TOKEN=$$(curl -s 'http://localhost:30090/api/auth/login' \
		--data-raw '{"login":"ceo@tourmalinecore.com","password":"cEoPa$$$$wo1d"}' \
		| jq -r .accessToken.value) && \
	BEARER_TOKEN="$$BEARER_TOKEN" \
	k6 run scripts/invoices-api.js

run-auth-api:
	k6 run scripts/auth-api.js

run-accounts-api:
	BEARER_TOKEN=$$(curl -s 'http://localhost:30090/api/auth/login' \
		--data-raw '{"login":"ceo@tourmalinecore.com","password":"cEoPa$$$$wo1d"}' \
		| jq -r .accessToken.value) && \
	BEARER_TOKEN="$$BEARER_TOKEN" \
	k6 run scripts/accounts-api.js

run-items-api:
	BEARER_TOKEN=$$(curl -s 'http://localhost:30090/api/auth/login' \
		--data-raw '{"login":"ceo@tourmalinecore.com","password":"cEoPa$$$$wo1d"}' \
		| jq -r .accessToken.value) && \
	BEARER_TOKEN="$$BEARER_TOKEN" \
	k6 run scripts/items-api.js
