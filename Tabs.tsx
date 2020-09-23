import React, { FunctionComponent, useState, useEffect, useContext, useRef } from 'react';

interface Props {
  initialTab: string;
  children: any;
  style?: any;
  onTabChange?: CallableFunction;
}

type TabContextProps = {
  activeTab: string;
  setActiveTab: CallableFunction;
  onTabChange?: CallableFunction;
};

type TabListContextProps = {
  focusedTabIndex: number;
  tabListLength: number;
  setFocusedTabIndex: CallableFunction;
};

const LEFT_ARROW_CODE = 37;
const RIGHT_ARROW_CODE = 39;

export const TabContext = React.createContext<TabContextProps>({} as TabContextProps);
export const TabListContext = React.createContext<TabListContextProps>({
  focusedTabIndex: 0,
  tabListLength: 0,
  setFocusedTabIndex: () => {},
} as TabListContextProps);

/* 
 * TABS - Main Component
 * 
 */
export const Tabs: FunctionComponent<Props> = props => {
  const { initialTab, children, onTabChange, ...restProps } = props;
  const [activeTab, setActiveTab] = useState(initialTab);
  const tabProviderValue = { activeTab, setActiveTab, onTabChange };

  useEffect(() => {
    console.log('initialTab: ', initialTab);
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <TabContext.Provider value={tabProviderValue}>
      <div {...restProps}>{children}</div>
    </TabContext.Provider>
  );
};

/* 
 * TABLIST 
 * 
 */

export const TabList: FunctionComponent<Props> = props => {
  const { children, ...restProps } = props;
  const tabListRef = useRef<any>(null);
  const [focusedTabIndex, setFocusedTabIndex] = useState(-1);
  const tabListLength = React.Children.count(children);

  const tabListProviderValue = { tabListLength, focusedTabIndex, setFocusedTabIndex };

  //set focus
  useEffect(() => {
    console.log('focusedTabIndex: ', focusedTabIndex);
    if (focusedTabIndex >= 0) {
      tabListRef.current?.querySelectorAll('[role=tab]')[focusedTabIndex]?.focus();
    }
  }, [focusedTabIndex]);

  return (
    <ul ref={tabListRef} role="tablist" {...restProps}>
      <TabListContext.Provider value={tabListProviderValue}>{children}</TabListContext.Provider>
    </ul>
  );
};


/* 
 * TAB
 * 
 */
interface TabProps {
  children: React.ReactNode;
  isActive?: boolean;
  tabCode: string;
}

const Tab: FunctionComponent<TabProps> = props => {
  const { children, isActive, tabCode, ...restProps } = props;
  const tabContext = useContext(TabContext);
  const tabListContext = useContext(TabListContext);

  const tabIsSelected = tabContext.activeTab === tabCode;

  const handleClick = () => {
    tabContext.setActiveTab(tabCode);

    if (tabContext.onTabChange) {
      tabContext.onTabChange(tabCode);
    }
  };

  useEffect(() => {
    console.log(tabCode);
    console.log('tab.tsx - useEffect');
    tabListContext.setFocusedTabIndex((tabListContext.focusedTabIndex = tabListContext.focusedTabIndex + 1));
    console.log(tabListContext.focusedTabIndex);
  }, [tabCode]);

  const handleKeyDown = event => {
    const lastTabIndex = tabListContext.tabListLength - 1;
    if (tabListContext.focusedTabIndex < 0) {
      tabListContext.focusedTabIndex = 0;
    }

    // left arrow (wrap to last tab if the user hits left arrow on the first tab)
    if (event.keyCode === LEFT_ARROW_CODE) {
      tabListContext.setFocusedTabIndex(
        tabListContext.focusedTabIndex === 0 ? lastTabIndex : tabListContext.focusedTabIndex - 1,
      );
    }
    // right arrow (wrap to first tab if the user hits right arrow on the last tab)
    if (event.keyCode === RIGHT_ARROW_CODE) {
      tabListContext.setFocusedTabIndex(
        tabListContext.focusedTabIndex < lastTabIndex ? tabListContext.focusedTabIndex + 1 : 0,
      );
    }
  };

  return (
    <li role="presentation">
      <button
        id={'tab-' + tabCode}
        role="tab"
        aria-selected={tabIsSelected}
        isActive={tabIsSelected}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...restProps}
      >
        {children}
      </button>
    </li>
  );
};

/* 
 * TABPANELS 
 * 
 */
interface TabPanelsProps {
  children: React.ReactNode;
}
const TabPanels: FunctionComponent<TabPanelsProps> = ({ children }) => {
  return children;
};


/* 
 * TABPANEL
 * 
 */
interface TabPanelProps {
  tabCode: string;
  children: React.ReactNode;
}

const TabPanel: FunctionComponent<TabPanelProps> = props => {
  const { children, tabCode, ...restProps } = props;
  const tabContext = useContext(TabContext);

  return (
    tabContext.activeTab === tabCode && (
      <div role="tabpanel" {...restProps}>
        {children}
      </div>
    )
  );
};




