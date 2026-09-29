# Experience content

Edit `en.json` and `ar.json` to update the Experience page. Keep keys and gallery order aligned between languages. The route uses the JSON values directly as plain text; no HTML is evaluated. Development reflects saved edits immediately. Production needs a rebuild and redeploy.

Images are in `public/assets/experience`; their filenames are mapped in the page component. Image descriptions are editable through the JSON `*Alt` fields.

The two large oval images use the Home page push/pop effect. In `src/styles/globals.css`, edit the `.experience-page` timing variables: `--experience-pop-delay` controls the wait before the reveal, `--experience-pop-duration` controls the reveal speed, and `--experience-pop-settle-gap` controls the pause before the final pop. Set the delay to `0s` for an immediate reveal. Reduced-motion visitors see the images without animation.
