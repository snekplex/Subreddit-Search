const pupeteer = require('puppeteer')

// NOTE: Will only currently work with search terms seperated by 1 space
function formatSearchTerm(searchTerm) {
    var formattedSearchTerm = searchTerm.trim();
    
    if (searchTerm.indexOf(' ') >= 0) {
        // Search term is multiple words and needs to be formatted
        let newSearchTerm = '';
        const terms = formattedSearchTerm.split(' ')
        console.log(terms);
        for (let i=0; i < terms.length-1; i++) {
            newSearchTerm += terms[i] + '%20'
        }
        
        newSearchTerm += terms[terms.length-1]
        formattedSearchTerm = newSearchTerm;      
    } 

    return formattedSearchTerm;
}

const scrapePage = async (allowNsfw, searchTerm, subreddits) => {
    // allowNsfw: if set to true, will allow the browsing of NSFW subreddits
    // searchTerm: url safe string for query
    // subreddits: array of subreddits to search the term for
    searchTerm = searchTerm.trim()
    try {
        const browser = await pupeteer.launch({ headless: false });
        const context = browser.defaultBrowserContext();

        context.overridePermissions('https://reddit.com', ['notifications']);

        if (allowNsfw) {

            const dummyPage = await browser.newPage();

            // Go to dummy page to set the over18 cookie needed and set to the value of 1
            // This will allow the script to traverse NSFW subreddits
            await dummyPage.goto('https://reddit.com/r/nsfw', { waitUntil: 'load' });

            // XPath taken Nov 6 2020
            const acceptBtn = await dummyPage.$x('/html/body/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div/div[2]/button');
            await acceptBtn[0].click();

            // Wait for 5 seconds ensure the cookie is set after page reload
            await new Promise(r => setTimeout(r, 5000));
            const cookies =  await dummyPage.cookies();
            let over18 = false;

            for (cookie of cookies) {
                if (cookie.name === 'over18') {
                    over18 = true;
                }
            }

            if (!over18) {
                console.log('Not allowed to traverse NSFW subreddits. Returning.')
                return;
            }

            await dummyPage.close();

        }

        const searchPage = await browser.newPage();
        const formattedSearchTerm = formatSearchTerm(searchTerm);

        const searchResults = {}

        for (subreddit of subreddits) {
            let searchResUrl = `https://reddit.com/r/${subreddit}/search?q=${formattedSearchTerm}&restrict_sr=1`;
            await searchPage.goto(searchResUrl, { waitUntil: 'domcontentloaded' });
            
            // Timeout allows for results to load in. Adjust as necessary
            await new Promise((r) => setTimeout(r, 3000));

            let results = [];

            let postLinks = await searchPage.evaluate(
                () => Array.from(
                    document.querySelectorAll('a.SQnoC3ObvgnGjWt90zD9Z._2INHSNB8V5eaWp4P0rY_mE[href]'),
                    link => link.getAttribute('href')
                )
            )

            let postTitles = await searchPage.evaluate(
                () => Array.from(
                    document.querySelectorAll('h3._eYtD2XCVieq6emjKBH3m'),
                    title => title.textContent
                )
            )


            // Will return links to outbound websites and not just imgs.
            // For example this may include YouTube, Imgur, news websites, etc
            // Will return a [] array if not links are found(Most likely text based subreddit)
            let postOutboundLinks = await searchPage.evaluate(
                () => Array.from(
                    document.querySelectorAll('a._13svhQIUZqD9PVzFcLwOKT.styled-outbound-link[href]'),
                    link => link.getAttribute('href')
                )
            )

            // Jan 11 2021
            // Combinations are based off the current assumption that the
            // post links and the post outbound links are in the same order
            // when scraped
            
            try {
                for (let i=0; i < postLinks.length; i++) {
                    let result = {
                        'subreddit': subreddit,
                        // Basic tagging defining a tag as a word(s) seperated by a space
                        // EX: Blue Bird = ['Blue', 'Bird']
                        'tags': searchTerm.split(' '),
                        'postLink': postLinks[i],
                        'postTitle': postTitles[i],
                        'postOutboundLink': postOutboundLinks[i]
                    }
                    results.push(result);
                }
            } catch (error) {
                console.log(error);
            }

            searchResults[subreddit] = results;

        }

        browser.close();
        return searchResults;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = scrapePage;
