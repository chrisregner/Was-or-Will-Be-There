import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div>
    <Link to='/countries/jp/plans/new'>Add Plan in Japan</Link> <br />
    <Link to='/countries/de/plans/new'>Add Plan in Germany</Link>
  </div>
)
