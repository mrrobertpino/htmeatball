# HTMeatbalL — Sit. Stay. Site.

A standalone classroom HTML and CSS block editor. No install, account, API key, CDN, or build step.

## Put it on Netlify
Unzip this download. Drag the `html-playset` folder into Netlify's manual deploy area. The folder must contain `index.html` at its top level. For a Git-connected deployment, leave the build command empty and set the publish directory to `.`.

You can also open index.html directly in Chrome, Edge, Firefox, or Safari.

## Classroom use
- Drag blocks into the page, or click a toolbox block to append it.
- Edit text and URLs in white fields. Pick a heading level in the toolbox or on a heading block.
- Bold, italic, and underline have distinct colors and can nest inside each other.
- Containers show opening/closing tags and accept nested blocks. Paragraphs accept inline content; lists accept list items.
- Use ↑/↓ to reorder, Move then a placement bar to move without dragging, or × to delete. Escape cancels moving. Undo/redo supports block edits and text edits.
- HTML and CSS each switch between Blocks and Text. Selecting HTML or CSS also changes the toolbox to the matching blocks. JavaScript uses a text editor. CSS and JavaScript start off; each tab has a switch that controls whether it affects the live preview and exported page. Their code stays in the editor while off.
- The preview is sandboxed; JavaScript runs inside it without access to the editor. This is a learning tool, not a security boundary for intentionally hostile code (e.g. an infinite loop can hang the tab).
- Download page exports a standalone HTML website. It includes CSS and JavaScript when their switches are on.
- Work is held in this tab only: download before refreshing or leaving. No student data is sent to a server by the editor. Student-authored external images or links can contact other sites.

## HTML behavior
The HTML editor is for content inside the body, not an entire HTML document. Browser parsing may normalize invalid HTML when switching to blocks. Custom tags, comments, attributes, and complex inline markup are preserved as custom HTML blocks rather than discarded. Heading/link blocks are simple text bars; complex versions remain custom HTML. Bold, italic, and underline blocks accept nested inline content, including one another. CSS has selector containers and property blocks. Unknown CSS rules and declarations remain editable custom blocks when switching from text. JavaScript does not have a visual block mode.

## Files
index.html contains the app, including styling and JavaScript. htmeatball-logo.png is the supplied logo. netlify.toml supplies the static publish directory.
