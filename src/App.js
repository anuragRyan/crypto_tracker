import React, { Component } from 'react'
import Card from './Components/Card';
import ChartSection from './Components/ChartSection';
import Header from './Components/Header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      id : 'bitcoin',
      data: {}
    }
  }

  fetchData = async() => {
    let data = await fetch('https://api.coingecko.com/api/v3/coins/' + this.state.id);
    let jsonData = await data.json();
    this.setState({id: this.state.id, data: jsonData});
  }

  handle_submit = async (event) => {
    await this.setState({id: event.target.value, data: this.state.data});
    this.fetchData();
  }

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(() => this.fetchData(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <Header handleSubmit = {this.handle_submit}/>

        <Card coinName = {this.state.data.name} currentPrice={this.state.data.market_data ? this.state.data.market_data.current_price.inr : ''}
          marketSentiment = {this.state.data.sentiment_votes_down_percentage}
          mCap24={this.state.data.market_data ? this.state.data.market_data.market_cap_change_percentage_24h : ''}
          ath={this.state.data.market_data ? this.state.data.market_data.ath.inr : ''} atl={this.state.data.market_data ? this.state.data.market_data.atl.inr : ''}
          high24={this.state.data.market_data ? this.state.data.market_data.high_24h.inr : ''} low24={this.state.data.market_data ? this.state.data.market_data.low_24h['inr'] : ''}/>
        
        <ChartSection id = {this.state.id} marketCap = {this.state.data.market_data ? this.state.data.market_data.market_cap.inr : ""}
          priceChange24 = {this.state.data.market_data ? this.state.data.market_data.price_change_24h_in_currency.inr : ""}
          totalVol = {this.state.data.market_data ? this.state.data.market_data.total_volume.inr : ""}
          circulating = {this.state.data.market_data ? this.state.data.market_data["circulating_supply"] : ""}
          priceChange24h = {this.state.data.market_data ? this.state.data.market_data.price_change_24h_in_currency.inr.toFixed(2) : ""}/>
      </div>
    )
  }
}
