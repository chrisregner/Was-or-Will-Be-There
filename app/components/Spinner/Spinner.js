import React from 'react'
import styled from 'styled-components'

const Spinner = styled.div`
  margin-top: -8px;
  text-align: center;

  & > div {

    width: 5px;
    height: 5px;
    background-color: #aaa;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  & > .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

 & > .bounce2 {
    margin-right: 5px;
    margin-left: 5px;
    -webkit-animation-delay: -0.15s;
    animation-delay: -0.15s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
`

export default () => (
  <Spinner>
    <div className='bounce1' />
    <div className='bounce2' />
    <div className='bounce3' />
  </Spinner>
)
