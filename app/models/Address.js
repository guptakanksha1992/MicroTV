'use strict';

const _ = require('underscore');
CONTAINS_DIGIT_REGEX = /.*[0-9].*/;


var ATTRIBUTES_ADDRESS_REQUIRED = [
  "id",
  "streetnumber",
  "street1",
  "street2",
  "city",
  "state",
  "zipCode",
  "deleted"
];

// Check for valid alphabet or not
static isAlphabeticString(string) {
  var isNotEmpty = !isEmpty(string);
  var doesNotContainDigits = !CONTAINS_DIGIT_REGEX.test(string);
  var doesNotContainInvalidChars = !/[\{\}\(\)_\$#"'@\|!\?\+\*%<>/]/.test(string);
  return isNotEmpty && doesNotContainDigits && doesNotContainInvalidChars;
}

static isEmpty(val) {
    var isUndefined = typeof val === 'undefined';
    var isNull = val === null;
    var isString = typeof val === 'string';
    var isObject = typeof val === 'object';

    if (isUndefined ||  isNull) {
      return true;
    } else if (isString) {
      var hasJustSpaces = val.trim().length === 0;
      return hasJustSpaces;
    } else if (isObject) {
      return isEmptyObject(val);
    } else {
      return false;
    }
  }

  static isValid(object) {
    if (typeof object !== 'undefined') {
      var isValid = true;
      if (typeof object.validate === 'function') {
        var validationOutput = object.validate();
        if (typeof validationOutput === 'boolean') {
          var isValid = isValid && (validationOutput === true);
        }
      }
      if (typeof object.isValid === 'function') {
        var validationOutput = object.isValid();
        if (typeof validationOutput === 'boolean') {
          var isValid = isValid && (validationOutput === true);
        }
      }
      return isValid;
    } else {
      return false;
    }
  }


const isValidCity = (city) => {
  return isAlphabeticString(city);
}
const isValidState = (state) => {
  return isAlphabeticString(state);
}
const isValidId = (id) => {
  var isNotEmpty = !isEmpty(id);
  return isNotEmpty;
}
const isValidZipCode = (zipCode) => {
  const ZIP_CODE_FORMAT_REGEX = /[0-9]{5,}$/;
  var isNotEmpty = !isEmpty(zipCode);
  var hasZipCodeFormat = ZIP_CODE_FORMAT_REGEX.test(zipCode);
  return isNotEmpty && hasZipCodeFormat
}

/***
 * Model class for Address
 ***/
module.exports = class Address {

  constructor(attributes) {
    if (_.isObject(attributes)) {
      this.id = attributes.id;
      this.streetnumber = attributes.streetnumber;
      this.street1 = attributes.street1;
      this.street2 = attributes.street2;
      this.city = attributes.city;
      this.state = attributes.state;
      this.zipCode = attributes.zipCode;
      this.deleted = attributes.deleted || false;
    }
  }


  set id(id) {
    if (id) {
      if (isValidId(id)) {
        this._id = id;
      } else {
        throw new Exception("Invalid id")
      }
    }
  }

  set city(city) {
    if (city) {
      if (isValidCity(city)) {
        this._city = city;
      } else {
        throw new Exception("Invalid city")
      }
    }
  }

  set state(state) {
    if (state) {
      if (isValidState(state)) {
        this._state = state;
      } else {
        throw new Exception("Invalid state")
      }
    }
  }

  set streetnumber(streetnumber) {
    if (streetnumber) {
      if (!isEmpty(streetnumber)) {
        this.streetnumber = streetnumber;
      } else {
        throw new Exception("Invalid street")
      }
    }
  }

    set street1(street1) {
    if (street1) {
      if (!isEmpty(street1)) {
        this.street1 = street1;
      } else {
        throw new Exception("Invalid street1")
      }
    }
  }

    set street2(street2) {
    if (street2) {
      if (!isEmpty(street2)) {
        this.street2 = street2;
      } else {
        throw new Exception("Invalid street2")
      }
    }
  }

  set zipCode(zipCode) {
    if (zipCode) {
      if (isValidZipCode(zipCode)) {
        this._zipCode = zipCode;
      } else {
        throw new Exception("zip code")
      }
    }
  }

  set deleted(deleted) {
    if (typeof deleted === 'boolean') {
      this._deleted = deleted;
    }
  }

  get id() {
    return this._id;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get streetnumber() {
    return this.streetnumber;
  }

    get street1() {
    return this.street1;
  }

    get street2() {
    return this.street2;
  }

  get zipCode() {
    return this._zipCode;
  }

  get deleted() {
    return this._deleted;
  }

  validate() {
    _.each(VALID_ADDRESS_REQUIRED_ATTRIBUTES, (attribute) => {
      var hasAttribute = typeof this[attribute] !== 'undefined';
      var isValidAttribute = isValid(this[attribute]);
      if (!hasAttribute || !isValidAttribute) {
        throw new Exception(attribute);
      }
    });
    return true;
  }
}
