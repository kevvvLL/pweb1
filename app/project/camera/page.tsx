export default function CameraProjectPage() {
    return (
        <main className="flex flex-col min-h-screen p-6">
            <div className="flex-grow max-w-4xl mx-auto">
                <h1 className="font-sans text-4xl font-bold text-white bg-gray-800 px-4 py-2 rounded inline-block mb-6">
                    Camera Project
                </h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">关于这个项目</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Camera 是一个简单而强大的网页相机应用。它允许你直接在浏览器中拍照、添加文字标注，并保存到本地设备。
                            无需安装任何软件，完全基于浏览器运行。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">主要功能</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>📷 实时相机预览</li>
                            <li>✏️ 添加文字标注到照片</li>
                            <li>💾 保存带标注的照片到本地</li>
                            <li>🔄 重新拍摄功能</li>
                            <li>🎨 简洁直观的用户界面</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">技术特点</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>纯前端实现，无需后端服务器</li>
                            <li>使用 HTML5 Canvas API 进行图像处理</li>
                            <li>响应式设计，支持移动设备</li>
                            <li>隐私保护：所有处理都在本地完成</li>
                        </ul>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-3">访问应用</h2>
                        <p className="text-gray-700 mb-4">
                            点击下面的链接访问 Camera 应用：
                        </p>
                        <a
                            href="http://cam.soupeed.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                        >
                            打开 Camera App →
                        </a>
                    </section>

                    <section className="mt-8 pt-6 border-t border-gray-200">
                        <a
                            href="/project"
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            ← 返回项目列表
                        </a>
                    </section>
                </div>
            </div>

            <footer className="w-full mt-8">
                <p className="text-gray-600 text-center">info@soupeed.com</p>
            </footer>
        </main>
    );
}
