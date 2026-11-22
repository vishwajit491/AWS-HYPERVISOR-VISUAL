# Architecture
Request path: Browser → DNS (Route 53) → Internet → Internet Gateway → Public subnet → Security Group (TCP 80) → ENI → EC2 (Nitro host) → NGINX → HTML/CSS/JS → rendered page.

Virtualization stack: Physical server → Nitro Cards (VPC, EBS, security) → Nitro Hypervisor (CPU/memory isolation) → vCPU/RAM/EBS/ENI → EC2 instance → guest OS → application.

Code layout: `virtualization.js` holds data (components, steps, movies); `animations.js` builds scenes, diagram and site markup; `app.js` handles state, autoplay, modal, theme.
