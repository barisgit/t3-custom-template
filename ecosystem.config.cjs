module.exports = {
  apps: [
    {
      name: "custom-t3-template",
      script: "/home/blaz/.bun/bin/bun",
      args: "start",
      cwd: ".",
      instances: "1",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PATH: "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/blaz/.bun/bin",
        USER: "blaz",
        HOME: "/home/blaz",
      },
      // Add error logging
      error_file: "/home/blaz/logs/custom-t3-template-error.log",
      out_file: "/home/blaz/logs/custom-t3-template-out.log",
    },
  ],

  deploy: {
    production: {
      user: "blaz",
      host: "185.196.21.69",
      ref: "", // FIXME: Add ref
      repo: "", // FIXME: Add repo
      path: "/home/blaz/apps/custom-t3-template",
      "pre-deploy-local": "",
      "post-deploy":
        "export PATH=/home/blaz/.bun/bin:$PATH && " +
        "bun install && " +
        "bun prisma generate || (echo 'Prisma generate failed' && exit 1) && " +
        "bun run build && " +
        "pm2 reload ecosystem.config.cjs --env production",
      "pre-setup": "",
    },
  },
};
