import React from 'react';
import { StyledBasicWrapper, StyledSearchBoxWrapper } from '../styled/StyledWrappers';
import { StyledSubmitBtn } from '../styled/StyledButtons';
import { StyledSearchInput } from '../styled/StyledInputs';

export default class AppWrapper extends React.Component {
    render() {
        return (
            <div>
                <StyledSearchBoxWrapper>
                    <StyledSearchInput placeholder="Enter search term here..."/>
                    <StyledSubmitBtn>
                        Submit
                    </StyledSubmitBtn>
                </StyledSearchBoxWrapper>
            </div>
        )
    }
}