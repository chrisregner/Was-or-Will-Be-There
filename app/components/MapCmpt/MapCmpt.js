import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div className='pa2 h-100 bg-light-blue'>
    <Link to='/overview'>Overview</Link> <br />
    <Link to='/countries/jp'>Go to Japan</Link> <br />
    <Link to='/countries/de'>Go to Germany</Link> <br />
    <Link to='/countries/gb'>Go to UK</Link> <br />
    <Link to='/countries/eg'>Go to Egypt</Link> <br />
  </div>
)
