import React from 'react'

export default () => (
  <div className='pa3 f5 lh-copy'>
    <h1 className='mt0 f4 fw5 lh-title'>About Plans And Journals</h1>
    <p>This app aims to allow users to create plans and journals in each traveling destination with the help of map and other user interfaces.</p>
    <p>This is a portfolio project by <a href='https://chrisregner.github.io/'>Chris Regner</a>. Github repo <a href='https://github.com/chrisregner/plans-and-journals'>here</a>. The main tools used are:</p>
    <ul className='pl4'>
      <li><a href='https://developers.google.com/maps/documentation/javascript/'>Google Map</a></li>
      <li><a href='https://cloudinary.com/'>Cloudinary</a> (cloud image storage API)</li>
      <li><a href='http://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/'>Natural Earth</a> (map data)</li>
      <li><a href='https://reactjs.org/'>React</a> & <a href='https://redux.js.org/'>Redux</a></li>
      <li><a href='https://reacttraining.com/react-router/web/guides/philosophy'>React-Router</a></li>
      <li><a href='https://webpack.js.org/'>Webpack</a></li>
      <li><a href='http://www.material-ui.com/'>Material-UI</a></li>
      <li><a href='http://tachyons.io/'>Tachyons (functional css library</a></li>
      <li><a href='https://mochajs.org/'>Mocha</a> & <a href='http://chaijs.com/'>Chai</a></li>
      <li><a href='https://github.com/testdouble/testdouble.js'>testdouble.js</a> (minimal mock/stub/spies library)</li>
    </ul>
  </div>
)
