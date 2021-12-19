import React from "react";
import styled from "styled-components";

const Score = ({score}) =>{
    return(
        <Wrapper>
            <p>{"Score : "}{score}</p>
        </Wrapper>
    )
}

export default Score;

const Wrapper = styled.section`
    
`