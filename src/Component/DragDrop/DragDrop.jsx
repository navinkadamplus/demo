import './DragDrop.css';
import { fabric } from 'fabric';

import React, { Component } from 'react';

import Images from '../Image/Images';
import FontFamily from '../Fonts/FontFamily/FontsFamily';
import Input from '../Input/Input';
import TextAlign from '../Fonts/TextAlign/TextAlign';
import DrawText from '../DrawText/DrawText';

import { connect } from 'react-redux';

class DragDrop extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas = '';
    fabric.Object.prototype.set({
      borderColor: '#53c5bf',
      cornerColor: '#acdab5b8',
      cornerSize: 10,
      padding: 1,
      hasBorders: false,
      rotatingPointOffset: 20,
      cornerStyle: 'circle'
      // transparentCorners: true
    });
  }

  state = {
    selectedImg: '',
    selectedColor: '#000000',
    lineHeight: 1.16,
    transparent: 100,
    letterSpacing: 10,
    selectedBackGroundColor: '#77a05f',
    selectedFontFamily: 'Helvetica Neue',
    fontSize: 30,
    copyPasteVisibility: false,
    textVisibility: false,
    selectedTextAlign: '',
    fontFamilys: [
      'arial',
      'optima',
      'hoefler text',
      'plaster',
      'engagement',
      'VT323',
      'Helvetica Neue',
      'myriad pro',
      'comic sans ms',
      'delicious',
      'verdana',
      'georgia',
      'courier',
      'impact',
      'monaco'
    ],
    textAligns: ['left', 'right', 'center', 'justify'],
    imgSrc: [
      '1.jpg',
      '2.jpg',
      '3.jpg',
      '4.jpg',
      '5.png',
      '6.jpg',
      '7.jpg',
      '8.jpg',
      '9.jpg',
      '10.png',
      '11.jpg',
      '12.jpg',
      '13.jpg',
      '14.jpg'
    ],
    cloneObject: ''
  };

  onDragStart = event => {
    this.setState({ selectedImg: event.target });
  };

  drawImage = () => {
    fabric.Image.fromURL(this.state.selectedImg.src, img => {
      img.set({
        left: 0,
        top: 0

        // border: "#000",
        // stroke: "#F0F0F0",
        // strokeWidth: 5
      });
      img.scaleToHeight(500);
      img.scaleToWidth(500);
      this.canvas.add(img).renderAll();
    });
  };

  drawText = () => {
    let text = new fabric.Textbox('type text', {
      left: 50,
      top: 20,
      width: 80,
      height: 200,
      fontFamily: 'helvetica neue',
      fill: 'black',
      stroke: '#fff',
      fontSize: (30 * 72) / 96,
      strokeWidth: 0
    });

    text.setControlsVisibility({
      mt: false,
      mb: false
    });
    this.canvas.add(text);
  };

  onDownloadImage = e => {
    let a = document.createElement('a');
    a.href = this.canvas.toDataURL({
      format: 'png',
      quality: 1.0,
      multiplier: 1.0
    });
    a.download = 'custom.png';
    a.click();
  };

  onChangeFontFamily = e => {
    if (this.canvas.getActiveObject()) {
      this.setState({ selectedFontFamily: e.target.value });
      this.canvas.getActiveObject().set('fontFamily', e.target.value);
      this.canvas.renderAll();
    } else {
      return alert('select Text');
    }
  };

  onChangeTextAlign = e => {
    if (this.canvas.getActiveObject()) {
      this.setState({ selectedTextAlign: e.target.value });
      this.canvas.getActiveObject().set('textAlign', e.target.value);
      this.canvas.renderAll();
    } else {
      return alert('select Text');
    }
  };

  onRemoveElement = key => {
    this.canvas.remove(this.canvas.getActiveObject());
  };

  onChangeColor = e => {
    if (this.canvas.getActiveObject()) {
      this.setState({ selectedColor: e.target.value });
      this.canvas.getActiveObject().set('fill', e.target.value);
      this.canvas.renderAll();
    } else {
      return alert('select Text');
    }
  };

  onChangeBackGroundColor = e => {
    this.setState({ selectedBackGroundColor: e.target.value }, () => {
      this.canvas.setBackgroundColor(this.state.selectedBackGroundColor, () => {
        this.canvas.renderAll();
      });
    });
  };

  onChangeFontSize = e => {
    if (/^\d*$/.test(e.target.value)) {
      if (this.canvas.getActiveObject()) {
        this.setState({ fontSize: e.target.value });
        this.canvas
          .getActiveObject()
          .set('fontSize', (e.target.value * 72) / 96);
        this.canvas.renderAll();
      } else {
        return alert('select Text');
      }
    }
  };

  onChangeLineHeight = e => {
    if (this.canvas.getActiveObject()) {
      this.setState({ lineHeight: e.target.value });
      this.canvas.getActiveObject().set('lineHeight', e.target.value);
      this.canvas.renderAll();
    } else {
      return alert('select Text');
    }
  };

  onChangeLetterSpacing = e => {
    if (this.canvas.getActiveObject()) {
      this.setState({ letterSpacing: e.target.value });
      this.canvas.getActiveObject().set('charSpacing', e.target.value);
      this.canvas.renderAll();
    } else {
      return alert('select Text');
    }
  };
  onChangeTransparent = e => {
    if (this.canvas.getActiveObject()) {
      this.setState({ transparent: e.target.value });
      this.canvas
        .getActiveObject()
        .set('opacity', String(e.target.value * 0.01).substr(0, 4));
      this.canvas.renderAll();
    } else {
      return alert('select object');
    }
  };

  onGroup = e => {
    if (
      !this.canvas.getActiveObject() ||
      this.canvas.getActiveObject().type !== 'activeSelection'
    ) {
      return '';
    }
    this.canvas.getActiveObject().toGroup();
    this.canvas.renderAll();
  };

  onUnGroup = e => {
    if (!this.canvas.getActiveObject()) {
      return;
    }
    if (this.canvas.getActiveObject().type !== 'group') {
      return;
    }
    this.canvas.getActiveObject().toActiveSelection();
    this.canvas.renderAll();
  };

  onMultipleSelection = e => {
    this.canvas.discardActiveObject();
    var sel = new fabric.ActiveSelection(this.canvas.getObjects(), {
      canvas: this.canvas
    });
    this.canvas.setActiveObject(sel);
    this.canvas.renderAll();
  };

  onCopy = e => {
    if (
      this.canvas.getActiveObject() === undefined ||
      this.canvas.getActiveObject() === null
    ) {
      return '';
    }
    this.canvas.getActiveObject().clone(cloned => {
      this.setState({ cloneObject: cloned });
    });
  };

  onPaste = e => {
    let _cloneObject = this.state.cloneObject;
    if (
      _cloneObject === '' ||
      _cloneObject === null ||
      _cloneObject === undefined
    ) {
      return '';
    }
    _cloneObject.clone(clonedObj => {
      this.canvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true
      });
      if (clonedObj.type === 'activeSelection') {
        clonedObj.canvas = this.canvas;
        clonedObj.forEachObject(function(obj) {
          this.canvas.add(obj);
        });
        clonedObj.setCoords();
        alert('activeSelection');
      } else {
        this.canvas.add(clonedObj);
      }
      _cloneObject.top += 10;
      _cloneObject.left += 10;
      this.canvas.setActiveObject(clonedObj);
      this.canvas.requestRenderAll();
    });
  };

  selectedObjectBackward = e => {
    if (!this.canvas.getActiveObject()) return '';
    this.canvas.sendToBack(this.canvas.getActiveObject());
    this.canvas.renderAll();
  };

  selectedObjectForward = e => {
    if (!this.canvas.getActiveObject()) return '';
    this.canvas.bringForward(this.canvas.getActiveObject());
    this.canvas.renderAll();
  };

  onClickBold = e => {
    if (this.canvas.getActiveObject().fontWeight === 'normal') {
      this.canvas.getActiveObject().set('fontWeight', 'bold');
      this.canvas.renderAll();
    } else if (this.canvas.getActiveObject().fontWeight === 'bold') {
      this.canvas.getActiveObject().set('fontWeight', 'normal');
      this.canvas.renderAll();
    }
  };
  onClickUnderLine = e => {
    if (!this.canvas.getActiveObject().underline) {
      this.canvas.getActiveObject().set('underline', true);
      this.canvas.renderAll();
    } else {
      this.canvas.getActiveObject().set('underline', false);
      this.canvas.renderAll();
    }
  };

  componentDidMount() {
    this.canvas = new fabric.Canvas(this.canvasRef.current, {
      preserveObjectStacking: true,
      uniScaleTransform: true
    });

    this.canvas.on('drop', this.drawImage);

    // visibility show Text Entered
    this.canvas.on('text:editing:entered', e => {
      this.setState({ textVisibility: true });
    });

    // visibility hidden Text Entered
    this.canvas.on('text:editing:exited', e => {
      this.setState({ textVisibility: false });
    });

    // visibility show copy
    this.canvas.on('object:selected', e => {
      this.setState({ copyPasteVisibility: true });
    });
    // visibility hidden copy
    this.canvas.on('selection:cleared', e => {
      this.setState({ copyPasteVisibility: false });
    });

    document.addEventListener('keydown', key => {
      if (this.canvas.getActiveObject()) {
        if (key.shiftKey && key.keyCode === 68)
          // 46 delete 68 D key.keyCode === 46 ||
          //selected Object Delete
          this.onRemoveElement();
        if ((key.ctrlKey || key.keyCode === 17) && key.keyCode === 86)
          // 17 ctrl 86 V
          //selected Object Paste
          this.onPaste();
        if ((key.ctrlKey || key.keyCode === 17) && key.keyCode === 67)
          // 17 ctrl 86 C
          //selected Object Copy
          this.onCopy();
      }
    });
  }

  componentWillUnmount() {
    this.canvas.off('drop');
    document.removeEventListener('keypress');
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="left">
            {this.state.imgSrc.map((src, ind) => (
              <Images src={src} key={ind} onDragStart={this.onDragStart} />
            ))}
          </div>

          <div className="right">
            <div>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    padding: '20px'
                  }}>
                  <Input
                    id="backGroundColor"
                    type="color"
                    value={this.state.selectedBackGroundColor}
                    onChange={this.onChangeBackGroundColor}
                    displayText="Background Color"
                  />
                  <div>
                    <button onClick={this.drawText}>Add Text</button>
                  </div>

                  <div style={{ display: 'flex' }}>
                    <div>
                      <button onClick={this.onGroup}>Group</button>
                    </div>
                    <div>
                      <button onClick={this.onUnGroup}>UnGroup</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div>
                      <button onClick={this.onMultipleSelection}>
                        Multiple Selection
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={e =>
                          this.canvas.discardActiveObject() &&
                          this.canvas.requestRenderAll()
                        }>
                        Deselect
                      </button>
                    </div>
                  </div>
                  <div>
                    <button onClick={this.onDownloadImage}>
                      download Image
                    </button>
                  </div>

                  <div
                    style={{
                      display: 'flex'
                    }}
                    className={
                      !this.state.copyPasteVisibility ? 'visibility' : ''
                    }>
                    <div style={{ display: 'flex' }}>
                      <div>
                        <button onClick={this.selectedObjectBackward}>
                          Backward
                        </button>
                      </div>

                      <div>
                        <button onClick={this.selectedObjectForward}>
                          forward
                        </button>
                      </div>
                    </div>
                    <Input
                      id="transparent"
                      type="range"
                      value={this.state.transparent}
                      onChange={this.onChangeTransparent}
                      displayText="Transparent"
                      rangeMin={0}
                      rangeMax={100}
                      // rangeStep={10}
                    />
                    <div>
                      <button onClick={this.onCopy}>Copy</button>
                    </div>
                    <div>
                      <button onClick={this.onPaste}>Paste</button>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    padding: '20px'
                  }}
                  className={!this.state.textVisibility ? 'visibility' : ''}>
                  <FontFamily
                    selectedFontFamily={this.state.selectedFontFamily}
                    fonts={this.state.fontFamilys}
                    onChangeFontFamily={this.onChangeFontFamily}
                  />
                  <TextAlign
                    selectedTextAlign={this.state.selectedTextAlign}
                    onChangeTextAlign={this.onChangeTextAlign}
                    aligns={this.state.textAligns}
                  />

                  <Input
                    id="fontColor"
                    type="color"
                    value={this.state.selectedColor}
                    onChange={this.onChangeColor}
                    displayText="Font Color"
                  />
                  <Input
                    id="fontSize"
                    type="text"
                    value={this.state.fontSize}
                    onChange={this.onChangeFontSize}
                    displayText="Font Size"
                  />
                  <Input
                    id="lineHeight"
                    type="range"
                    value={this.state.lineHeight}
                    onChange={this.onChangeLineHeight}
                    displayText="Line Height"
                    rangeMin={0.5}
                    rangeMax={2.5}
                    rangeStep={0.2}
                  />
                  <Input
                    id="letterSpacing"
                    type="range"
                    value={this.state.letterSpacing}
                    onChange={this.onChangeLetterSpacing}
                    displayText="Letter Spacing"
                    rangeMin={-200}
                    rangeMax={800}
                    rangeStep={1}
                  />
                  <button onClick={this.onClickBold}>B</button>
                  <button onClick={this.onClickUnderLine}>U</button>
                </div>
              </div>
              <canvas
                ref={this.canvasRef}
                height="500%"
                width="700%"
                className="canvas"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDrop);

//Crop images

// this.canvas.setBackgroundImage(
//   this.state.selectedImg.src,
//   this.canvas.renderAll.bind(this.canvas),
//   {
//     backgroundImageOpacity: 0.5,
//     backgroundImageStretch: false,
//     width: this.canvas.width,
//     height: this.canvas.height,
//     selectable: false
//   });
