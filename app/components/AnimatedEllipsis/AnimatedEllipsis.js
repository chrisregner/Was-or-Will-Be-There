import React from 'react'
import styled from 'styled-components'

// By Caleb Ely
// https://codepen.io/le717/pen/yYZOZR

const Wrapper = styled.div`
  .dot {
    display: inline;
    margin-left: 0.2em;
    margin-right: 0.2em;
    position: relative;
    top: -5em;
    font-size: 2em;
    opacity: 0;
    animation: showHideDot 2.5s ease-in-out infinite;

    &.one { animation-delay: 0.2s; }
    &.two { animation-delay: 0.4s; }
    &.three { animation-delay: 0.6s; }
  }

  @keyframes showHideDot {
    0% { opacity: 0; }
    50% { opacity: 1; }
    60% { opacity: 1; }
    100% { opacity: 0; }
  }
`

const AnimatedEllipsis = () => (
  <Wrapper>
    <span className='dot one'>.</span>
    <span className='dot two'>.</span>
    <span className='dot three'>.</span>
  </Wrapper>
)

export default AnimatedEllipsis
