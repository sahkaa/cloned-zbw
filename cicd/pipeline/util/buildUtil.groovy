// General purpose build related functions
// Ideally these functions should be in a Jenkins Shared Library,
// but till we have a common repo for that, the below should suffice

def checkout() {
    checkout scm
}

def buildService(gradleOptions = "") {
    sh "./gradlew clean build $gradleOptions"
    echo 'Ran build successfully'
    junit allowEmptyResults: true, testResults: '**/build/test-results/**/*.xml'
    echo 'Generated unit test results'
    jacoco buildOverBuild: true, changeBuildStatus: true, deltaBranchCoverage: '15', deltaClassCoverage: '15',
            deltaComplexityCoverage: '15', deltaInstructionCoverage: '15', deltaLineCoverage: '15',
            deltaMethodCoverage: '15',
            exclusionPattern: '**/*Application.class **/*Test.class **/*Config.class **/*Consts.class',
            maximumBranchCoverage: '70', maximumClassCoverage: '70', maximumComplexityCoverage: '70',
            maximumInstructionCoverage: '70', maximumLineCoverage: '80', maximumMethodCoverage: '70',
            minimumBranchCoverage: '70', minimumClassCoverage: '70', minimumComplexityCoverage: '70',
            minimumInstructionCoverage: '70', minimumLineCoverage: '80', minimumMethodCoverage: '70'

    echo 'Recorded Test coverage report'
}

def buildServiceWithAline() {
    devfactory(portfolio: 'TestPFAurea', product: 'Cloned-ZBW', productVersion: 'Develop', types: 'Java',
            jacocoFile: "**/*.exec") {
        buildService("--continue -x findbugsMain -x findbugsTest")
    }
}

def buildUI() {
    sh "cd ui; npm install --@devfactory:registry=http://nexus-rapid-proto.devfactory.com/repository/npm-proto/; " +
            "npm run build"
    echo "Finished the UI build"
}

def runIntegrationTests() {
    //empty for now
}

def runAcceptanceTests() {
    stage('Run acceptance tests') {
        //empty for now
    }
}

def runPerfTests() {
    stage('Run Performance Tests') {
        //empty for now
    }
}

def buildDockerImage(String branchName, String tag, String workspace, String dockerImageName) {
    sh "cd cicd/scripts; ./build-docker.sh $branchName $tag $workspace $dockerImageName;"
    echo 'Built Docker Image'
}

def pushDockerImageToRegistry(String branchName, String tag, String dockerImageName) {
    sh "cd cicd/scripts; ./push-docker-to-registry.sh $branchName $tag $dockerImageName;"
    echo 'Pushed docker image to Docker Registry successfully'
}

return this;
