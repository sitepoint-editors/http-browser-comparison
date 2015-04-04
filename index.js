var request = require('superagent');
var axios = require('axios');

function report(message, data) {
    document.getElementById('result').textContent = message + ' ' + JSON.stringify(data);
}

function bindButton(id, handler) {
    document.getElementById(id).addEventListener('click', handler);
}

/* superagent request */
bindButton('superagentPost', function() {
   request.post('/orders/').send({'chocolate': 2})
        .type('application/json')
        .accept('json')
        .end(function(err, res) {
            if (err) {
                report(err.status, 'Error!');
            } else {
                report(res.status, res.body);
            }
        });
});

bindButton('superagentGet', function() {
    request.get('/orders')
        .query({start: '2015-04-22', end: '2015-04-29'})
        .accept('json')
        .end(function(err, res) {
            if (err) {
                report(err.status, 'Error!');
            } else {
                report(res.status, res.body);
            }
        });
});

/* XMLHttpRequest */
bindButton('xhrPost', function() {
    var xhr = new XMLHttpRequest();
    /* Watch out call open before everything else */
    xhr.open('POST', '/orders/', true);
    /* Response type only available in Internet Explorer 10 and up */
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            report(xhr.status, xhr.response);
            } else {
                report('XHR error');
            }
    };
    xhr.send(JSON.stringify({'chocolate': 2}));
});

bindButton('xhrGet', function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/orders?start=' +
             encodeURIComponent('2015-04-22') + '&end=' +
             encodeURIComponent('2015-04-29'), true);
    /* Response type only available in Internet Explorer 10 and up */
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            report(xhr.status, xhr.response);
        } else {
            report('XHR error');
        }
    };
    xhr.send();
});

/* axios */
bindButton('axiosPost', function() {
    axios.post('/orders/', {'chocolate': 2},
               {
                   headers: {
                       'Content-type': 'application/json',
                       'Accept': 'application/json'
                   }
               }
              ).then(function(response) {
                  report(response.status, response.data);
              })
        .catch(function(response) {
            if (response instanceof Error) {
                report('An error occurred setting up the request');
            } else {
                report(response.status);
            }
        });

});

bindButton('axiosGet', function() {
    axios.get('/orders',
              {
                  headers: {
                      'Accept': 'application/json'
                  },
                  params: {
                      start: '2015-04-22', end: '2015-04-29'
                  }
              }
             ).then(function(response) {
                 report(response.status, response.data);
             })
        .catch(function(response) {
            if (response instanceof Error) {
                report('An error occurred setting up the request');
            } else {
                report(response.status);
            }
        });
});
