var pRequest = require('promisified-request').create();
var fScraper = require('form-scraper');
 
var formStructure = fScraper.fetchForm("#form_login", "http://www.someurl.https://cei.b3.com.br/CEI_Responsivo/", pRequest);

        console.log(formStructure)
        var loginDetails = { Login: usarname, senha: password };
        
        fScraper.submitForm(loginDetails, fScraper.provideForm(formStructure), pRequest).then( function (response) {
            console.log('asdasd');
});