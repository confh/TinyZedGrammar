module.exports = grammar({
  name: "tiny",

  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {
    source_file: $ => repeat($._token),

    _token: $ => choice(
      $.string,
      $.number,
      $.keyword,
      $.identifier,
      $.operator,
      $.punctuation
    ),

    comment: $ => token(seq("//", /.*/)),

    string: $ => token(choice(
      seq('"', repeat(choice(/[^"\\]/, /\\./)), '"'),
      seq("'", repeat(choice(/[^'\\]/, /\\./)), "'")
    )),

    number: $ => token(/\d+(\.\d+)?/),

    keyword: $ => token(choice(
      "let",
      "const",
      "fn",
      "return",
      "if",
      "else",
      "while",
      "for",
      "break",
      "continue",
      "true",
      "false",
      "null",
      "class",
      "interface",
      "enum",
      "import",
      "from",
      "try",
      "catch",
      "throw",
      "spawn",
      "await",
      "lock"
    )),

    identifier: $ => token(/[A-Za-z_][A-Za-z0-9_]*/),

    operator: $ => token(choice(
      "==",
      "!=",
      "<=",
      ">=",
      "&&",
      "||",
      "??",
      "?.",
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

    punctuation: $ => token(choice(
      "(",
      ")",
      "{",
      "}",
      "[",
      "]",
      ",",
      ";",
      ":"
    )),
  }
});
