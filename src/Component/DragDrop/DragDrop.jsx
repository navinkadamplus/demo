import "./DragDrop.css";
import { fabric } from "fabric";
import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { getImageSrc } from "../../actions/FetchImages/FetchImage";
import { getFontsList } from "../../actions/FetchFontFamily/FetchFontFamily";

import {
  DrawText,
  Images,
  FontFamily,
  Input,
  TextAlign,
  Download,
  Group,
  Ungroup,
  MultipleSelection,
  Backward,
  Forward,
  RangeBarReact,
  ButtonReact
} from "../Import/ImportModules";

fabric.Object.prototype.set({
  borderColor: "#53c5bf",
  cornerColor: "#acdab5b8",
  cornerSize: 10,
  padding: 1,
  hasBorders: true,
  rotatingPointOffset: 20,
  cornerStyle: "circle"
  // transparentCorners: true
});

class DragDrop extends PureComponent {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  state = {
    canvas: "",
    selectedImg: "",
    selectedColor: "#000000",
    selectedBackGroundColor: "#77a05f",
    selectedFontFamily: "Helvetica Neue",
    fontSize: 30,
    copyPasteVisibility: false,
    textVisibility: false,
    selectedTextAlign: "",
    fontFamilys: [],
    textAligns: ["left", "right", "center", "justify"],
    imgSrc: [],
    cloneObject: ""
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
      this.state.canvas.add(img).renderAll();
    });
  };

  onChangeFontFamily = e => {
    if (this.state.canvas.getActiveObject()) {
      this.setState({ selectedFontFamily: e.target.value });
      this.state.canvas.getActiveObject().set("fontFamily", e.target.value);
      this.state.canvas.renderAll();
    } else {
      return alert("select Text");
    }
  };

  onChangeTextAlign = e => {
    if (this.state.canvas.getActiveObject()) {
      this.setState({ selectedTextAlign: e.target.value });
      this.state.canvas.getActiveObject().set("textAlign", e.target.value);
      this.state.canvas.renderAll();
    } else {
      return alert("select Text");
    }
  };

  onRemoveElement = key => {
    this.state.canvas.remove(this.state.canvas.getActiveObject());
  };

  onChangeColor = e => {
    if (this.state.canvas.getActiveObject()) {
      this.setState({ selectedColor: e.target.value });
      this.state.canvas.getActiveObject().set("fill", e.target.value);
      this.state.canvas.renderAll();
    } else {
      return alert("select Text");
    }
  };

  onChangeBackGroundColor = e => {
    this.setState({ selectedBackGroundColor: e.target.value }, () => {
      this.state.canvas.setBackgroundColor(
        this.state.selectedBackGroundColor,
        () => {
          this.state.canvas.renderAll();
        }
      );
    });
  };

  onChangeFontSize = e => {
    if (/^\d*$/.test(e.target.value)) {
      if (this.state.canvas.getActiveObject()) {
        this.setState({ fontSize: e.target.value });
        this.state.canvas
          .getActiveObject()
          .set("fontSize", (e.target.value * 72) / 96);
        this.state.canvas.renderAll();
      } else {
        return alert("select Text");
      }
    }
  };

  onCopy = e => {
    if (
      this.state.canvas.getActiveObject() === undefined ||
      this.state.canvas.getActiveObject() === null
    ) {
      return "";
    }
    this.state.canvas.getActiveObject().clone(cloned => {
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
      this.state.canvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true
      });
      if (clonedObj.type === "activeSelection") {
        clonedObj.canvas = this.state.canvas;
        clonedObj.forEachObject(function(obj) {
          this.state.canvas.add(obj);
        });
        clonedObj.setCoords();
        alert("activeSelection");
      } else {
        this.state.canvas.add(clonedObj);
      }
      _cloneObject.top += 10;
      _cloneObject.left += 10;
      this.state.canvas.setActiveObject(clonedObj);
      this.state.canvas.requestRenderAll();
    });
  };

  componentDidMount() {
    let canvas = new fabric.Canvas(this.canvasRef.current, {
      preserveObjectStacking: true,
      uniScaleTransform: true
    });
    this.setState({ canvas: canvas });

    canvas.on("drop", this.drawImage);

    // visibility show Text Entered
    canvas.on("text:editing:entered", e => {
      this.setState({ textVisibility: true });
    });

    // visibility hidden Text Entered
    canvas.on("text:editing:exited", e => {
      this.setState({ textVisibility: false });
    });

    // visibility show copy
    canvas.on("object:selected", e => {
      this.setState({ copyPasteVisibility: true });
    });
    // visibility hidden copy
    canvas.on("selection:cleared", e => {
      this.setState({ copyPasteVisibility: false });
    });

    document.addEventListener("keydown", key => {
      if (canvas.getActiveObject()) {
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
    this.props.onGetImageSrc();
    this.props.onGetFontsList();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.imgSrcData.readyState === 4) {
      return { imgSrc: nextProps.imgSrcData.imgSrcList };
    } else if (nextProps.fontListData.readyState === 4) {
      return { fontFamilys: nextProps.fontListData.fontList };
    } else return null;
  }

  componentWillUnmount() {
    this.state.canvas.off("drop");
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
                  <DrawText canvas={this.state.canvas} />
                  <div style={{ display: "flex" }}>
                    <MultipleSelection canvas={this.state.canvas} />
                    <div>
                      <button
                        onClick={e =>
                          this.state.canvas.discardActiveObject() &&
                          this.state.canvas.requestRenderAll()
                        }
                      >
                        Deselect
                      </button>
                    </div>
                  </div>
                  <Download canvas={this.state.canvas} />
                  <div
                    style={{
                      display: "flex"
                    }}
                    className={
                      !this.state.copyPasteVisibility ? "visibility" : ""
                    }
                  >
                    <div style={{ display: "flex" }}>
                      <Group canvas={this.state.canvas} />
                      <Ungroup canvas={this.state.canvas} />
                    </div>
                    <div style={{ display: "flex" }}>
                      <Backward canvas={this.state.canvas} />
                      <Forward canvas={this.state.canvas} />
                    </div>
                    <RangeBarReact
                      canvas={this.state.canvas}
                      id="transparent"
                      displayText="Transparent"
                      rangeMin={0}
                      rangeMax={100}
                      rangeStep={10}
                      value={100}
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

                  <RangeBarReact
                    canvas={this.state.canvas}
                    id="lineHeight"
                    displayText="Line Height"
                    rangeMin={0.5}
                    rangeMax={2.5}
                    rangeStep={0.2}
                    value={1.16}
                  />

                  <RangeBarReact
                    canvas={this.state.canvas}
                    id="letterSpacing"
                    displayText="Letter Spacing"
                    rangeMin={-200}
                    rangeMax={800}
                    rangeStep={1}
                    value={10}
                  />
                  <ButtonReact
                    id="bold"
                    canvas={this.state.canvas}
                    displayText={"B"}
                  />
                  <ButtonReact
                    id="underLine"
                    canvas={this.state.canvas}
                    displayText={"U"}
                  />
                  <ButtonReact
                    id="italic"
                    canvas={this.state.canvas}
                    displayText={"I"}
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

const mapStateToProps = state => {
  return { imgSrcData: state.getImagesSrc, fontListData: state.getFontList };
};

const mapDispatchToProps = {
  onGetImageSrc: getImageSrc,
  onGetFontsList: getFontsList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDrop);

//Crop images
