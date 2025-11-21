# 博客系统设置指南

## 首次设置

### 1. 生成密码哈希

运行以下命令生成你的管理员密码哈希：

```bash
node scripts/generate-password-hash.js
```

按提示输入你想要的密码（至少6个字符）。

### 2. 创建环境变量文件

在项目根目录创建 `.env.local` 文件，并添加生成的内容：

```env
ADMIN_PASSWORD_HASH=<生成的哈希值>
SESSION_SECRET=<生成的随机字符串>
```

**重要**: 不要将 `.env.local` 提交到 Git！

### 3. 重启开发服务器

```bash
npm run dev
```

## 使用博客

### 访问博客
- 公开博客列表: http://localhost:3000/blog
- 查看文章: http://localhost:3000/blog/[文章slug]

### 管理博客（需要登录）
- 登录: http://localhost:3000/blog/login
- 管理后台: http://localhost:3000/blog/admin
- 创建新文章: http://localhost:3000/blog/admin/new
- 编辑文章: http://localhost:3000/blog/admin/edit/[文章slug]

### 写作技巧

博客支持 Markdown 格式：

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文字**
*斜体文字*

[链接文字](https://example.com)

- 列表项 1
- 列表项 2

> 引用文字

`代码`
```

## 文件结构

```
content/blog/          # 博客文章（Markdown 文件）
  └── welcome.md       # 示例文章
  
app/blog/              # 博客页面
  ├── page.tsx         # 博客列表
  ├── [slug]/          # 文章详情
  ├── login/           # 登录页面
  └── admin/           # 管理后台
      ├── page.tsx     # 管理首页
      ├── new/         # 创建新文章
      └── edit/        # 编辑文章

lib/
  ├── auth.ts          # 认证工具
  └── blog-utils.ts    # 博客工具

app/api/
  ├── auth/            # 认证 API
  └── blog/            # 博客 API
```

## 安全提示

1. **密码安全**: 使用强密码（至少8个字符，包含字母和数字）
2. **环境变量**: 永远不要提交 `.env.local` 到 Git
3. **生产环境**: 在 Vercel 部署时，在项目设置中添加环境变量

## 部署到 Vercel

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 在项目设置中添加环境变量：
   - `ADMIN_PASSWORD_HASH`
   - `SESSION_SECRET`
4. 部署完成！

## 常见问题

### Q: 忘记密码怎么办？
A: 重新运行 `node scripts/generate-password-hash.js` 生成新的哈希值，更新 `.env.local` 文件。

### Q: 如何添加多个管理员？
A: 当前系统设计为单管理员。如需多管理员，需要修改认证系统。

### Q: 博客文章存储在哪里？
A: 所有文章以 Markdown 文件形式存储在 `content/blog/` 目录中。

### Q: 可以导入现有的 Markdown 文章吗？
A: 可以！直接将 `.md` 文件放到 `content/blog/` 目录，确保包含正确的 frontmatter。

## 支持

如有问题，请联系：info@soupeed.com
