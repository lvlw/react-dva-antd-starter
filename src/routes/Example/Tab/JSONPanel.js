import React from 'react';
import { NATIVE_USERS } from '../../../utils/constants';
import { getJsonReactNode } from '../../../utils';

export default class JSONPanel extends React.Component {
  render() {
    const userData = localStorage.getItem(NATIVE_USERS);
    return (
      getJsonReactNode(JSON.parse(userData).slice(0, 10))
    );
  }
}
