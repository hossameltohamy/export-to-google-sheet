pipeline {
    agent any
    stages {
        stage('clean previous docker containers') {
            steps {
                sh 'sudo docker-compose down -v'
              }
        }
        stage('Build') {
            steps {
                sh 'sudo docker-compose up -d --build'

            }
        }
        stage('Tests') {
            steps {
                sh 'docker-compose -f docker-compose.yml run --rm nsp_backend npx sequelize-cli db:migrate'
                sh 'docker-compose -f docker-compose.yml run --rm nsp_backend npm test'

            }
        }
        stage('clean docker containers') {
            steps {
                sh 'docker-compose down -v'
              }
        }
        // stage('Reports') {
        //     steps {
        //         junit 'tests/_output/report.xml'
        //     }
        // }
    }
}
    // post {
    //     always {
    //         emailext (
    //             subject: "${env.JOB_NAME} CI",
    //             body: '''${SCRIPT, template="groovy-html.template"}''',
    //             recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    //         )
    //     }
    // }

