//Deploy related functions

def deploy(String branchName, String tag) {
    String dockerImageVersion = branchName+"-"+tag;
    if (currentBuild.result == null || currentBuild.result == 'SUCCESS') {
        sh "export tag="+dockerImageVersion+"; " +
                "docker stop sample-zbw-api || true && docker rm sample-zbw-api || true;" +
                "docker stop sample-zbw-ui || true && docker rm sample-zbw-ui || true; " +
                "docker-compose up -d;"
    }
}

return this;
