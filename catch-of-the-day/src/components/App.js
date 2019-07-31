import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

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

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // 1. Take a copy of state
    const order = {...this.state.order};
    // 2. Either add to the order or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state 
    this.setState({ order });
  };

  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
          </ul>
        </div>
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
        <Order fishes={this.state.fishes} order={this.state.order} />
      </div>
    )
  }
};

export default App;