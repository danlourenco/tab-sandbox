import React, { Component, useRef } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "./Tabs";
interface AppProps {}
interface AppState {
  name: string;
}

const App = () => {
const tabsRef = useRef();

const handlePrevious = () => tabsRef.current.previous();

const handleNext = () => tabsRef.current.next();


return (
      <div>
        <Tabs initialTab="one" ref={tabsRef}>
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
        <button onClick={handlePrevious}>Previous</button>|<button onClick={handleNext} >Next</button>
      </div>
    );
}


render(<App />, document.getElementById("root"));
