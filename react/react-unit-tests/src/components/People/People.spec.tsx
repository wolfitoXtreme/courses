import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

// const mockStore = configureMockStore([thunk]);
/*
  - Test do not run in browser, instead run using 'Node' using a test runner like 'Jets'.
  - In React components are emulated with test utilities like 'React Test Utils' but
    in this case with 'Enzyme' to allow traversing the DOM.
*/
import {
  configure,
  shallow,
  ShallowWrapper,
  mount,
  ReactWrapper,
} from 'enzyme'; // Enzyme
// confugure: To configure Enzyme with React
// shallow: renders component without deeply rendering
import Adapter from 'enzyme-adapter-react-16'; // Enzyme dependency, connects React with Enzyme
import People from './People';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() }); // Configures Enzyme adapter

// test description 'test suit'
describe('<People>', () => {
  let wrapper: ReactWrapper<
    any,
    React.Component<{
      people: { id: number; value: { name: string; age: number | string } }[];
    }>
  >;

  const store = mockStore({
    people: [{ id: 1234, value: { name: 'John Doe', age: '35' } }],
  });

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <People />
      </Provider>
    );
  });

  it('<People /> should have 1 elements', () => {
    expect(wrapper.find('li').text()).toContain('John Doe');
  });
});
