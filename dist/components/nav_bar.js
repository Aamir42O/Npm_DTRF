"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Nav_bar;

var _reactFeather = require("react-feather");

var _react = _interopRequireWildcard(require("react"));

var _Auth = _interopRequireDefault(require("../helper/Auth"));

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _router = _interopRequireDefault(require("next/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Nav_bar() {
  const [userData, setUserData] = (0, _react.useState)("");

  _react.default.useEffect(() => {
    if (!userData) {
      const userName = _jsCookie.default.get("userName");

      const instituteName = _jsCookie.default.get("instituteName");

      setUserData({
        userName,
        instituteName
      });
    }
  }, []);

  const handleLogout = async () => {
    const url = process.env.NEXT_PUBLIC_USER_LOGOUT;
    console.log("URL", url);
    const resp = await (0, _Auth.default)(url, "POST");
    console.log("LOGOUT RESPONSE", resp);

    _jsCookie.default.remove(['accessToken', "userName", "instituteName"]);

    _router.default.push("/login");
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "navbar-bg"
  }), /*#__PURE__*/_react.default.createElement("nav", {
    className: "navbar navbar-expand-lg main-navbar sticky"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-inline mr-auto"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "navbar-nav mr-3"
  }, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    "data-toggle": "sidebar",
    className: "nav-link nav-link-lg\r collapse-btn"
  }, " ", /*#__PURE__*/_react.default.createElement(_reactFeather.AlignJustify, {
    style: {
      width: '20px',
      height: '20px',
      color: '#555556'
    }
  }))), /*#__PURE__*/_react.default.createElement("li", null))), /*#__PURE__*/_react.default.createElement("ul", {
    className: "navbar-nav navbar-right"
  }, /*#__PURE__*/_react.default.createElement("li", {
    className: "dropdown dropdown-list-toggle"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-menu dropdown-list dropdown-menu-right pullDown"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-header"
  }, "Messages", /*#__PURE__*/_react.default.createElement("div", {
    className: "float-right"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#"
  }, "Mark All As Read"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-list-content dropdown-list-message"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-avatar\r text-white"
  }), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "message-user"
  }, "John Deo"), /*#__PURE__*/_react.default.createElement("span", {
    className: "time messege-text"
  }, "Please check your mail !!"), /*#__PURE__*/_react.default.createElement("span", {
    className: "time"
  }, "2 Min Ago"))), " ", /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-avatar text-white"
  }), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "message-user"
  }, "Sarah Smith"), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "time messege-text"
  }, "Request for leave application"), /*#__PURE__*/_react.default.createElement("span", {
    className: "time"
  }, "5 Min Ago"))), " ", /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-avatar text-white"
  }), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "message-user"
  }, "Jacob Ryan"), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "time messege-text"
  }, "Your payment invoice is generated."), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "time"
  }, "12 Min Ago"))), " ", /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-avatar text-white"
  }), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "message-user"
  }, "Lina Smith"), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "time messege-text"
  }, "hii John, I have upload doc related to task."), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "time"
  }, "30 Min Ago"))), " ", /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-avatar text-white"
  }), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "message-user"
  }, "Jalpa Joshi"), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "time messege-text"
  }, "Please do as specify. Let me know if you have any query."), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "time"
  }, "1 Days Ago"))), " ", /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-avatar text-white"
  }), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "message-user"
  }, "Sarah Smith"), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "time messege-text"
  }, "Client Requirements"), /*#__PURE__*/_react.default.createElement("span", {
    className: "time"
  }, "2 Days Ago")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-footer text-center"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#"
  }, "View All ", /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-chevron-right"
  }))))), /*#__PURE__*/_react.default.createElement("li", {
    className: "dropdown dropdown-list-toggle"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    "data-toggle": "dropdown",
    className: "nav-link notification-toggle nav-link-lg"
  }, /*#__PURE__*/_react.default.createElement("i", null, /*#__PURE__*/_react.default.createElement(_reactFeather.Bell, {
    style: {
      width: '24px',
      height: '24px',
      color: '#555556'
    },
    className: "bell"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-menu dropdown-list dropdown-menu-right pullDown"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-header"
  }, "Notifications", /*#__PURE__*/_react.default.createElement("div", {
    className: "float-right"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#"
  }, "Mark All As Read"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-list-content dropdown-list-icons"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item dropdown-item-unread"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-icon bg-primary text-white"
  }, " ", /*#__PURE__*/_react.default.createElement("i", {
    className: "fas\r fa-code"
  })), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc"
  }, " Template update is available now! ", /*#__PURE__*/_react.default.createElement("span", {
    className: "time"
  }, "2 Min Ago"))), " ", /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-icon bg-info text-white"
  }, " ", /*#__PURE__*/_react.default.createElement("i", {
    className: "far\r fa-user"
  })), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc"
  }, " ", /*#__PURE__*/_react.default.createElement("b", null, "You"), " and ", /*#__PURE__*/_react.default.createElement("b", null, "Dedik Sugiharto"), " are now friends ", /*#__PURE__*/_react.default.createElement("span", {
    className: "time"
  }, "10 Hours Ago"))), " ", /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-icon bg-success text-white"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item has-icon"
  }, " ", /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-bolt"
  }), "Activities")), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc"
  }, " ", /*#__PURE__*/_react.default.createElement("b", null, "Kusnaedi"), " has moved task ", /*#__PURE__*/_react.default.createElement("b", null, "Fix bug header"), " to ", /*#__PURE__*/_react.default.createElement("b", null, "Done"), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "time"
  }, "12 Hours Ago"))), " ", /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-icon bg-danger text-white"
  }, " ", /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-exclamation-triangle"
  })), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc"
  }, " Low disk space. Let's clean it! ", /*#__PURE__*/_react.default.createElement("span", {
    className: "time"
  }, "17 Hours Ago"))), " ", /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-icon bg-info text-white"
  }, " ", /*#__PURE__*/_react.default.createElement("i", {
    className: "fas\r fa-bell"
  })), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc"
  }, " Welcome to template! ", /*#__PURE__*/_react.default.createElement("span", {
    className: "time"
  }, "Yesterday")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-footer text-center"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#"
  }, "View All ", /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-chevron-right"
  }))))), /*#__PURE__*/_react.default.createElement("li", {
    className: "dropdown dropdown-list-toggle"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    "data-toggle": "dropdown",
    className: "nav-link notification-toggle nav-link-lg"
  }, /*#__PURE__*/_react.default.createElement("i", null, /*#__PURE__*/_react.default.createElement(_reactFeather.User, {
    style: {
      width: '24px',
      height: '24px',
      color: '#555556'
    },
    className: "user"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-menu dropdown-list dropdown-menu-right pullDown"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-header"
  }, "Hello ", userData ? userData.userName : "No user "), /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-list-content dropdown-list-icons"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item dropdown-item-unread"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-icon bg-primary text-white"
  }, " ", /*#__PURE__*/_react.default.createElement("i", {
    className: "far\r fa-user"
  })), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc"
  }, " Profile")), /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-icon bg-success text-white"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-bolt"
  })), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc"
  }, "Activities")), " ", /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-icon bg-info text-white"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-cog"
  })), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc"
  }, " Settings")), " ", /*#__PURE__*/_react.default.createElement("a", {
    onClick: handleLogout,
    className: "dropdown-item "
  }, " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-icon has-icon text-danger"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-sign-out-alt"
  })), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-item-desc "
  }, " Logout"))))))));
}