import React from 'react';
/*
  - Test do not run in browser, instead run using 'Node' using a test runner like 'Jets'.
  - In React components are emulated with test utilities like 'React Test Utils' but
    in this case with 'Enzyme' to allow traversing the DOM.
*/
import { configure, shallow, ShallowWrapper } from 'enzyme'; // Enzyme
// confugure: To configure Enzyme with React
// shallow: renders component without deeply rendering
import Adapter from 'enzyme-adapter-react-16'; // Enzyme dependency, connects React with Enzyme
import List from './List';
import ListItem from '../ListItem/ListItem';
import AuthItem from '../AuthItem/AuthItem';

configure({ adapter: new Adapter() }); // Configures Enzyme adapter

// test description 'test suit'
describe('<List>', () => {
  let wrapper: ShallowWrapper<
    any,
    React.Component<{ amount?: number; authenticated?: boolean }>
  >;

  beforeEach(() => {
    wrapper = shallow(<List />);
  });

  it('should render one <ListItem /> if amount is 1', () => {
    // const wrapper = shallow(<List />); // without beforeEach
    expect(wrapper.find(ListItem)).toHaveLength(1);
  });
  it('should render three <ListItem /> if amount is 3', () => {
    // const wrapper = shallow(<List amount={3} />); // without beforeEach
    wrapper.setProps({ amount: 3 });
    expect(wrapper.find(ListItem)).toHaveLength(3);
  });
  it('should contain "Log Out" text item', () => {
    wrapper.setProps({ authenticated: true });
    expect(wrapper.contains(<AuthItem>Log Out</AuthItem>)).toEqual(true);
  });
  it('should contain "Log In" text item', () => {
    wrapper.setProps({ authenticated: false });
    expect(wrapper.contains(<AuthItem>Log In</AuthItem>)).toEqual(true);
  });
});
