
pipeline {
    agent any

    environment {
        SNYK_TOKEN = credentials('SNYK_TOKEN')  // Assuming 'SNYK_TOKEN' is the ID of the stored Snyk token credential in Jenkins
    }
    
    stages {
        stage('Build') {
            steps {
                script {
                    try {
                        sh 'npm i'
                        sh 'echo hello'
                    } catch (Exception e) {
                        echo 'Error in build stage'
                        error 'Build failed'
                    }
                }
            }
        }

        stage('SECURITY CHECKS') {
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }

            parallel {
                stage('SCA Scan') {
                    steps {
                        script {
                            try {
                                echo 'Running Snyk scan'
                                sh('snyk auth $SNYK_TOKEN') 
                                sh 'snyk test "$(pwd)"  || { echo "Snyk found vulnerabilities"; exit 1; }'
                                // Authenticate Snyk CLI using the token
                            } catch (Exception e) {
                                echo "Error during Snyk scan: ${e}"
                                error 'Snyk scan failed'
                            }
                        }
                    }
                }

                stage('SAST SCANNER : NODEJSSCANNER'){

                    steps {

                        script{

                            try{
                                sh 'echo scanning using njsscan'
                                 sh 'njsscan path "$(pwd)" || { echo "Snyk found vulnerabilities"; exit 1; }'


                                
                            }

                            catch (Exception e ){
                                error 'NODEJSSCANNER scan failed'
                                
                            }
                            
                            
                        }

                        
                        
                    }


                    
                }

                

                // Add other security checks here as needed
                // stage('Another Security Check') {
                //     steps {
                //         echo 'Running another security check...'
                //     }
                // }
            }
        }

        stage('Staging-Deploy') {
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                echo 'Deploying application to staging'
                 sh 'nohup node index.js &'
                    
                    // Give the server some time to start
                    sleep 5
                    
                    // Perform any checks to ensure the server is running
                    sh 'curl http://localhost:8000'
                
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed'
        }
        success {
            echo 'Pipeline succeeded'
        }
    }
}
