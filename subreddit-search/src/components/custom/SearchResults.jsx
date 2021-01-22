import React from 'react';
import { StyledResultSectionTitle } from '../styled/StyledTitles';
import { StyledResultSection } from '../styled/StyledSections';
import { StyledResultsWrapper } from '../styled/StyledWrappers';

export class ResultsSections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                {
                    this.props.apiData.results &&
                    Object.keys(this.props.apiData.results).map((subreddit) => (
                        <ResultSection
                            key={subreddit}
                            subName={subreddit}
                            subResults={this.props.apiData.results[subreddit]}
                        />
                    ))
                }
            </div>
        )
    }
}


class ResultSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <StyledResultSection>
                <StyledResultSectionTitle>
                    r/{this.props.subName}
                </StyledResultSectionTitle>
                <StyledResultsWrapper>
                    <Results
                        key={this.props.subName}
                        subName={this.props.subName}
                        results={this.props.subResults}
                    />
                </StyledResultsWrapper>
            </StyledResultSection>
        )
    }
}

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    render() {
        return (
            <StyledResultsWrapper>
                {
                    this.props.results !== null &&
                    this.props.results !== undefined &&
                    this.props.results.length >= 1 && (
                        this.props.results.map((result) => (
                            <Result
                                key={result.postLink}
                                subreddit={result.subreddit}
                                title={result.postTitle}
                                postLink={result.postLink}
                                postOutboundLink={result.postOutboundLink}
                                tags={result.tags}
                            />
                        ))
                    )
                }
                {
                    ((this.props.results === null) ||
                    (this.props.results === undefined)) && (
                        <div>
                            No results from { this.props.subName }
                        </div>
                    )
                }
            </StyledResultsWrapper>
        )
    }
}

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    evaulatePostOutboundLink() {
        // See what each link is. Is it to a website, img, etc.
    }

    render () {
        return (
            <div>
                <div>
                    {/* Title card */}
                    <h5>{ this.props.title }</h5>
                    <h6>{ this.props.subreddit }</h6>
                </div>
                <div>
                    {/* Content to display if any. (img, embedded link, etc)*/}
                    { this.props.postLink }
                    { this.props.postOutboundLink }
                </div>
                <div>
                    {/* Footer containing other metadata like tags */}
                    { this.props.tags }
                </div>
            </div>
        )
    }
}