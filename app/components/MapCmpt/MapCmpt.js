import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div className='pa2 h-100 bg-light-blue'>
    <Link to='/countries/jp'>Go to Japan</Link> <br />
    <Link to='/countries/de'>Go to Germany</Link> <br />
    <Link to='/countries/ph'>Go to Philippines</Link> <br />
  </div>
)
