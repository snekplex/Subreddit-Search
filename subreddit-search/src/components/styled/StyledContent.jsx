import styled from 'styled-components';

export const StyledResultImage = styled.img`
    font-family: 'Rubik', sans-seriff;
    font-size: 1.0em;
    height: auto;
    width: 70%
`;

export const StyledResult = styled.div`
    display: flex;
    flex-direction: column;
    background: darkgray;
    font-family: 'Rubik', sans-seriff;
    border: 3px solid gray;
    border-radius: 5px
`;

export const StyledResultHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-family: 'Rubik', sans-seriff;
    padding: 1em;
    height: 20%;
`;

export const StyledResultBody = styled.div`
    display: flex;
    flex-direction: column;
    height: 70%;
    align-items: center;
    padding: 1em;
`;

export const StyledResultFooter = styled.div`
    display: flex;
    flex-direction: column;
    height: 10%;
    padding: 1em;
`;

export const StyledResultSubredditLink = styled.a`
    text-decoration: none;
    font-size: 1.25em;
    color: black;

    &:hover {
        color: orange;
    }
`;