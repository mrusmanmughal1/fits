const { ZodError } = require("zod");

function validate(schema, target = "body") {
  return (req, res, next) => {
    try {
      const data = target === "body" ? req.body : req.params;
      const parsed = schema.parse(data);
      if (target === "body") req.body = parsed;
      else req.params = parsed;
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        // ZodError stores issues in `issues` (array). Some code may use `errors`.
        let issues = Array.isArray(err.issues)
          ? err.issues
          : Array.isArray(err.errors)
          ? err.errors
          : null;
        if (!Array.isArray(issues)) {
          console.error("validate: unexpected ZodError shape", {
            hasIssues: !!err.issues,
            hasErrors: !!err.errors,
            issuesType:
              err.issues && Object.prototype.toString.call(err.issues),
            errorsType:
              err.errors && Object.prototype.toString.call(err.errors),
          });
          issues = [];
        }
        const map = {};
        for (const issue of issues) {
          const key =
            issue.path && issue.path.length ? String(issue.path[0]) : "_";
          if (!map[key]) map[key] = issue.message;
        }
        return res.status(400).json({ errors: map, details: issues });
      }
      return next(err);
    }
  };
}

module.exports = validate;
