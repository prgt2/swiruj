const puppeteer = require('puppeteer')
const fs = require('fs')
const swirusy = require('./swirusy.json')
async function swiruj() {
    const browser = await puppeteer.launch({
        executablePath: "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
        userDataDir: "mnt/c/Users/User.DESTKOP-AJTIGN3N/AppData/Local/Temp/puppeteer_user_data",
        //headless: false
    })
    const page = await browser.newPage()

    await page.goto('https://www.worldometers.info/coronavirus/')
    const element_swirusow = await page.$('.content-inner > div:nth-child(7) > div:nth-child(2) > span:nth-child(1)')
    const liczba_swirusow = await page.evaluate(element_swirusow => element_swirusow.textContent, element_swirusow)
    let parse_swirus = parseFloat(liczba_swirusow.replace(/,/g, '.'))
    await browser.close()
    let swirus = { date: Date(), swirki: parse_swirus }
    swirusy.array_of_swiry += JSON.stringify(swirus)
        //console.log(swirusy)
    fs.writeFile('/.swirusy.json', swirusy, () => console.log(swirusy))
}
swiruj()