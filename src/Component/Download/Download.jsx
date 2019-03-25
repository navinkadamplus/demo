import React, { Component } from 'react';

export default class Download extends Component {
  onDownloadImage = e => {
    let a = document.createElement('a');
    a.href = this.canvas.toDataURL({
      format: 'png',
      quality: 0.8
    });
    a.download = 'custom.png';
    a.click();
    console.log(this.canvas);
  };
  render() {
    return (
      <div>
        <button onClick={this.onDownloadImage}>download Image</button>
      </div>
    );
  }
}
