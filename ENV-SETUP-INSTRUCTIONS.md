# 环境变量设置

请在项目根目录创建 `.env.local` 文件，并添加以下内容：

```env
ADMIN_PASSWORD_HASH=$2b$10$HgsKUpF/9fjTC6rCJi6/JOhWA0e5abKZQ2hJm7ceHAOIUxgm889cq
SESSION_SECRET=f56bapj1xz5bjefjhm2t3
```

**当前密码**: `admin123`

**重要提示**:
1. 这个文件已经被 `.gitignore` 忽略，不会被提交到 Git
2. 如果你想更改密码，运行 `node scripts/generate-password-hash.js` 重新生成
3. 部署到 Vercel 时，需要在项目设置中添加这些环境变量

## 手动创建步骤

1. 在项目根目录（`c:\Users\63282\pweb1\pweb1\`）创建文件 `.env.local`
2. 复制上面的内容到文件中
3. 保存文件
4. 重启开发服务器（如果正在运行）

创建完成后，你就可以使用密码 `admin123` 登录博客管理后台了！
