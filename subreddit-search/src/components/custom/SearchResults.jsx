import React from 'react';
import { StyledResultSectionTitle,
         StyledPostTitle } from '../styled/StyledTitles';
import { StyledResultSection,
         StyledResultsSections } from '../styled/StyledSections';
import { StyledResultsWrapper,
         StyledResultWrapper } from '../styled/StyledWrappers';
import { StyledResultImage,
         StyledResult,
         StyledResultBody,
         StyledResultFooter, 
         StyledResultHeader,
         StyledResultSubredditLink } from '../styled/StyledContent';
import ReactPlayer from 'react-player'

export class ResultsSections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <StyledResultsSections>
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
            </StyledResultsSections>
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

    evaulatePostOutboundLink(link) {
        if (link === undefined || link === null) {
            return link;
        } 

        var linkType;
        
        const extensions = {
            img: [
                'png',
                'jpg',
                'gif',
            ],
            video: [
                'mp4',
                'webm',
            ],
            conversion: [
                'gifv'
            ]
        }

        var fileExt = link.split('.').pop()

        if (extensions.img.includes(fileExt)) {
            linkType = 'image'
        } else if (
            extensions.video.includes(fileExt) ||
            link.includes('youtube')
        ) {
            linkType = 'video'
        } else if (extensions.conversion.includes(fileExt)) {
            linkType = 'conversion'
        } else {
            linkType = 'unknown'
        }

        return linkType
    }

    convertTo(link) {
        const conversions = {
            'gifv': 'mp4'
        }

        var fileExt = link.split('.').pop()

        if (conversions[fileExt]) {
            return conversions[fileExt]
        } else {
            return null;
        }
    }

    convertLink(link) {
        const conversions = {
            'gifv': 'mp4'
        }

        var fileExt = link.split('.').pop()

        if (conversions[fileExt]) {
            // Should work most of the time in this use case.
            // Though if a file has a file type in its name, it will 
            // most likely fail.
            var newLink = link.replace(fileExt, conversions[fileExt])
            return newLink
        } else {
            return link
        }

    }

    openPostInNewTab() {
        const newWindow = window.open(this.props.postLink, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    }

    render () {
        return (
            <StyledResultWrapper>
                <StyledResult onClick={() => this.openPostInNewTab()}>
                    <StyledResultHeader>
                        <StyledPostTitle>
                            { this.props.title }
                        </StyledPostTitle>
                        <div>
                            <StyledResultSubredditLink href={'https://reddit.com/r/'+this.props.subreddit}>
                                r/{this.props.subreddit}
                            </StyledResultSubredditLink>
                        </div>
                    </StyledResultHeader>
                    <StyledResultBody>
                        {
                            this.evaulatePostOutboundLink(this.props.postOutboundLink) === 'image' &&
                            (
                                <StyledResultImage
                                    src={this.props.postOutboundLink}
                                    alt={this.props.postOutboundLink}
                                />
                            )
                        }
                        {
                            this.evaulatePostOutboundLink(this.props.postOutboundLink) === 'video' &&
                            (
                                <ReactPlayer
                                    width="auto"
                                    height="auto"
                                    url={this.props.postOutboundLink}
                                    controls={true}
                                />
                            )
                        }
                        {
                            this.evaulatePostOutboundLink(this.props.postOutboundLink) === 'conversion' &&
                            this.convertTo(this.props.postOutboundLink) === 'mp4' && 
                            (
                                <ReactPlayer
                                    width="100%"
                                    height="100%"
                                    url={this.convertLink(this.props.postOutboundLink)}
                                    controls={true}
                                />
                            )
                        }
                    </StyledResultBody>
                    <StyledResultFooter>
                        Tags: { this.props.tags.map((tag) => ( <span key={Math.random()}>| {tag} |</span> )) }
                    </StyledResultFooter>
                </StyledResult>
            </StyledResultWrapper>
        )
    }
}