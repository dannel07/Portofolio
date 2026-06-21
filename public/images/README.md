# Portfolio Images

## How to Add Your Profile Photo

1. **Add your profile photo** to this folder with the name `profile.jpg` or `profile.png`
2. The recommended size is **800x800 pixels** or larger (square aspect ratio)
3. Supported formats: JPG, PNG, WEBP

## File Structure

```
/public/images/
├── profile.jpg          # Your main profile photo (add this!)
├── profile-avatar.jpg   # Optional: smaller avatar version
└── projects/            # Project thumbnails (optional)
```

## Usage

Your profile photo will automatically appear in:
- Hero section (main homepage banner)
- About section
- Admin dashboard
- Meta tags for social sharing

## Tips for Best Results

- **Size**: 800x800px minimum (1:1 aspect ratio)
- **Format**: JPG recommended for photos, PNG for logos
- **File size**: Keep under 500KB for faster loading
- **Background**: Clean, professional background recommended
- **Lighting**: Good lighting, facing camera

## Update the Code

After adding your photo, the hero section will automatically use it. If you want to customize the path, edit:

```tsx
// src/components/sections/hero-section.tsx
<Image
  src="/images/profile.jpg"  // Change this path if needed
  alt="Daniel Sinambela"
  fill
  className="object-cover"
  priority
/>
```
