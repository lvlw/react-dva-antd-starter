import React, { PureComponent } from 'react';

export default class PageContent extends PureComponent {
  render() {
    const { title, children } = this.props;
    return (
      <div>
        <h2>{title}</h2>
        <div>{children}</div>
      </div>
    );
  }
}
