.AWS_ROLE_NAME ?= oslokommune/iamadmin-SAML

.REGION := eu-west-1
.DEV_ACCOUNT := 988529151833
.PROD_ACCOUNT := 944886649943

.DEV_ROLE := 'arn:aws:iam::$(.DEV_ACCOUNT):role/$(.AWS_ROLE_NAME)'
.PROD_ROLE := 'arn:aws:iam::$(.PROD_ACCOUNT):role/$(.AWS_ROLE_NAME)'

.DEV_PROFILE := saml-origo-dev
.PROD_PROFILE := saml-dataplatform-prod

.IMAGE_NAME := ok-origo-dataplatform/dataplatform-frontend

.PHONY: init
init: node_modules

node_modules: package.json package-lock.json
	npm install

.PHONY: tag
tag:
	@TAG=$$(git tag --points-at HEAD | head -n 1); \
	if [ -z "$$TAG" ]; then \
		echo -n "Version: "; \
		read VERSION; \
		git tag -f $$VERSION; \
	else \
		echo "Version exists: $$TAG"; \
		echo "'git tag -d $$TAG' deletes it"; \
	fi

.PHONY: build
build:
	docker build --build-arg VUE_APP_STAGE=development -t $(.IMAGE_NAME)-dev .

.PHONY: build-prod
build-prod:
	docker build --build-arg VUE_APP_STAGE=production -t $(.IMAGE_NAME)-prod .

.PHONY: login-dev
login-dev:
	saml2aws login --role=$(.DEV_ROLE) --profile=$(.DEV_PROFILE)

.PHONY: login-prod
login-prod:
	saml2aws login --role=$(.PROD_ROLE) --profile=$(.PROD_PROFILE)

.PHONY: deploy
deploy: login-dev tag build
	@echo "\nDeploying to stage: dev\n";
	aws ecr get-login-password --region $(.REGION) | docker login --username AWS --password-stdin $(.DEV_ACCOUNT).dkr.ecr.$(.REGION).amazonaws.com/$(.IMAGE_NAME);
	docker tag $(.IMAGE_NAME)-dev:latest $(.DEV_ACCOUNT).dkr.ecr.$(.REGION).amazonaws.com/$(.IMAGE_NAME):$$(git tag --points-at HEAD | head -n 1);
	docker push $(.DEV_ACCOUNT).dkr.ecr.$(.REGION).amazonaws.com/$(.IMAGE_NAME):$$(git tag --points-at HEAD | head -n 1);
	git push origin $$(git tag --points-at HEAD | head -n 1);

.PHONY: deploy-prod
deploy-prod: login-prod build-prod
	@echo "\nDeploying to stage: prod\n";
	aws ecr get-login-password --region $(.REGION) --profile saml-dataplatform-prod | docker login --username AWS --password-stdin $(.PROD_ACCOUNT).dkr.ecr.$(.REGION).amazonaws.com/$(.IMAGE_NAME);
	docker tag $(.IMAGE_NAME)-prod:latest $(.PROD_ACCOUNT).dkr.ecr.$(.REGION).amazonaws.com/$(.IMAGE_NAME):$$(git tag --points-at HEAD | head -n 1);
	docker push $(.PROD_ACCOUNT).dkr.ecr.$(.REGION).amazonaws.com/$(.IMAGE_NAME):$$(git tag --points-at HEAD | head -n 1);
	git push origin $$(git tag --points-at HEAD | head -n 1);

.PHONY: is-git-clean
is-git-clean:
	@status=$$(git fetch origin && git status -s -b) ;\
	if test "$${status}" != "## master...origin/master"; then \
		echo; \
		echo Git working directory is dirty, aborting >&2; \
		false; \
	fi
