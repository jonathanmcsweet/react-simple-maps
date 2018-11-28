"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ZoomableGlobe = function (_Component) {
  _inherits(ZoomableGlobe, _Component);

  function ZoomableGlobe(props) {
    _classCallCheck(this, ZoomableGlobe);

    var _this = _possibleConstructorReturn(this, (ZoomableGlobe.__proto__ || Object.getPrototypeOf(ZoomableGlobe)).call(this, props));

    var initialRotation = props.projection.rotate();

    _this.state = {
      mouseX: 0,
      mouseY: 0,
      mouseXStart: 0,
      mouseYStart: 0,
      isPressed: false,
      rotation: [initialRotation[0] - props.center[0], initialRotation[1] - props.center[1], initialRotation[2]]
    };

    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    return _this;
  }

  _createClass(ZoomableGlobe, [{
    key: "handleMouseMove",
    value: function handleMouseMove(_ref) {
      var clientX = _ref.clientX,
          clientY = _ref.clientY;

      if (this.props.disablePanning) return;
      if (!this.state.isPressed) return;

      var differenceX = clientX - this.state.mouseXStart;
      var differenceY = clientY - this.state.mouseYStart;

      this.setState({
        mouseX: clientX,
        mouseY: clientY,
        mouseXStart: clientX,
        mouseYStart: clientY,
        rotation: [this.state.rotation[0] + differenceX * this.props.sensitivity, this.state.rotation[1] - differenceY * this.props.sensitivity, this.state.rotation[2]]
      });
    }
  }, {
    key: "handleTouchMove",
    value: function handleTouchMove(_ref2) {
      var touches = _ref2.touches;

      this.handleMouseMove(touches[0]);
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp() {
      if (this.props.disablePanning) return;
      if (!this.state.isPressed) return;
      this.setState({
        isPressed: false
      });
      if (!this.props.onMoveEnd) return;
      var newCenter = this.props.projection.invert([this.props.width / 2, this.props.height / 2]);
      this.props.onMoveEnd(newCenter);
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(_ref3) {
      var clientX = _ref3.clientX,
          clientY = _ref3.clientY;

      if (this.props.disablePanning) return;
      this.setState({
        isPressed: true,
        mouseXStart: clientX,
        mouseYStart: clientY
      });
      if (!this.props.onMoveStart) return;
      var currentCenter = this.props.projection.invert([this.props.width / 2, this.props.height / 2]);
      this.props.onMoveStart(currentCenter);
    }
  }, {
    key: "handleTouchStart",
    value: function handleTouchStart(_ref4) {
      var touches = _ref4.touches;

      if (touches.length > 1) {
        this.handleMouseDown(touches[0]);
      } else {
        this.handleMouseUp();
      }
    }
  }, {
    key: "preventTouchScroll",
    value: function preventTouchScroll(evt) {
      if (evt.touches.length > 1) {
        evt.preventDefault();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var center = this.props.center;


      var centerChanged = JSON.stringify(nextProps.center) !== JSON.stringify(center);

      this.setState({
        zoom: nextProps.zoom,
        rotation: centerChanged ? [-nextProps.center[0], -nextProps.center[1], this.state.rotation[2]] : this.state.rotation
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {

      window.addEventListener("resize", this.handleResize);
      window.addEventListener("mouseup", this.handleMouseUp);
      this.zoomableGlobeNode.addEventListener("touchmove", this.preventTouchScroll);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
      window.removeEventListener("mouseup", this.handleMouseUp);
      this.zoomableGlobeNode.removeEventListener("touchmove", this.preventTouchScroll);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          width = _props.width,
          height = _props.height,
          zoom = _props.zoom,
          style = _props.style,
          projection = _props.projection,
          children = _props.children;


      return _react2.default.createElement(
        "g",
        { className: "rsm-zoomable-globe",
          ref: function ref(zoomableGlobeNode) {
            return _this2.zoomableGlobeNode = zoomableGlobeNode;
          },
          transform: "\n           translate(" + width / 2 + " " + height / 2 + ")\n           scale(" + zoom + ")\n           translate(" + -width / 2 + " " + -height / 2 + ")\n         ",
          onMouseMove: this.handleMouseMove,
          onMouseUp: this.handleMouseUp,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart,
          onTouchMove: this.handleTouchMove,
          onTouchEnd: this.handleMouseUp,
          style: style
        },
        (0, _utils.createNewChildren)(children, {
          width: width,
          height: height,
          center: this.center,
          backdrop: this.backdrop,
          zoom: this.props.zoom,
          disablePanning: this.props.disablePanning,
          children: children,
          projection: projection.rotate(this.state.rotation)
        })
      );
    }
  }]);

  return ZoomableGlobe;
}(_react.Component);

ZoomableGlobe.defaultProps = {
  center: [0, 0],
  zoom: 1,
  disablePanning: false,
  sensitivity: 0.25
};

exports.default = ZoomableGlobe;