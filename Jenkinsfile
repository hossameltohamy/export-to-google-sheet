pipeline {
    agent any
     def to = emailextrecipients([
          [$class: 'CulpritsRecipientProvider'],
          [$class: 'DevelopersRecipientProvider'],
          [$class: 'RequesterRecipientProvider']
  ])

    stages {
        
       stage('Source') {
            steps {
                git 'https://github.com/hossameltohamy/export-to-google-sheet.git'
                 }
        }
        stage('clean previous docker containers') {
            steps {
                sh ' ls -ahl'
                sh ' docker-compose -v'
                sh ' docker-compose  --verbose  down'
              }
        }
        stage('Build') {
            steps {
                sh ' docker-compose up -d --build'

            }
        }
        stage('Tests') {
            steps {
                sh 'docker-compose -f docker-compose.yml run --rm nsp_backend npx sequelize-cli db:migrate'
                sh 'docker-compose -f docker-compose.yml run --rm nsp_backend npm test '

            }
        }
        stage('clean docker containers') {
            steps {
                sh 'docker-compose down -v'
              }
        }
        stage('Reports') {
            steps {
                junit 'tests/_output/report.xml'
            }
        }
    }
      post {
        always {
           if(to != null && !to.isEmpty()) {
      emailext(body: content, mimeType: 'text/html',
         replyTo: '$DEFAULT_REPLYTO', subject: subject,
         to: to, attachLog: true )
              }
        }
    }
}
  

