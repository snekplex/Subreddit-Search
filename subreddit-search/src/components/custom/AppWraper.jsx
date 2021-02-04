import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { StyledBasicWrapper,
         StyledSearchBoxWrapper, 
         StyledWebsiteTitleWrapper,
         StyledWebsiteContentWrapper,
         StyledResultsSectionsWrapper } from '../styled/StyledWrappers';
import { StyledWebsiteTitle, StyledWebsiteSubtitle } from '../styled/StyledTitles';
import { StyledSubmitBtn } from '../styled/StyledButtons';
import { StyledSearchInput, StyledTextArea } from '../styled/StyledInputs';
import { ResultsSections } from '../custom/SearchResults';

import * as searchService from '../../services/api.searchService';


export default class AppWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingResults: false,
            searchString: '',
            subredditsString: '',
            searchTerms: [],
            subreddits: [],
            results: {}
        }
    }

    onSearchInputChange = (input) => {
        this.setState({
            searchString: input
        })
    }

    onSubrreditSearchChange = (input) => {
        this.setState({
            subredditsString: input
        })
    }

    onSearchSubmit = async () => {
        this.setState({ loadingResults: true })

        const searchTerms = this.state.searchString.trim()
                            .split(' ');

        const subreddits = this.state.subredditsString.trim()
                           .split('\n');

        // Removes any potential white-space before/after subreddit
        for (let i=0; i < subreddits.length; i++) {
            subreddits[i] = subreddits[i].trim()
        }

        const results = await searchService.getSearchResults(
            searchTerms,
            subreddits
        ).catch((err) => {
            console.log(err)
        })

        this.setState({
            searchTerms: searchTerms,
            subreddits: subreddits,
            results: results,
            loadingResults: false
        })
    }


    render() {
        return (
            <StyledWebsiteContentWrapper>
                <StyledWebsiteTitleWrapper>
                    <StyledWebsiteTitle>
                        Subreddit Search
                    </StyledWebsiteTitle>
                    <StyledWebsiteSubtitle>
                        A place to search subreddits simply
                    </StyledWebsiteSubtitle>
                </StyledWebsiteTitleWrapper>
                <StyledSearchBoxWrapper>
                    <StyledSearchInput 
                        placeholder="Enter search term here..."
                        onChange={(event) => this.onSearchInputChange(event.target.value) }
                    />
                    <StyledTextArea
                        placeholder="Enter subreddits here seperated by newline..."
                        onChange={(event) => this.onSubrreditSearchChange(event.target.value) } 
                    />
                    <StyledSubmitBtn onClick={() => this.onSearchSubmit()}>
                        Submit
                    </StyledSubmitBtn>
                    <div>
                        {
                            this.state.loadingResults && (
                                <StyledBasicWrapper>
                                    <StyledWebsiteSubtitle>
                                        Loading results (May take a bit)
                                    </StyledWebsiteSubtitle>
                                    <BeatLoader
                                        size={40}
                                        color={"#000"}
                                        loading={this.state.loadingResults}
                                    />
                                </StyledBasicWrapper>
                            )
                        }
                    </div>
                </StyledSearchBoxWrapper>
                <StyledResultsSectionsWrapper>
                    <ResultsSections
                        apiData={this.state.results}
                    />
                </StyledResultsSectionsWrapper>
            </StyledWebsiteContentWrapper>
        )
    }
}