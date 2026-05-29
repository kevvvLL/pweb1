# 从 Vercel 迁移到 Cloudflare Workers（OpenNext）

本项目已经从 Vercel 改造为可部署到 **Cloudflare Workers**（用官方推荐的
`@opennextjs/cloudflare` 适配器）。博客数据从 **Vercel Blob 换成了 Cloudflare KV**。

下面按顺序做即可。需要先安装好 Node 20+ 和一个 Cloudflare 账号（你已经有域名了）。

---

## 一、本地准备

```bash
npm install
```

新增/改动的关键文件：
- `wrangler.jsonc` —— Cloudflare 部署配置（含 KV 绑定）
- `open-next.config.ts` —— OpenNext 适配器配置
- `cloudflare-env.d.ts` —— 绑定的类型
- `lib/blog-utils.ts` —— 已从 `@vercel/blob` 改为 Cloudflare KV
- `next.config.ts` —— 已接入 OpenNext
- `.dev.vars.example` —— 本地环境变量示例

---

## 二、登录 Cloudflare 并创建 KV

```bash
npx wrangler login
npx wrangler kv namespace create BLOG_KV
```

第二条命令会输出一段 id，例如：
```
[[kv_namespaces]]
binding = "BLOG_KV"
id = "abcd1234..."
```
把这个 **id** 填到 `wrangler.jsonc` 里 `REPLACE_WITH_YOUR_KV_NAMESPACE_ID` 的位置。

---

## 三、设置密钥（环境变量）

部署到线上时，密钥用 `wrangler secret` 设置（不要提交进 Git）：

```bash
npx wrangler secret put ADMIN_PASSWORD_HASH
npx wrangler secret put SESSION_SECRET
```

- `ADMIN_PASSWORD_HASH`：你的后台密码哈希。沿用原值即可，或用
  `node scripts/generate-password-hash.js` 重新生成。
- `SESSION_SECRET`：一段足够长的随机字符串（越长越好）。

> 本地预览时，把 `.dev.vars.example` 复制成 `.dev.vars` 并填好值即可。

---

## 四、本地预览（可选但推荐）

```bash
npm run preview
```
这会在本地用 Workers 运行时跑一遍，确认登录、博客读写都正常。

---

## 五、部署

```bash
npm run deploy
```
首次部署后会得到一个 `https://pweb1.<你的账号>.workers.dev` 地址，先打开确认能访问。

---

## 六、绑定你的域名

在 Cloudflare 控制台：
1. 进入 **Workers & Pages → 你的 Worker（pweb1） → Settings → Domains & Routes**
2. 点 **Add → Custom Domain**，填你的域名（如 `www.example.com` 或根域名）
3. 因为域名已经在 Cloudflare，DNS 和 HTTPS 证书会自动配置好

完成后用你自己的域名访问即可。最后去 Vercel 把旧项目停掉/删掉，避免继续计费。

---

## 七、迁移旧博客数据（如果 Vercel 上已有文章）

旧文章原本存在 Vercel Blob 里（`posts/<slug>.json`）。新方案存在 KV。
如果你线上已经写过文章、想保留：

1. 在 Vercel 控制台的 Blob 存储里，把每个 `posts/xxx.json` 下载下来。
2. 用下面命令逐个写进 KV（slug 用文件名，不含 .json）：
   ```bash
   npx wrangler kv key put --binding BLOG_KV "posts/<slug>" --path ./xxx.json --remote
   ```
   或在控制台 **Workers & Pages → KV → 你的命名空间** 里手动添加键值。

如果之前没正式发过文章，这步可以跳过，直接登录后台 `/blog/admin` 重新写。

---

## 常见问题

- **构建时报 "Failed to fetch font Roboto"**：是网络问题，构建机要能访问
  Google Fonts。本地或 Cloudflare Workers Builds（CI）联网正常时不会出现。
- **打开博客报 BLOG_KV 未找到**：`wrangler.jsonc` 里的 KV id 没填或填错。
- **用 GitHub 自动部署**：也可以在 Cloudflare 控制台用 **Workers Builds** 连接你的
  GitHub 仓库，构建命令 `npx opennextjs-cloudflare build`，并在
  "Build variables and secrets" 里配置上面那两个密钥。
