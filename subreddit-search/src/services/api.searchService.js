
export async function getSearchResults(searchTerms, subreddits) {
    // searchTerms: array of terms to search
    // subreddits: an arrary of subreddits to query for the search terms

    var url = 'http://localhost:3001/api/endpoints/search?'

    for (let i=0; i < searchTerms.length; i++) {
        if (i === 0) {
            url += `searchTerms=${searchTerms[i]}`
        } else {
            url += `&searchTerms=${searchTerms[i]}`
        }
    }
    
    for (let i=0; i < subreddits.length; i++) {
        url += `&subreddits=${subreddits[i]}`
    }

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
    }).catch((err) => {
        console.log(err);
    })

    return response.json()
}