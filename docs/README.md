# JSON Utils Documentation

This is the GitHub Pages documentation site for JSON Utils - a backend utility for converting JSON to HTML forms and JSON schemas.

## 📁 File Structure

```
docs/
├── index.html              # Main documentation homepage
├── api.html                # API reference and endpoints
├── usage.html              # Usage examples and tutorials
├── contributing.html       # Contributing guidelines
├── 404.html                # Custom 404 error page
├── robots.txt              # Search engine instructions
├── sitemap.xml             # Site structure for SEO
├── _config.yml             # Jekyll/GitHub Pages configuration
├── CNAME                   # Custom domain configuration (optional)
├── .gitignore              # Git ignore patterns for Jekyll
└── assets/
    ├── css/
    │   └── style.css       # Complete responsive CSS styles
    └── js/
        └── main.js         # Interactive features and functionality
```

## 🚀 GitHub Pages Setup

### 1. Upload to Repository

1. Copy the entire `docs/` folder to your jsonUtils repository root
2. Commit and push to GitHub:
   ```bash
   git add docs/
   git commit -m "docs: add GitHub Pages documentation site"
   git push origin main
   ```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select:
   - **Deploy from a branch**
   - **Branch**: `main`
   - **Folder**: `/docs`
4. Click **Save**

### 3. Access Your Documentation

Your documentation will be available at:
- `https://YOUR_USERNAME.github.io/jsonutils/`

### 4. Custom Domain (Optional)

If you have a custom domain:
1. Edit `docs/CNAME` and add your domain
2. Configure your DNS to point to GitHub Pages
3. Enable HTTPS in repository settings

## 🎨 Features

### Responsive Design
- Mobile-friendly navigation
- Responsive grid layouts
- Print-friendly styles

### Interactive Elements
- Copy-to-clipboard for code blocks
- Smooth scrolling navigation
- Mobile menu toggle
- Syntax highlighting

### SEO Optimized
- Meta tags and descriptions
- Sitemap.xml for search engines
- Open Graph tags for social sharing
- Structured data markup

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- WCAG compliant color contrast

## 📝 Customization

### Update Repository Links
Replace `yourusername/jsonutils` in the following files:
- `index.html` - Navigation and footer links
- `api.html` - GitHub repository links
- `usage.html` - Repository references
- `contributing.html` - Repository URLs
- `_config.yml` - Site configuration
- `sitemap.xml` - Base URLs

### Branding
- Update the color scheme in `assets/css/style.css`
- Modify the header gradient and accent colors
- Add your logo or favicon
- Update footer copyright information

### Content
- Add more examples in `usage.html`
- Expand API documentation in `api.html`
- Update contributing guidelines
- Add changelog or release notes

## 🛠️ Development

### Local Testing
To test locally with Jekyll:
```bash
cd docs/
gem install bundler jekyll
jekyll serve
```

Visit `http://localhost:4000` to preview.

### File Modifications
- **CSS**: Edit `assets/css/style.css` for styling changes
- **JavaScript**: Edit `assets/js/main.js` for interactive features
- **Content**: Update HTML files for documentation content
- **Configuration**: Modify `_config.yml` for Jekyll settings

## 📋 Content Checklist

Before publishing, update:
- [ ] Repository URLs (replace `yourusername/jsonutils`)
- [ ] Domain in `_config.yml` and `sitemap.xml`
- [ ] Copyright information in footer
- [ ] API examples with correct endpoints
- [ ] Contributing workflow instructions
- [ ] License information
- [ ] Contact or support information

## 🔧 Maintenance

### Regular Updates
- Keep examples up to date with API changes
- Update installation instructions for new versions
- Add new features to documentation
- Monitor and fix broken links

### Analytics (Optional)
Add Google Analytics or other tracking:
1. Get tracking code
2. Add to `assets/js/main.js`
3. Update privacy policy if needed

## 📞 Support

For issues with the documentation site:
1. Check GitHub Pages build status
2. Validate HTML/CSS syntax
3. Test responsive design on different devices
4. Verify all links work correctly

---

This documentation site provides a professional, user-friendly interface for your JSON Utils project, making it easy for users to understand and implement the API.
