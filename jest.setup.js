var Enzyme = require("enzyme");
var Adapter = require("enzyme-adapter-react-15");
var serializer = require('enzyme-to-json/serializer');

Enzyme.configure({ adapter: new Adapter() });
