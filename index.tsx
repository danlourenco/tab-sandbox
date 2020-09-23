import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from './Tabs';
interface AppProps { }
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Start editing to see some magic happen :)
        </p>
        <Tabs initialTab="one">
      <TabList>
        <Tab tabCode="one">One</Tab>
        <Tab tabCode="two">Two</Tab>
        <Tab tabCode="three">Three</Tab>
      </TabList>
      <TabPanels>
        <TabPanel tabCode="one">Pane 1</TabPanel>
        <TabPanel tabCode="two">Pane 2</TabPanel>
        <TabPanel tabCode="three">Pane 3</TabPanel>
      </TabPanels>
    </Tabs>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
