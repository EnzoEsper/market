import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
class App extends React.Component {
  
  state = {
    fishes:{},
    order:{}
  };

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount(){
    const { params } =  this.props.match;
    // reinstating the local storage first
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order : JSON.parse(localStorageRef) });
    };

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  };

  componentDidUpdate(){
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  };
  
  addFish = fish => {
    // Taking a copy of the existing state
    const fishes = {...this.state.fishes};
    // Adding our new fish to the copy of the state
    fishes[`fish${Date.now()}`] = fish;
    // Updating our state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. Take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. For remove from firebase we have to set it to null
    fishes[key] = null;
    // 3. update state
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

  removeFromOrder = key => {
    // 1. Take a copy of state
    const order = {...this.state.order};
    // 2. remove that item from order
    delete order[key];
    // 3. Call setState to update our state 
    this.setState({ order });
  };

  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline={"Fresh Seafood Market"}/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
          </ul>
        </div>
        <Inventory addFish={this.addFish} updateFish={this.updateFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes} deleteFish={this.deleteFish} storeId={this.props.match.params.storeId}/>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
      </div>
    )
  }
};

export default App;