const express = require('express')
const tenantq = require('./tenant-query').tenantquery;
const app = express()

app.get('/', function (req, res) {
  tenantq.getTenants((err) => { 
      console.log(err); 
      res.status(500).send();
    }, (data) => {
      res.json(data);
  });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})