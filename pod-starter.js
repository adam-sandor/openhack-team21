const Api = require('kubernetes-client');

// using kubernetes-client library: https://www.npmjs.com/package/kubernetes-client

const k8sConfig = {
    url: 'https://kubernetes.default.svc.cluster.local',
    ca: fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/ca.crt'),
    auth: {
        bearer: fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/token')
    },
    namespace: fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/namespace')
};


const pod = {
    apiVersion: "v1",
    kind: "Pod",
    metadata: {
        name: `podname`,
        labels: {
            key: "value"
        }
    },
    spec: {
        restartPolicy: "Never",
        containers: [
            {
                name: `containername`,
                image: `docker/image`,
                resources: {
                    requests: {
                        cpu: "750m",
                        memory: "100Mi"
                    },
                    limits: {
                        cpu: "750m",
                        memory: "1000Mi"
                    }
                }                
            }
        ]
    }
};

const apiCore = new Api.Core(config);

log.info(`Starting job for file ${filepath} with version ${this.version}`);
apiCore.ns.pods.post({body: job}, (err, data) => {
    if (err) {
        log.error(err)
    } else {
        log.info(`Job for file ${filepath} started successfully`)
    }
});
