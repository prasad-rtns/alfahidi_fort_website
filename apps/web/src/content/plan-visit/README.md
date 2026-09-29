# Plan Your Visit content

Edit `en.json` and `ar.json` to update visitor information, hours, prices, directions text, and accessibility copy. Keep keys and array order aligned between languages. The route renders the JSON as plain text; no HTML is evaluated. Development reflects saved edits immediately. Production needs a rebuild and redeploy.

Opening hours and ticket prices came from the supplied mock and should be checked against current museum information before publication. The supplied mock has no live ticket checkout URL, so Book Tickets leads visitors to the contact page from the ticket section. The directions URL is shared with Contact Us and restricted to HTTPS.

The two large photos and their corner marks replay Home's scroll reveal. In `src/styles/globals.css`, the `.plan-visit-page` variables control the photo reveal duration, final pop delay, and marker opening duration. Reduce those values to speed up the effect. Visitors who request reduced motion see the images and marks immediately.
