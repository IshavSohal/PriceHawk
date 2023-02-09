import React from 'react';

class App extends React.Component{

  constructor(props: {} | Readonly<{}>){
    super(props);
    this.state = {showMenu: true};
  }

  toggleMenu(){
    this.setState({showMenu: !this.state.showMenu});
  }

  render() {
    return(
      <div id="root">
        <button id="addItem" onClick={this.toggleMenu}> Add Item</button>
      
      </div>
    )
  }
}

export default App;
