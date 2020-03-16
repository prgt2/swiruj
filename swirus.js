const puppeteer = require('puppeteer')
const fs = require('fs')
const swirusy = require('./swirusy2.json')
console.log((swirusy.array))
async function swiruj() {
    const browser = await puppeteer.launch({
        executablePath: 'snap/bin/chromium'
    })
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(0); 
    await page.goto('https://www.worldometers.info/coronavirus/')
    //await page.goto('file:///home/fit/Pulpit/swiruj/swiruj/worldometers.html')
    const kolekcja = await page.evaluate(() => {
        let swirusy = {
            array: []
        }
        let element_swirusow = $('.content-inner > div:nth-child(7) > div:nth-child(2) > span:nth-child(1)').text()
        let parse_swirusy = element_swirusow.replace(/,/g, '.')
        let collection_of_texts = []
        let collection_countries = $('td:nth-child(1)').toArray()
        let collection_numbers = $('td:nth-child(2)').toArray()
        let collection_numbers2 = []
        for (el of collection_numbers) {
            collection_numbers2.push(($(el).text().replace(/\n|  /g, '').replace(/,/g,'.')))
        }
        for ([index, el] of collection_countries.entries()) {
            collection_of_texts.push((index + 1) + ($(el).text().replace(/\n|  /g, '')) + collection_numbers2[index])
            
            let swir = new nowy_rekord(($(el).text().replace(/\n|  /g, '')), collection_numbers2[index])
            swirusy.array.push(swir)
        }
        collection_of_texts.unshift(0 + 'Worldwide' + parse_swirusy)
        //return collection_of_texts

        function nowy_rekord(country, infected) {
            this.date = Date()
            this.country = country
            this.infected = infected
        }
        return swirusy

    })
    swirusy.array.push(kolekcja)
    console.log(kolekcja)
    fs.writeFileSync('./kolekcja', JSON.stringify(kolekcja))
    await browser.close()
}
swiruj()

