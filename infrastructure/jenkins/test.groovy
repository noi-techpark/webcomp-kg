pipeline {
	agent any
	environment {
		DOCKER_IMAGE = "755952719952.dkr.ecr.eu-west-1.amazonaws.com/webcompbuild:latest"
		HEREMAP_API_KEY = credentials("here-api-key")
	}
	options {
		ansiColor('xterm')
	}
	stages {
		stage('AWS ECR login') {
			steps {
				sh '''
					aws ecr get-login --region eu-west-1 --no-include-email | bash
				'''
			}
		}
		stage('Agent: Docker webcompbuild') {
			agent {
				docker {
					alwaysPull true
					image "${DOCKER_IMAGE}"
				}
			}
			stages {
				stage('Prepare') {
					steps {
						sh '''
							cp /webcompbuild/.env .env
							rm -rf $(jq -r ".dist.basePath" wcs-manifest.json)
							echo "HEREMAP_API_KEY=$HEREMAP_API_KEY" >> .env
						'''
					}
				}
				stage("Dependencies") {
					steps {
						sh '''
							yarn
						'''
					}
				}
				stage("Build") {
					steps {
						sh '''
							yarn build
						'''
					}
				}
				stage("Update manifest") {
					steps {
						sh "/webcompbuild/wcstorecli.sh -u"
					}
				}
				stage('Deploy') {
					steps {
						sshagent (credentials: ['tomcatkey', 'jenkins_github_ssh_key']) {
							sh '''
								cp /webcompbuild/.env .env
								WHEN=$(date "+%Y%m%dT%H%M")
								WC_NAME=${GIT_URL##*/}
								WC_NAME=${WC_NAME%.git}
								/webcompbuild/wcstorecli.sh -d "${WC_NAME}" "${BRANCH_NAME}-${BUILD_NUMBER}-${WHEN}"
							'''
						}
					}
				}
			}
		}
	}
}
