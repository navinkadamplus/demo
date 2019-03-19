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
    selectedFontFamily: "Helvetica Neue",
    fontSize: 10,
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
    textAligns: ["left", "right", "center", "justify"]
  };

  onDragStart = event => {
    this.setState({ selectedImg: event.target });
  };

  drawImage = () => {
    let canvasCopy = this.canvas;
    fabric.Image.fromURL(this.state.selectedImg.src, function(img) {
      img
        .set({
          left: 0,
          top: 0,
          border: "#000",
          stroke: "#F0F0F0",
          strokeWidth: 30
        })
        .scale(0.2);
      canvasCopy.add(img).renderAll();
    });
  };

  drawText = () => {
    let text = new fabric.Textbox("type text", {
      left: 50,
      top: 20,
      fontFamily: "helvetica neue",
      fill: this.state.selectedColor,
      stroke: "#fff",
      strokeWidth: 0.1
    });
    this.canvas.add(text);
  };

  onDownloadImage = e => {
    let a = document.createElement("a");
    a.href = this.canvas.toDataURL({
      format: "png",
      quality: 0.8
    });
    a.download = "custom.png";
    a.click();
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
    console.log();
    if (this.canvas.getActiveObject()) {
      if (key.keyCode === 127 || (key.shiftKey && key.keyCode === 68)) {
        alert("Delete Element ");
        this.canvas.remove(this.canvas.getActiveObject());
      }
    } else {
      alert("not selected ");
    }
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

  componentDidMount() {
    this.canvas = new fabric.Canvas(this.canvasRef.current);
    this.canvas.on("drop", this.drawImage);
    document.addEventListener("keypress", this.onRemoveElement);
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
            <Images src="1.jpg" onDragStart={this.onDragStart} />
            <Images src="2.jpg" onDragStart={this.onDragStart} />
            <Images src="3.jpg" onDragStart={this.onDragStart} />
            <Images src="4.jpg" onDragStart={this.onDragStart} />
            <Images src="5.png" onDragStart={this.onDragStart} />
            <Images src="6.jpg" onDragStart={this.onDragStart} />
            <Images src="7.jpg" onDragStart={this.onDragStart} />
            <Images src="8.jpg" onDragStart={this.onDragStart} />
          </div>

          <div className="right">
            <div>
              <div
                style={{
                  marginLeft: "135px",
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <div>
                  <button onClick={this.drawText}>Add Text</button>
                </div>
                <div>
                  <button onClick={this.onDownloadImage}>download Image</button>
                </div>
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
                  onChangeFontSize={this.onChangeColor}
                  displayText="Font Color"
                />
                <Input
                  id="fontSize"
                  type="text"
                  value={this.state.fontSize}
                  onChangeFontSize={this.onChangeFontSize}
                  displayText="Font Size"
                />
              </div>
              <canvas
                ref={this.canvasRef}
                height="500px"
                width="700px"
                className="canvas"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
