pipeline {
    agent any

    tools {
        nodejs 'node'
        snyk "snyk" // Specify the Snyk tool
    }

    environment {
        SNYK_TOKEN = credentials('SNYK_TOKEN')
    }

    stages {
        stage('BUILD') {
            steps {
                echo 'Starting to build the Node.js application'
                sh 'npm install'
            }
        }

        stage('SECURITY TEST') {
            parallel {
                stage('SCA SCAN') {
                    steps {
                        echo 'Running Snyk security test'
                        script {
                            sh 'snyk auth "${SNYK_TOKEN}"'
                            sh 'snyk test "$(pwd)" --json-file-output=synkscan.json'
                        }
                    }
                }

                stage('SAST SCAN') {
                    steps {
                        echo 'Starting SAST scan'
                        script {
                            sh 'njsscan  "$(pwd)" --json | tee njscan.json '
                        }
                    }
                }
            }
        }

        stage('PRE-PROD') {
            steps {
                echo 'Preparing for deployment to pre-production'
                // Add your pre-prod deployment steps here
                sh 'node index.js'
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed!'
        }
    }
}
