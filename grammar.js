module.exports = grammar({
  name: "tiny",

  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {
    source_file: $ => repeat($._token),

    _token: $ => choice(
      $.comment,
      $.string,
      $.number,
      $.keyword,
      $.identifier,
      $.operator,
      $.delimiter,

      // expose brackets as real anonymous tokens for Zed brackets.scm
      "(",
      ")",
      "{",
      "}",
      "[",
      "]"
    ),

    comment: $ => token(seq("//", /.*/)),

    string: $ => token(choice(
      seq('"', repeat(choice(/[^"\\]/, /\\./)), '"'),
      seq("'", repeat(choice(/[^'\\]/, /\\./)), "'"),
      seq("`", repeat(choice(/[^`\\]/, /\\./)), "`")
    )),

    number: $ => token(choice(
      /\d+\.\d+/,
      /\d+/
    )),

    keyword: $ => token(choice(
      "import",
      "std",
      "lib",
      "plugin",
      "as",
      "export",

      "interface",
      "class",
      "enum",
      "embed",
      "embedstr",
      "embeddir",
      "embedbin",
      "go",
      "native",
      "defer",
      "lock",
      "fn",
      "let",
      "const",

      "return",
      "if",
      "else",
      "while",
      "for",
      "instanceof",
      "in",
      "match",
      "break",
      "continue",
      "field",
      "private",
      "public",

      "try",
      "catch",
      "finally",
      "throw",

      "spawn",
      "await",
      "async",

      "and",
      "or",
      "typeof",

      "true",
      "false",
      "null",
      "undefined",
      "this"
    )),

    identifier: $ => token(/[A-Za-z_][A-Za-z0-9_]*/),

    operator: $ => token(choice(
      "=>",
      "??",
      "?.",
      "==",
      "!=",
      "<=",
      ">=",
      "&&",
      "||",
      "+=",
      "-=",
      "*=",
      "/=",
      "++",
      "--",
      "+",
      "-",
      "*",
      "/",
      "%",
      "=",
      "<",
      ">",
      "!",
      "."
    )),

    delimiter: $ => token(choice(
      ",",
      ":",
      ";"
    )),
  }
});
