# CV / Resume Files

## How to Add Your CV

1. **Prepare your CV file:**
   - Export as PDF (recommended)
   - File size: under 5MB
   - Name it: `resume.pdf`

2. **Add to this folder:**
   ```
   /public/cv/resume.pdf
   ```

3. **Test the download:**
   - Visit your homepage
   - Click "Download CV" button
   - Should download your resume

## File Naming

- **Primary CV:** `resume.pdf` (used by default)
- **Alternative names:** You can use any name, but update the link in hero section

## Updating the Link

If you want to use a different filename, update:

```tsx
// src/components/sections/hero-section.tsx
<Link href="/cv/your-custom-name.pdf">
  Download CV
</Link>
```

## Multiple Versions

You can keep multiple versions:
```
/public/cv/
├── resume.pdf           (current version)
├── resume-2024.pdf      (archive)
└── resume-detailed.pdf  (detailed version)
```

## Notes

- Files in `/public` are served at the root URL
- `/public/cv/resume.pdf` becomes `/cv/resume.pdf` in the browser
- Make sure file permissions are set correctly
- Git will track these files (add to .gitignore if needed)
