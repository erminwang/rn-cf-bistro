import React from 'react';
import Main from './components/MainComponent';

if(typeof global.self === "undefined")
{
    global.self = global;
}

export default class App extends React.Component {
  render() {
    return (
      <Main />
    );
  }
}