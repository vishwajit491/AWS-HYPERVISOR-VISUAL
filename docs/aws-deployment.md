# Deploy on AWS EC2 (Amazon Linux 2023 + NGINX)

## 1. Launch
AMI: Amazon Linux 2023 · t3.micro/t3.small · key pair `.pem` · public subnet with auto-assign public IP.
Security Group inbound: **HTTP 80** from `0.0.0.0/0`; **SSH 22** from *your IP only* (`x.x.x.x/32`).

## 2. Connect
```bash
chmod 400 mykey.pem
ssh -i mykey.pem ec2-user@<EC2_PUBLIC_IP>
```
## 3. Install NGINX
```bash
sudo dnf update -y
sudo dnf install -y nginx
sudo systemctl enable --now nginx
systemctl status nginx
```
## 4. Upload files (from your computer)
```bash
scp -i mykey.pem -r Virtualization-in-AWS-Hypervisor-Visual/. ec2-user@<EC2_PUBLIC_IP>:/tmp/site/
```
## 5. Publish and set permissions (on the server)
```bash
sudo rm -rf /usr/share/nginx/html/*
sudo cp -r /tmp/site/. /usr/share/nginx/html/
sudo chown -R nginx:nginx /usr/share/nginx/html
sudo find /usr/share/nginx/html -type d -exec chmod 755 {} \;
sudo find /usr/share/nginx/html -type f -exec chmod 644 {} \;
sudo nginx -t && sudo systemctl reload nginx
```
## 6. Test
```bash
curl -I http://localhost
```
Browser: `http://<EC2_PUBLIC_IP>` (use http, not https, unless you add a certificate).

## Troubleshooting
| Symptom | Check |
|---|---|
| Timeout | Security Group port 80, subnet route to Internet Gateway, public IP assigned, NACL |
| SSH refused/timeout | Port 22 source IP changed, key `chmod 400`, user is `ec2-user` |
| 403 Forbidden | Ownership/permissions (step 5), `index.html` exists in `/usr/share/nginx/html` |
| 404 | Files copied into a sub-folder; check `ls /usr/share/nginx/html` |
| NGINX not running | `sudo nginx -t`, `sudo journalctl -u nginx`, `/var/log/nginx/error.log` |
| Old page after update | Hard refresh (Ctrl+Shift+R) |
| SELinux denial (if enforcing) | `sudo restorecon -Rv /usr/share/nginx/html` |
