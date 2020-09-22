import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Tweets from './Tweets';
import Tweet from '../Tweet/Tweet';

configure({ adapter: new Adapter() });

describe('<Tweets />', () => {
  it('should display no tweets if there are no tweets from api', () => {
    const wrapper = shallow(<Tweets />);
    wrapper.setProps({ tweets: [] });

    expect(wrapper.find('.no-tweets')).toHaveLength(1);
  });

  it('should display a tweet for an api result containing one tweet', () => {
    const wrapper = shallow(<Tweets tweets={[{ id: '1' }]} />);

    expect(wrapper.find(Tweet)).toHaveLength(1);
  });

  it('should parse the date received from api and display month and day', () => {
    const date_to_parse = '2020-09-22T07:43:03.000Z';
    const wrapper = mount(<Tweets tweets={[{ id: '1', creationDate: date_to_parse }]} />);

    const expected_date = 'Sep 22';
    expect(wrapper.contains(<span className='creation-date'>{expected_date}</span>)).toEqual(true);
  });

  it('should display pagination buttons', () => {
    const wrapper = mount(<Tweets tweets={[{ id: '1' }]} />);

    expect(wrapper.find('.pagination-button')).toHaveLength(2);
  });
});
