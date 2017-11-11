import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div className='pa2 h-100 bg-light-blue'>
    <Link to='/overview'>Overview</Link> <br />
    <Link to='/countries/jp'>Go to Japan</Link> <br />
    <Link to='/countries/ru'>Go to Russia</Link> <br />
    <Link to='/countries/us'>Go to US</Link> <br />
    <Link to='/countries/no'>Go to Norway</Link> <br />
  </div>
)
