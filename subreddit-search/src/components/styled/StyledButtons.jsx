import styled from 'styled-components';

export const StyledSubmitBtn = styled.button`
    font-size: 1em;
    padding: 1em 2em 1em 2em;
    font-family: ${props => props.theme.buttons.submit.fontFamily};
    cursor: pointer;
    font-weight: 700;
    text-align: center;
    background: ${props => props.theme.buttons.submit.background};
    color: ${props => props.theme.buttons.submit.color};
    border: ${props =>  props.theme.buttons.submit.border};
    border-radius: ${props => props.theme.buttons.submit.borderRadius}
`;