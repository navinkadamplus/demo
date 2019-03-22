import "./DragDrop.css";
import { fabric } from "fabric";

import React, { Component } from "react";

import Images from "../Image/Images";
import FontFamily from "../FontFamily/FontsFamily";
import Input from "../Input/Input";
import TextAlign from "../TextAlign/TextAlign";

export default class DragDrop extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas = "";
  }

  state = {
    selectedImg: "",
    selectedColor: "#000000",
    selectedBackGroundColor: "#77a05f",
    selectedFontFamily: "Helvetica Neue",
    fontSize: 30,
    copyPasteVisibility: false,
    textVisibility: false,
    selectedTextAlign: "",
    fontFamilys: [
      "arial",
      "optima",
      "hoefler text",
      "plaster",
      "engagement",
      "VT323",
      "Helvetica Neue",
      "myriad pro",
      "comic sans ms",
      "delicious",
      "verdana",
      "georgia",
      "courier",
      "impact",
      "monaco"
    ],
    textAligns: ["left", "right", "center", "justify"],
    imgSrc: [
      "1.jpg",
      "2.jpg",
      "3.jpg",
      "4.jpg",
      "5.png",
      "6.jpg",
      "7.jpg",
      "8.jpg",
      "9.jpg",
      "10.png",
      "11.jpg",
      "12.jpg",
      "13.jpg",
      "14.jpg"
    ],
    cloneObject: ""
  };

  onDragStart = event => {
    this.setState({ selectedImg: event.target });
  };

  drawImage = () => {
    fabric.Image.fromURL(
      this.state.selectedImg.src,
      img => {
        img
          .set({
            left: 0,
            top: 0,
            border: "#000",
            stroke: "#F0F0F0",
            strokeWidth: 5
          })
          .scale(0.2);
        this.canvas.add(img).renderAll();
      },
      {
        cornerStyle: "circle",
        borderColor: "#53c5bf",
        cornerColor: "#acdab5b8",
        cornerSize: 10
      }
    );
    this.customsControl();
  };

  drawText = () => {
    let text = new fabric.Textbox("type text", {
      left: 50,
      top: 20,
      width: 200,
      height: 200,
      fontFamily: "helvetica neue",
      fill: this.state.selectedColor,
      stroke: "#fff",
      fontSize: 30,
      strokeWidth: 0.1
    });
    this.canvas.add(text);

    this.customsControl();
  };

  onDownloadImage = e => {
    let a = document.createElement("a");
    a.href = this.canvas.toDataURL({
      format: "png",
      quality: 0.8
    });
    a.download = "custom.png";
    a.click();
    console.log(this.canvas);
  };

  onChangeFontFamily = e => {
    if (this.canvas.getActiveObject()) {
      this.setState({ selectedFontFamily: e.target.value }, function() {
        this.canvas
          .getActiveObject()
          .set("fontFamily", this.state.selectedFontFamily);
        this.canvas.renderAll();
      });
    } else {
      return alert("select Text");
    }
  };

  onChangeTextAlign = e => {
    if (this.canvas.getActiveObject()) {
      this.setState({ selectedTextAlign: e.target.value }, function() {
        this.canvas
          .getActiveObject()
          .set("textAlign", this.state.selectedTextAlign);
        this.canvas.renderAll();
      });
    } else {
      return alert("select Text");
    }
  };

  onRemoveElement = key => {
    this.canvas.remove(this.canvas.getActiveObject());
  };

  onChangeColor = e => {
    if (this.canvas.getActiveObject()) {
      this.setState({ selectedColor: e.target.value }, () => {
        this.canvas.getActiveObject().set("fill", this.state.selectedColor);
        this.canvas.renderAll();
      });
    } else {
      return alert("select Text");
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
        this.setState({ fontSize: e.target.value }, () => {
          this.canvas.getActiveObject().set("fontSize", this.state.fontSize);
          this.canvas.renderAll();
        });
      } else {
        return alert("select Text");
      }
    }
  };

  onGroup = e => {
    if (
      !this.canvas.getActiveObject() ||
      this.canvas.getActiveObject().type !== "activeSelection"
    ) {
      return "";
    }
    this.canvas.getActiveObject().toGroup();
    this.canvas.renderAll();
  };

  onUnGroup = e => {
    if (!this.canvas.getActiveObject()) {
      return;
    }
    if (this.canvas.getActiveObject().type !== "group") {
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
    if (this.canvas.getActiveObject() === undefined) {
      return "";
    }
    this.canvas.getActiveObject().clone(cloned => {
      this.setState({ cloneObject: cloned });
    });
  };

  onPaste = e => {
    let _cloneObject = this.state.cloneObject;
    if (
      _cloneObject === "" ||
      _cloneObject === null ||
      _cloneObject === undefined
    ) {
      return "";
    }
    _cloneObject.clone(clonedObj => {
      this.canvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true
      });
      if (clonedObj.type === "activeSelection") {
        clonedObj.canvas = this.canvas;
        clonedObj.forEachObject(function(obj) {
          this.canvas.add(obj);
        });
        clonedObj.setCoords();
        alert("activeSelection");
      } else {
        this.canvas.add(clonedObj);
      }
      _cloneObject.top += 10;
      _cloneObject.left += 10;
      this.canvas.setActiveObject(clonedObj);
      this.canvas.requestRenderAll();
    });
    this.customsControl();
  };

  customsControl = e => {
    this.canvas.forEachObject(function(o) {
      o.set({
        borderColor: "#53c5bf",
        cornerColor: "#acdab5b8",
        cornerSize: 10,
        cornerStyle: "circle",
        transparentCorners: true
      });
    });
  };

  selectedObjectBackward = e => {
    if (!this.canvas.getActiveObject()) return "";
    this.canvas.sendToBack(this.canvas.getActiveObject());
    this.canvas.renderAll();
  };

  selectedObjectForward = e => {
    if (!this.canvas.getActiveObject()) return "";
    this.canvas.bringForward(this.canvas.getActiveObject());
    this.canvas.renderAll();
  };

  componentDidMount() {
    this.canvas = new fabric.Canvas(this.canvasRef.current, {
      preserveObjectStacking: true
    });

    this.canvas.on("drop", this.drawImage);

    this.canvas.on("object:selected", e => {
      this.setState({ copyPasteVisibility: true });
    });

    // visibility show Text Entered
    this.canvas.on("text:editing:entered", e => {
      this.setState({ textVisibility: true });
    });
    // visibility hidden Text Entered
    this.canvas.on("text:editing:exited", e => {
      this.setState({ textVisibility: false });
    });

    document.addEventListener("keydown", key => {
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
    this.canvas.off("drop");
    document.removeEventListener("keypress");
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
                    display: "flex",
                    justifyContent: "space-evenly",
                    padding: "20px"
                  }}
                >
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
                  <div style={{ display: "flex" }}>
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
                  <div style={{ display: "flex" }}>
                    <div>
                      <button onClick={this.onGroup}>Group</button>
                    </div>
                    <div>
                      <button onClick={this.onUnGroup}>UnGroup</button>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
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
                        }
                      >
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
                      display: "flex"
                    }}
                    className={
                      !this.state.copyPasteVisibility ? "visibility" : ""
                    }
                  >
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
                    display: "flex",
                    justifyContent: "space-evenly",
                    padding: "20px"
                  }}
                  className={!this.state.textVisibility ? "visibility" : ""}
                >
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
//Crop images
