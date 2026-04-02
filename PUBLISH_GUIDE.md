# How to Publish pup-cli to npm

A complete guide to publishing your CLI tool to npm for global use.

---

## Prerequisites

### 1. Create an npm Account
If you don't have one:
- Go to https://www.npmjs.com/signup
- Create a free account
- Verify your email address

### 2. Login to npm
```bash
npm login
```
Enter your username, password, and email when prompted.

**Verify you're logged in:**
```bash
npm whoami
```

---

## Pre-Publish Checklist

### 1. Update package.json Metadata

Open `package.json` and update these fields:

```json
{
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/pup-cli.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/pup-cli/issues"
  },
  "homepage": "https://github.com/yourusername/pup-cli#readme"
}
```

**Replace:**
- `Your Name <your.email@example.com>` with your actual name and email
- `yourusername` with your GitHub username (if you have a repo)
- If you don't have a GitHub repo yet, you can remove these fields or create one first

### 2. Check Package Name Availability

```bash
npm search pup-cli
```

If the name is taken, you have two options:
- Choose a different name (update `"name"` in package.json)
- Use a scoped package: `"name": "@yourusername/pup-cli"`

### 3. Verify Package Contents

```bash
npm pack --dry-run
```

This shows what will be published. You should see:
- ✅ README.md
- ✅ bin/index.js
- ✅ src/ files
- ✅ package.json
- ❌ No .claude/, PRD.MD, or test files

### 4. Test Locally

```bash
# Link it globally
pnpm link --global

# Test from another directory
cd ~
pup "test prompt"
pup --help

# Unlink when done testing
pnpm uninstall --global pup-cli
```

---

## Publishing to npm

### Option 1: Publish with npm (Recommended)

```bash
# Make sure you're in the project directory
cd ~/sandeep/pup-cli

# Publish to npm
npm publish
```

### Option 2: Publish with pnpm

```bash
# Make sure you're in the project directory
cd ~/sandeep/pup-cli

# Publish to npm
pnpm publish
```

If you get a prompt asking if you want to continue, type `y` and press Enter.

---

## Post-Publish Steps

### 1. Verify Publication

Visit your package page:
```
https://www.npmjs.com/package/pup-cli
```

Or search for it:
```bash
npm search pup-cli
```

### 2. Test Global Installation

On another machine or after unlinking:
```bash
npm install -g pup-cli

# Or with other package managers
pnpm add -g pup-cli
yarn global add pup-cli
```

### 3. Test the Installed Package

```bash
pup --help
pup "test prompt"
```

---

## Common Issues & Solutions

### Issue: "You do not have permission to publish"
**Solution:** The package name is taken. Change the name in package.json or use a scoped name like `@yourusername/pup-cli`.

### Issue: "No README data"
**Solution:** Make sure README.md is not in .npmignore and exists in the project root.

### Issue: "Package name too similar to existing package"
**Solution:** Choose a more unique name. Try variations like:
- `prompt-improver-cli`
- `ai-prompt-enhancer`
- `@yourusername/pup-cli` (scoped package)

### Issue: "npm ERR! need auth"
**Solution:** Run `npm login` again and verify with `npm whoami`.

---

## Updating Your Package

When you make changes and want to publish a new version:

### 1. Update the Version

```bash
# For bug fixes (1.0.0 → 1.0.1)
npm version patch

# For new features (1.0.0 → 1.1.0)
npm version minor

# For breaking changes (1.0.0 → 2.0.0)
npm version major
```

This automatically updates package.json and creates a git tag.

### 2. Publish the Update

```bash
npm publish
```

### 3. Users Update Via

```bash
npm update -g pup-cli
```

---

## Making it a Scoped Package (Optional)

If the name `pup-cli` is taken, use a scoped package:

### 1. Update package.json
```json
{
  "name": "@yourusername/pup-cli",
  ...
}
```

### 2. Publish as Public
```bash
npm publish --access public
```

### 3. Users Install Via
```bash
npm install -g @yourusername/pup-cli
```

---

## Best Practices

### Before Every Publish

1. ✅ Test the CLI locally with `pnpm link --global`
2. ✅ Run `npm pack --dry-run` to verify contents
3. ✅ Update version number appropriately
4. ✅ Commit all changes to git
5. ✅ Test with a fresh install after publishing

### Version Numbering (Semantic Versioning)

- **1.0.x** - Bug fixes, no breaking changes
- **1.x.0** - New features, no breaking changes  
- **x.0.0** - Breaking changes that require user action

### Documentation

Keep your README.md updated with:
- Installation instructions
- Usage examples
- API key setup
- Changelog of what's new in each version

---

## Quick Reference

```bash
# Login to npm
npm login

# Verify contents
npm pack --dry-run

# Publish
npm publish

# Update version and publish
npm version patch
npm publish

# Check if published
npm view pup-cli
```

---

## Need Help?

- npm documentation: https://docs.npmjs.com/
- Publishing packages: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
- Semantic versioning: https://semver.org/

---

**You're ready to publish! 🚀**

After publishing, anyone in the world can install your CLI with:
```bash
npm install -g pup-cli
```
