import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Tweet from './Tweet';

configure({ adapter: new Adapter() });

describe('<Tweet />', () => {
  it('should render a <Tweet /> element with author name, username, and text and profile image elements', () => {
    const wrapper = shallow(<Tweet />);

    expect(wrapper.find('.author-name')).toHaveLength(1);
    expect(wrapper.find('.username')).toHaveLength(1);
    expect(wrapper.find('.creation-date')).toHaveLength(1);
    expect(wrapper.find('.tweet-text')).toHaveLength(1);
  });
});
