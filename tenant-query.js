const fs = require('fs');
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
// const k8sConfig = {
//     url: 'http://127.0.0.1:8001'
// };


module.exports.tenantquery = {

    getTenants: (error, success) => {
        const apiCore = new Api.Core(k8sConfig);

        apiCore.ns.svc.get({ qs: { labelSelector: 'team21=minecraft' }}, (err, data) => {
            if (err) {
                error(err);
            } else {
                const result = []
                for (i = 0; i < data.items.length; i++) {
                    const item = data.items[i];
                    result.push({
                        "name": item.metadata.name,
                        "endpoints": {
                        "minecraft": `${item.status.loadBalancer.ingress[0].ip}:25565`,
                        "rcon": `${item.status.loadBalancer.ingress[0].ip}:25575`
                        }
                    });
                }
                
                success(result);
            }
        })
    }
};
