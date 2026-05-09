# Deploy and SSL

## Deploy script

- **`deploy-to-smb.sh`** (run via `make deploy`) only syncs `dist/` to the SMB share. On the server the tree is often `/data/websites/*`; on macOS the same share is typically mounted as `/Volumes/data/websites/gorfmusic.com`. It does not configure the web server or SSL.

## SSL on the server

SSL is configured on the server via nginx, not by this repo.

1. **Nginx vhost**  
   Copy `nginx/gorfmusic.com.conf` to the server (e.g. `/etc/nginx/vhosts.d/gorfmusic.com.conf`). The vhost **`root`** is set to **`/data/websites/gorfmusic.com`** so it matches the usual SMB/rsync target. If your files live elsewhere, edit `root` to that directory or add a symlink, e.g. `ln -s /actual/path /data/websites/gorfmusic.com`.

2. **HTTP 301**  
   Port 80 returns **301 → HTTPS**. That is normal. If the site still does not load, check TLS (cert paths), DNS, and that `root` contains `index.html`, the other built shells (`music.html`, `services.html`, `live.html`, `contact.html`), and `assets/` from `dist/`.

3. **Certificate**  
   If using Let's Encrypt:
   ```bash
   certbot certonly --nginx -d gorfmusic.com -d www.gorfmusic.com
   ```

4. **Reload**  
   After adding or changing the vhost and obtaining the cert:
   ```bash
   nginx -t && systemctl reload nginx
   ```

## Reference vhosts

Same server, different vhosts (for comparison):

- **gorfed.net** — `/Volumes/data/websites/gorfed.net`
- **promptboi.com** — `/Volumes/data/websites/promptboi.com`  
  Nginx example (with SSL commented) in the promptboi.com repo: `nginx-vhosts/promptboi.com.conf`, `nginx-vhost.conf`.  
  For gorfmusic.com, `nginx/gorfmusic.com.conf` is written with SSL enabled and HTTP→HTTPS redirect.
