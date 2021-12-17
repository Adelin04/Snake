import React from "react";
import styled from "styled-components";

const Level =({level})=>{
    return(
        <Wrapper>
            <p>{'Level : '}{level}</p>
        </Wrapper>
    )
}

export default Level;

const Wrapper = styled.section`

`