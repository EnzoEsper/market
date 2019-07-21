import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';

class App extends React.Component {
  state = {
    fishes:{},
    order:{}
  };

  addFish = fish => {
    // Taking a copy of the existing state
    const fishes = {...this.state.fishes};
    // Adding our new fish to the copy of the state
    fishes[`fish${Date.now()}`] = fish;
    // Updating our state
    this.setState({ fishes });
  };

  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Inventory addFish={this.addFish}/>
        <Order />
      </div>
    )
  }
};

export default App;