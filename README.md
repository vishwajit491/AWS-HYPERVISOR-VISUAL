# Virtualization in AWS – Hypervisor Visual

**Created by Cloud Messenger™** · Learn • Build • Visualize • Troubleshoot • Grow · #buildwithCloud-Messenger

An interactive, animated explainer of **Physical Server → AWS Nitro System → Nitro Hypervisor → Virtual Resources → EC2 Instances → Operating Systems → NGINX → Streaming Website**.

Website: https://cloudmessenger.in/ · LinkedIn: https://www.linkedin.com/in/cloud-messenger · GitHub: https://github.com/Cloud-Messenger

## Features
- 9 animated learning steps with sidebar, progress, Prev/Next, autoplay (5 s), pause/resume, reset
- Caption card per step: simple, technical, real-world, interview Q&A
- Clickable animated SVG architecture (6-field popup per component)
- Original fictional streaming site (CLOUDSTREAM) with categories, hover details and a demo player
- Dark/light mode, responsive, keyboard accessible, no build step

## Run locally
Open `index.html` in a browser. No Node, no server, no dependencies.

## Structure
```
index.html  css/style.css  js/{app,virtualization,animations}.js
diagrams/architecture.svg  docs/  assets/  .nojekyll  LICENSE
```

## Deploy
- **AWS EC2 + NGINX:** see [docs/aws-deployment.md](docs/aws-deployment.md)
- **GitHub Pages:** see below

### GitHub Pages
1. Create a new repository (e.g. `Virtualization-in-AWS-Hypervisor-Visual`).
2. Upload all project files (or use the Git commands below).
3. Repository **Settings → Pages**.
4. Source: **Deploy from a branch**; Branch: **main**; Folder: **/ (root)**.
5. Click **Save**, wait a minute, open `https://<username>.github.io/<repo>/`.

```bash
git init && git add . && git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<username>/Virtualization-in-AWS-Hypervisor-Visual.git
git push -u origin main
# future updates
git add . && git commit -m "Update" && git push
```
> GitHub Pages is **static hosting only**. It does not provide an AWS Nitro Hypervisor or an EC2 environment; the visual only *explains* them. Use EC2 to practise the real thing.

## Credits
Made with care by Cloud Messenger™ · © 2026 Cloud Messenger. All rights reserved.
The compilation, structure, layout, educational content and original visual design of this project are the intellectual work of Cloud Messenger.
