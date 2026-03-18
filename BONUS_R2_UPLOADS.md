# Bonus PDF Upload Targets

These four bonus PDFs are now wired through the same booklet URL strategy as the rest of the portal.

If `NEXT_PUBLIC_STORAGE_PROVIDER=cloudflare-r2`, production expects them at:

- `leaders/booklet/Bonus - The Abiding Presence - A Beginner’s Guide to Walking with the Holy Spirit.pdf`
- `leaders/booklet/Bonus - Holistic Restoration Protocol.pdf`
- `leaders/booklet/Bonus - The Resident, Not the Visitor - 5 Surprising Shifts for Living in Continuous Spiritual Presence.pdf`
- `leaders/booklet/Bonus - Full 2026 Leaders Retreat Teaching Learning Framework.pdf`

Current source files:

- `C:\Users\oyes0\Dropbox\Leader’s Retreat 2026\booklets\Bonus - The Abiding Presence - A Beginner’s Guide to Walking with the Holy Spirit.pdf`
- `C:\Users\oyes0\Dropbox\Leader’s Retreat 2026\booklets\Bonus - Holistic Restoration Protocol.pdf`
- `C:\Users\oyes0\Dropbox\Leader’s Retreat 2026\booklets\Bonus - The Resident, Not the Visitor - 5 Surprising Shifts for Living in Continuous Spiritual Presence.pdf`
- `C:\Users\oyes0\Dropbox\Leader’s Retreat 2026\booklets\Bonus - Full 2026 Leaders Retreat Teaching Learning Framework.pdf`

Local fallback copies are already present in `public/media/booklets/` for development and emergency fallback.

Only the PDF files should be uploaded. Do not upload the Word document equivalents.