import React from "react";
import styled from "styled-components";

const Title = ({ title }) => {
  return (
    <Wrapper>
      <p>
        {title}
      </p>
    </Wrapper>
  );
};

export default Title;

const Wrapper = styled.section`
  font-size: 20px;
  font-weight: bolder;
`;
