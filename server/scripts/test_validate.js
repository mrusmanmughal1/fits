const validate = require("../middleware/validate");
const { register } = require("../schemas/auth");

function makeRes() {
  return {
    status(code) {
      this._status = code;
      return this;
    },
    json(obj) {
      console.log("RESPONSE", this._status, JSON.stringify(obj, null, 2));
    },
  };
}

const req = { body: { email: "nope", password: "short" } };
const res = makeRes();
const next = (err) => {
  if (err) console.error("NEXT ERR", err);
  else console.log("NEXT called");
};

validate(register)(req, res, next);
