var phantom = require('phantom');
var rp = require('request-promise');
const cheerio = require('cheerio');

const $ = cheerio.load('url:https://cei.b3.com.br/CEI_Responsivo/')
// object of methods
var methods = {};

methods.download = async function(req, res) {
    
    
    var options = {
        method: 'POST',
        uri: 'https://cei.b3.com.br/CEI_Responsivo/',
        form_login: {
            // Like <input type="text" name="name">
            ctl00$ContentPlaceHolder1$txtLogin: '09030345900',
            ctl00$ContentPlaceHolder1$txtSenha: 'Destinydraw13@',
            ctl00$ContentPlaceHolder1$btnLogar: click(),
        },
    };
    
    rp(options)
        .then(function (body) {
            return response.json(body);
            console.log('asdasd');
        })
        .catch(function (err) {
            console.log('asdasd');
        });

};

module.exports = methods;