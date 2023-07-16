const puppeteer = require("puppeteer");
const argv= require('node:process');
require('dotenv').config();



async function scrapeImage(link){


    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');

    await page.goto('https://www.instagram.com');
    await page.screenshot({path: '2.png'});

    await page.waitForSelector('[name=username]');

    await page.type('[name=username]', process.env.user_name,{delay: 100});

    await page.type('[name=password]',process.env.password,{delay: 100});

    await page.click('.x9f619',{delay: 100});

    await page.screenshot({path: '2.png'});

    await page.click('[type=submit]',{delay: 100});

    await page.waitForNavigation();

    await page.screenshot({path: '3.png'});

    await page.goto(link);

    await page.waitForTimeout(5000);

    await page.screenshot({path: '5.png'});

    await page.waitForSelector('img');

    await page.screenshot({path: '6.png'});

    const url = page.evaluate(()=>{
        const image = document.querySelectorAll('img')[3];
        return image.src
    });

    await browser.close();

    url.then(result=>console.log(result));
    
    return url

}

scrapeImage(process.argv[2])