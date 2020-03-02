
/*const cheerio = require('cheerio');
// object of methods
var methods = {};
const puppeteer = require('puppeteer');

methods.download = async function(request, response) {
    
    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage();
    await page.goto('https://cei.b3.com.br/');
    await page.waitFor('input[name="ctl00$ContentPlaceHolder1$txtLogin"]');
    await page.type('input[name="ctl00$ContentPlaceHolder1$txtLogin"', '09030345900');
    await page.type('input[name="ctl00$ContentPlaceHolder1$txtSenha"', 'Destinydraw13@');
    await page.click('#ctl00_ContentPlaceHolder1_btnLogar');

    await page.waitFor(200);
    await page.waitFor('#nav > div > nav > ul > li.toggle-topbar.menu-icon > a');
    await page.click('#nav > div > nav > ul > li.toggle-topbar.menu-icon > a');

    await page.waitFor('#nav > div > nav > section > ul > li:nth-child(5) > a');
    await page.click('#nav > div > nav > section > ul > li:nth-child(5) > a');

    await page.waitFor('#nav > div > nav > section > ul > li.has-dropdown.not-click.moved > ul > li:nth-child(14) > a');
    await page.click('#nav > div > nav > section > ul > li.has-dropdown.not-click.moved > ul > li:nth-child(14) > a');

    await page.waitFor('#ctl00_ContentPlaceHolder1_ddlAgentes');
    await page.click('#ctl00_ContentPlaceHolder1_ddlAgentes');

    await page.evaluate(() => {

        const comp = document.getElementById('ctl00_ContentPlaceHolder1_ddlAgentes').length;
        
   
        document.querySelector('select option:nth-child(2)').selected = true;
    })
 
    /*await page.waitFor('#ctl00_ContentPlaceHolder1_ddlAgentes ');
    await page.click('#ctl00_ContentPlaceHolder1_ddlAgentes ');
    await page.waitFor('ctl00_ContentPlaceHolder1_ddlAgentes')[2].setAttribute("selected", "true");
    */
    // codigo em js para setar o valor em determinada opção document.getElementById('ctl00_ContentPlaceHolder1_ddlAgentes')[1].setAttribute("selected", "true");
    
/*
};

module.exports = methods;


*/