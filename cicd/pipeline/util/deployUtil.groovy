def deploy() {
    if (currentBuild.result == null || currentBuild.result == 'SUCCESS') {
        println "deploying with docker-compose for env ${ENV_NAME}, DOCKER_HOST ${DOCKER_HOST}, " +
                "AUREA_API_UI_URL ${AUREA_API_UI_URL}, BACKEND_URL ${BACKEND_URL}"
        sh "docker stop ${ENV_NAME}_cloned-zbw_ui || true && docker rm ${ENV_NAME}_cloned-zbw_ui || true;" +
                "docker stop ${ENV_NAME}_cloned-zbw_api || true && docker rm ${ENV_NAME}_cloned-zbw_api || true; "
        sh "docker-compose  rm -fs; docker-compose pull; docker-compose up -d;"
    }
}

this
