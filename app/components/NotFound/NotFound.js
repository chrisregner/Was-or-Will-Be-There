import React from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

export default () => (
  <div
    style={{ minHeight: 'calc(100vh - 48px)', backgroundColor: 'rgba(255, 255, 255, 0.75)' }}
    className='pt5 pb2 ph2 bg-white dark-gray tc'
  >
    <h1
      style={{
        fontFamily: 'Arial Black,Arial Bold,Gadget,sans-serif',
        fontSize: '6rem',
      }}
      className='ma0 normal'
    >
      404
    </h1>
    <p className='ma0 lh-copy f4'>That page doesn’t even exist!</p>
    <p className='ma0 lh-copy f6'>Maybe there was some mistake in the URL?</p>
    <div className='tc pt4'>
      <Link to={'/'}>
        <RaisedButton secondary label='Explore The World Instead' />
      </Link>
    </div>
  </div>
)
