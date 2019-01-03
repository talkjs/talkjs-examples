import * as React from 'react';

import './styles.css';

class Error404Page extends React.Component {
    
  public render() {
    return (
      <div className="Error404">
        <div className="content">
          <h1>
            404
          </h1>
          <div>
            <p>This page isn't here.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Error404Page;
