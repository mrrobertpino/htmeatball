const BLOCK_HELP = {
  "html": [
    {
      "key": "h1",
      "label": "Heading",
      "code": "<h1>Your heading</h1>",
      "insert": "<h1>Your heading</h1>",
      "color": "blue",
      "desc": "A heading labels the most important title on a page. h1 is the biggest level; h2–h6 are smaller section headings.",
      "demo": "<h1 style=\"outline:3px solid #f59e0b;outline-offset:3px\">Your heading</h1><p>A paragraph underneath it.</p>"
    },
    {
      "key": "h2",
      "label": "Section heading",
      "code": "<h2>Section title</h2>",
      "insert": "<h2>Section title</h2>",
      "color": "blue",
      "desc": "A section heading breaks the page into smaller parts.",
      "demo": "<h1>My Page</h1><h2 style=\"outline:3px solid #f59e0b;outline-offset:3px\">Section title</h2><p>Section content.</p>"
    },
    {
      "key": "p",
      "label": "Paragraph",
      "code": "<p>Your paragraph</p>",
      "insert": "<p>Your paragraph</p>",
      "color": "blue",
      "desc": "A paragraph holds normal blocks of text.",
      "demo": "<h2>About Meatball</h2><p style=\"outline:3px solid #f59e0b;outline-offset:3px\">Meatball is a very good dog.</p>"
    },
    {
      "key": "b",
      "label": "Bold",
      "code": "<b>bold words</b>",
      "insert": "<b>bold words</b>",
      "color": "pink",
      "desc": "Bold makes text visually heavier.",
      "demo": "<p>This is <b style=\"outline:3px solid #f59e0b;outline-offset:2px\">bold text</b> in a paragraph.</p>"
    },
    {
      "key": "i",
      "label": "Italic",
      "code": "<i>italic words</i>",
      "insert": "<i>italic words</i>",
      "color": "teal",
      "desc": "Italic slants text for emphasis or style.",
      "demo": "<p>This is <i style=\"outline:3px solid #f59e0b;outline-offset:2px\">italic text</i> in a paragraph.</p>"
    },
    {
      "key": "u",
      "label": "Underline",
      "code": "<u>underlined words</u>",
      "insert": "<u>underlined words</u>",
      "color": "amber",
      "desc": "Underline draws a line underneath text.",
      "demo": "<p>This is <u style=\"outline:3px solid #f59e0b;outline-offset:2px\">underlined text</u>.</p>"
    },
    {
      "key": "br",
      "label": "Line break",
      "code": "<br>",
      "insert": "<br>",
      "color": "gray",
      "desc": "A line break moves the next text onto a new line without starting a new paragraph.",
      "demo": "<p>First line<br><span style=\"outline:3px solid #f59e0b;outline-offset:2px\">Second line</span></p>"
    },
    {
      "key": "hr",
      "label": "Divider",
      "code": "<hr>",
      "insert": "<hr>",
      "color": "gray",
      "desc": "A divider creates a thematic break, usually shown as a horizontal line.",
      "demo": "<p>Above</p><hr style=\"outline:3px solid #f59e0b;outline-offset:3px\"><p>Below</p>"
    },
    {
      "key": "a",
      "label": "Link",
      "code": "<a href=\"URL\">link text</a>",
      "insert": "<a href=\"https://example.com\">link text</a>",
      "color": "green",
      "desc": "A link sends the visitor to another page or website. href is the destination.",
      "demo": "<p>Visit <a href=\"#\" style=\"outline:3px solid #f59e0b;outline-offset:3px\">this link</a> to learn more.</p>"
    },
    {
      "key": "img",
      "label": "Image",
      "code": "<img src=\"image.jpg\" alt=\"description\">",
      "insert": "<img src=\"dog.png\" alt=\"A happy dog\">",
      "color": "green",
      "desc": "An image displays a picture. src tells the browser where the image is; alt describes it.",
      "demo": "<img src=\"dog.png\" alt=\"A happy dog\" style=\"width:150px;outline:3px solid #f59e0b;outline-offset:3px\">"
    },
    {
      "key": "ul",
      "label": "Bulleted list",
      "code": "<ul> ... </ul>",
      "insert": "<ul>\n  <li>First item</li>\n  <li>Second item</li>\n</ul>",
      "color": "orange",
      "desc": "An unordered list groups items with bullets.",
      "demo": "<ul style=\"outline:3px solid #f59e0b;outline-offset:3px\"><li>Treats</li><li>Naps</li></ul>"
    },
    {
      "key": "ol",
      "label": "Numbered list",
      "code": "<ol> ... </ol>",
      "insert": "<ol>\n  <li>First item</li>\n  <li>Second item</li>\n</ol>",
      "color": "orange",
      "desc": "An ordered list groups items in numbered order.",
      "demo": "<ol style=\"outline:3px solid #f59e0b;outline-offset:3px\"><li>Wake up</li><li>Get snacks</li></ol>"
    },
    {
      "key": "li",
      "label": "List item",
      "code": "<li>List item</li>",
      "insert": "<li>List item</li>",
      "color": "orange",
      "desc": "A list item is one entry inside a ul or ol list.",
      "demo": "<ul><li style=\"outline:3px solid #f59e0b;outline-offset:3px\">One list item</li><li>Another</li></ul>"
    },
    {
      "key": "div",
      "label": "Container",
      "code": "<div> ... </div>",
      "insert": "<div>\n  Your content\n</div>",
      "color": "purple",
      "desc": "A div groups pieces of a page so they can be organized or styled together.",
      "demo": "<div style=\"padding:12px;border:1px solid #bbb;outline:3px solid #f59e0b;outline-offset:3px\"><b>A grouped section</b><p>Content inside the div.</p></div>"
    },
    {
      "key": "section",
      "label": "Section",
      "code": "<section> ... </section>",
      "insert": "<section>\n  <h2>Section title</h2>\n  <p>Section content</p>\n</section>",
      "color": "purple",
      "desc": "A section groups related content that belongs together as one meaningful part of a page.",
      "demo": "<section style=\"padding:12px;background:#eef5ff;outline:3px solid #f59e0b;outline-offset:3px\"><h2>A section</h2><p>Related content.</p></section>"
    }
  ],
  "css": [
    {
      "key": "body",
      "label": "Whole page",
      "code": "body { }",
      "insert": "body {\n  \n}",
      "color": "purple",
      "desc": "The body selector styles the entire visible page.",
      "demo": "<div style=\"padding:18px;background:#eef5ff;outline:3px solid #f59e0b\">The whole page can be styled.</div>"
    },
    {
      "key": "h1sel",
      "label": "Main headings",
      "code": "h1 { }",
      "insert": "h1 {\n  \n}",
      "color": "purple",
      "desc": "The h1 selector styles every h1 heading.",
      "demo": "<h1 style=\"color:#5749df;outline:3px solid #f59e0b;outline-offset:3px\">Styled heading</h1>"
    },
    {
      "key": "psel",
      "label": "Paragraphs",
      "code": "p { }",
      "insert": "p {\n  \n}",
      "color": "purple",
      "desc": "The p selector styles every paragraph.",
      "demo": "<p style=\"font-size:20px;outline:3px solid #f59e0b;outline-offset:3px\">Styled paragraph</p>"
    },
    {
      "key": "class",
      "label": "A class",
      "code": ".my-class { }",
      "insert": ".my-class {\n  \n}",
      "color": "purple",
      "desc": "A class selector styles elements whose class attribute matches the name.",
      "demo": "<p class=\"my-class\" style=\"background:#fff2dc;padding:8px;outline:3px solid #f59e0b\">class=\"my-class\"</p>"
    },
    {
      "key": "id",
      "label": "One ID",
      "code": "#my-id { }",
      "insert": "#my-id {\n  \n}",
      "color": "purple",
      "desc": "An ID selector styles the one element whose id attribute matches the name.",
      "demo": "<p id=\"my-id\" style=\"background:#e7f5ef;padding:8px;outline:3px solid #f59e0b\">id=\"my-id\"</p>"
    },
    {
      "key": "color",
      "label": "Text color",
      "code": "color: #5749df;",
      "insert": "color: #5749df;",
      "color": "pink",
      "desc": "color changes the color of text.",
      "demo": "<p style=\"color:#5749df;font-size:22px;outline:3px solid #f59e0b\">Purple text</p>"
    },
    {
      "key": "background",
      "label": "Background",
      "code": "background: #f0f7ff;",
      "insert": "background: #f0f7ff;",
      "color": "teal",
      "desc": "background changes the area behind an element.",
      "demo": "<p style=\"background:#f0f7ff;padding:12px;outline:3px solid #f59e0b\">A background</p>"
    },
    {
      "key": "font-size",
      "label": "Font size",
      "code": "font-size: 24px;",
      "insert": "font-size: 24px;",
      "color": "blue",
      "desc": "font-size controls how large the text appears.",
      "demo": "<p style=\"font-size:24px;outline:3px solid #f59e0b\">24px text</p>"
    },
    {
      "key": "font-family",
      "label": "Font",
      "code": "font-family: Arial, sans-serif;",
      "insert": "font-family: Arial, sans-serif;",
      "color": "blue",
      "desc": "font-family chooses the typeface.",
      "demo": "<p style=\"font-family:Georgia,serif;font-size:20px;outline:3px solid #f59e0b\">Different font</p>"
    },
    {
      "key": "font-weight",
      "label": "Boldness",
      "code": "font-weight: bold;",
      "insert": "font-weight: bold;",
      "color": "pink",
      "desc": "font-weight controls how heavy the letters are.",
      "demo": "<p style=\"font-weight:bold;font-size:20px;outline:3px solid #f59e0b\">Bold text</p>"
    },
    {
      "key": "text-align",
      "label": "Text alignment",
      "code": "text-align: center;",
      "insert": "text-align: center;",
      "color": "blue",
      "desc": "text-align moves inline content left, center, right, or justified.",
      "demo": "<div style=\"text-align:center;outline:3px solid #f59e0b\"><p>Centered text</p></div>"
    },
    {
      "key": "line-height",
      "label": "Line spacing",
      "code": "line-height: 1.6;",
      "insert": "line-height: 1.6;",
      "color": "blue",
      "desc": "line-height controls the vertical space between lines of text.",
      "demo": "<p style=\"line-height:2;outline:3px solid #f59e0b\">More space<br>between lines</p>"
    },
    {
      "key": "padding",
      "label": "Inside space",
      "code": "padding: 20px;",
      "insert": "padding: 20px;",
      "color": "orange",
      "desc": "padding adds space inside an element, between its content and its edge.",
      "demo": "<div style=\"padding:25px;border:2px solid #333;outline:3px solid #f59e0b\">Padding inside</div>"
    },
    {
      "key": "margin",
      "label": "Outside space",
      "code": "margin: 20px;",
      "insert": "margin: 20px;",
      "color": "orange",
      "desc": "margin adds space outside an element.",
      "demo": "<div style=\"background:#eee;padding:2px\"><div style=\"margin:20px;background:white;outline:3px solid #f59e0b\">Margin outside</div></div>"
    },
    {
      "key": "width",
      "label": "Width",
      "code": "width: 300px;",
      "insert": "width: 300px;",
      "color": "green",
      "desc": "width controls how wide an element is.",
      "demo": "<div style=\"width:180px;background:#e7f5ef;padding:8px;outline:3px solid #f59e0b\">180px wide</div>"
    },
    {
      "key": "max-width",
      "label": "Maximum width",
      "code": "max-width: 600px;",
      "insert": "max-width: 600px;",
      "color": "green",
      "desc": "max-width prevents an element from growing wider than a chosen size.",
      "demo": "<div style=\"max-width:220px;background:#e7f5ef;padding:8px;outline:3px solid #f59e0b\">Stops growing here</div>"
    },
    {
      "key": "border",
      "label": "Border",
      "code": "border: 2px solid black;",
      "insert": "border: 2px solid black;",
      "color": "purple",
      "desc": "border draws an edge around an element.",
      "demo": "<div style=\"border:4px solid #5749df;padding:10px;outline:3px solid #f59e0b;outline-offset:3px\">A border</div>"
    },
    {
      "key": "border-radius",
      "label": "Rounded corners",
      "code": "border-radius: 12px;",
      "insert": "border-radius: 12px;",
      "color": "purple",
      "desc": "border-radius rounds an element’s corners.",
      "demo": "<div style=\"border-radius:18px;background:#f1eafb;padding:14px;outline:3px solid #f59e0b\">Rounded corners</div>"
    },
    {
      "key": "display",
      "label": "Layout mode",
      "code": "display: flex;",
      "insert": "display: flex;",
      "color": "purple",
      "desc": "display changes how an element participates in page layout. flex is useful for arranging children in a row or column.",
      "demo": "<div style=\"display:flex;gap:8px;outline:3px solid #f59e0b\"><span style=\"background:#eee;padding:8px\">A</span><span style=\"background:#eee;padding:8px\">B</span></div>"
    }
  ]
};
