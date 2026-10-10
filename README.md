# Lingnan Deep Work

Phone app (PWA) for the 5 Lingnan courses. Hosted on GitHub Pages.

## Keep the lessons in sync with the Word files
The app cannot read files on a computer, so the 5 synthesis documents are converted into `content.js`:

    python3 sync_courses.py <folder with the 5 .docx> content.js

Then upload `content.js` to this repository. Run it again each time the weekly update regenerates a .docx.
Expected structure in each .docx: Heading 1 = "Chapitre N - title" (one lesson); Heading 2/3 containing
"exercices / exercise / practice / corrigé / QCM" starts the exercises part; a paragraph starting with
"Réponse:" or "Answer:" becomes a hidden answer.

## Files
- `plan.js` generated study plan (`gen_plan2.py`), `exercises.js` practice sets, `content.js` lessons from Word.
