require("dotenv").config();

const puppeteer = require("puppeteer");
const selectors = require("./config/selectors");

const Database = require("./db/index");
const Product = require("./models/Product");

/**
 * @constructor
 * @this {Crawler}
 * @param {string} text - search keywords
 */
class Crawler {
  constructor(text = "Ice nine kills t shirt") {
    this.browser = null;
    this.page = null;
    this.searchText = text;
    this.startUrl = "https://amazon.com";
    this.links = [];
    this.data = [];
  }

  /**
   * @this {Crawler}
   * @description Collects links to single pages from pages 1 to 3 of pagination
   */
  async getLinks() {
    for (let i = 2; i < 5; i++) {
      // 0...2 === 2...4
      await this.page.waitForNavigation({
        waitUntil: "load",
        timeout: 0
      });

      const linksList = await this.page.evaluate(selectorsList => {
        return [...document.querySelectorAll(selectorsList.RESULT_ITEM)].map(
          el => el.querySelector(selectorsList.RESULT_LINK).href
        );
      }, selectors); // have to pass selectors variable here

      this.links = [...this.links, ...linksList];

      const nextPage = `PAGE_${i}`;

      if (selectors[nextPage]) {
        await this.page.click(selectors[nextPage]);
      }
    }
  }

  /**
   * @this {Crawler}
   * @description Collects necessary data about each product from a corresponding single page
   */
  async getData() {
    for (let i = 0; i < this.links.length; i++) {
      await this.page.goto(this.links[i], {
        waitUntil: "load",
        timeout: 0
      });

      const dataObject = await this.page.evaluate(selectorsList => {
        const asin = document.querySelector(selectorsList.ITEM_ASIN);
        const title = document.querySelector(selectorsList.ITEM_TITLE);
        const price = document.querySelector(selectorsList.ITEM_PRICE);
        const reviews = document.querySelector(selectorsList.ITEM_REVIEWS);
        const rating = document.querySelector(selectorsList.ITEM_RATING);
        const firstListed = document.querySelector(
          selectorsList.ITEM_FIRST_LISTED
        );

        return {
          asin: asin ? asin.value : "N/A",
          title: title
            ? title.textContent.replace(/(\r\n|\n|\r|\s{2,})/g, "")
            : "N/A",
          price: price ? price.textContent : "N/A",
          reviews: reviews ? reviews.textContent : "N/A",
          rating: rating ? rating.textContent : "N/A",
          firstListed: firstListed ? firstListed.textContent : "N/A"
        };
      }, selectors); // have to pass selectors variable here

      this.data = [...this.data, dataObject];
    }
  }

  /**
   * @this {Crawler}
   * @description Stores products data in MongoDB using Mongoose model
   */
  async saveData() {
    const savePromises = [];

    for (let i = 0; i < this.data.length; i++) {
      const currentObject = this.data[i];

      const condition =
        currentObject.asin === "N/A"
          ? { title: currentObject.title }
          : { asin: currentObject.asin };

      savePromises.push(
        Product.findOneAndUpdate(condition, currentObject, {
          upsert: true,
          new: true
        })
      );
    }

    console.log(`${this.data.length} records are created/updated`);

    await Promise.all(savePromises);
  }

  /**
   * @this {Crawler}
   * @description Main function, launches Puppeteer and starts searching process
   */
  async search() {
    console.log(
      `Crawling started at ${new Date().toISOString().substr(11, 8)} UTC`
    );

    this.browser = await puppeteer.launch({
      headless: false
    });

    this.page = await this.browser.newPage();

    await this.page.goto(this.startUrl, {
      waitUntil: "networkidle0",
      timeout: 0
    });

    await this.page.type(selectors.SEARCH_BOX, this.searchText, {
      delay: 250
    });

    await this.page.click(selectors.SEARCH_BUTTON);

    await this.getLinks();

    await this.getData();

    await this.saveData();

    this.browser.close();

    console.log(
      `Crawling ended at ${new Date().toISOString().substr(11, 8)} UTC`
    );

    Database.connection.close();
  }
}

const seeder = new Crawler("Ice nine kills t shirt");

Database.connect().then(async () => {
  await seeder.search();

  Database.connection.close();
});
