import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native-web';
import {useState} from 'react';

const discounts = {
  1000: 0.03,
  5000: 0.05,
  7000: 0.07,
  10000: 0.1,
  50000: 0.15
}


function App() {
  const [state, setState] = React.useState({
    itemAmount: 0,
    itemPrice: 0,
    discount: 0,
    usingManualDiscount: false,
    taxRate: 0.04,
  })

  const handleAmountChange = event => {
    setState({ ...state, itemAmount: event.target.value });
  };

  const handleDiscountChange = event => {
    if(event.target.value.length > 0) {
      setState({ ...state, usingManualDiscount: true, discount: 1 - event.target.value/100});
    } else {
      setState({ ...state, usingManualDiscount: false, discount: 1 - event.target.value/100});
    }
  };

  const handleTaxChange = event => {
    setState({ ...state, taxRate: 1 + event.target.value/100});
  };

  const handlePriceChange = event => {
    setState({ ...state, itemPrice: event.target.value });
  };

  function getDiscount(sum){
    if(state.usingManualDiscount) {
      return state.discount;
    }

    switch(true){
      case sum >= 50000:
        return 1 - discounts[50000];
      case sum >= 10000:
        return 1 - discounts[10000];
      case sum >= 7000:
        return 1 - discounts[7000];
      case sum >= 5000:
        return 1 - discounts[5000];
      case sum >= 1000:
        return 1 - discounts[1000];
      default:
        return 1;
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <Text style={{color: 'white'}}>Frequent Orders</Text>
        <Text style={{color: 'white'}}>20 Sponges at 5USD each is 104 dollars in Texas</Text>
        <Text style={{color: 'white'}}>40 Sponges at 5USD each is 208 dollars in Texas</Text>
        <Text style={{color: 'white'}}>80 Sponges at 5USD each is 395.62 USD in Texas, 4.9% discount applied is 20.38 USD</Text>

        <View style={{marginTop: 35}}>
          <Text style={{color: 'white'}}>Price Calculator Application</Text>
          <Text id="amongUs" style={{color: 'white'}}>[]</Text>
          <div>
            <label>ITEM COUNT</label>
          <input
            type="text"
            id="message"
            name="message"
            onChange={handleAmountChange}
          />
          <br></br>
            <label>PER ITEM PRICE</label>

          <input
            type="text"
            id="ppi"
            name="ppi"
            onChange={handlePriceChange}
          />

          <br></br>
            <label>DISCOUNT RATE (IN %)</label>

          <input
            type="text"
            id="ppi"
            name="ppi"
            onChange={handleDiscountChange}
          />

          <br></br>
            <label>TAX RATE (IN %)</label>

          <input
            type="text"
            id="ppi"
            name="ppi"
            onChange={handleTaxChange}
          />
          <h2>Message: {(Math.round((Math.round(state.itemAmount * state.itemPrice * state.taxRate * 100) / 100) * getDiscount(state.itemAmount * state.itemPrice * state.taxRate)* 100) / 100)}</h2>
          </div>
        </View>
      </header>
    </div>
  );
}

export default App;
