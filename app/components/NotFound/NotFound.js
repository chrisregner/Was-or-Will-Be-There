import React from 'react'

export default () => (
  <div
    style={{
      top: 48,
      backgroundColor: 'rgba(255, 255, 255, 0.54)',
    }}
    className='fixed right-0 left-0 bottom-0 z-1 pt4 pb2 ph2 bg-white tc f5'
  >
    <h1 style={{ fontSize: '8rem' }} className='ma0 normal'>404</h1>
    <p className='ma0'>That page doesn’t even exist!</p>
    <p className='ma0'>Maybe there was some mistake in the URL?</p>
  </div>
)
