import React, { useState } from 'react';

const TailwindPlayground = () => {
  const [activeCategory, setActiveCategory] = useState('layout');
  const [currentClasses, setCurrentClasses] = useState('flex items-center justify-center bg-blue-500 text-white p-4 rounded-lg');
  const [elementContent, setElementContent] = useState('Hello Tailwind!');
  const [elementType, setElementType] = useState('div');

  // Tailwind 属性分类
  const categories: Record<string, { name: string; icon: string; examples: string[] }> = {
    layout: {
      name: '布局',
      icon: '📐',
      examples: [
        'flex flex-col items-center justify-center',
        'grid grid-cols-3 gap-4',
        'block inline-block inline',
        'relative absolute fixed sticky',
        'container mx-auto',
        'w-full h-screen'
      ]
    },
    spacing: {
      name: '间距',
      icon: '📏',
      examples: ['p-4 px-6 py-2', 'm-4 mx-auto my-8', 'space-x-4 space-y-2', 'gap-4 gap-x-6 gap-y-2', 'pl-8 pr-4 pt-2 pb-6', 'ml-auto mr-4 mt-8 mb-2']
    },
    colors: {
      name: '颜色',
      icon: '🎨',
      examples: [
        'bg-blue-500 text-white',
        'bg-gradient-to-r from-purple-500 to-pink-500',
        'text-gray-800 bg-gray-100',
        'border-red-500 text-red-600',
        'bg-green-100 text-green-800',
        'bg-yellow-200 text-yellow-900'
      ]
    },
    typography: {
      name: '文字',
      icon: '📝',
      examples: [
        'text-xl font-bold text-center',
        'text-sm font-light italic',
        'uppercase tracking-wider',
        'text-left text-right text-justify',
        'leading-relaxed font-mono',
        'text-2xl font-extrabold underline'
      ]
    },
    borders: {
      name: '边框',
      icon: '🔲',
      examples: [
        'border border-gray-300 rounded',
        'border-2 border-blue-500 rounded-lg',
        'border-t-4 border-red-500',
        'rounded-full border-dashed',
        'ring-4 ring-purple-300',
        'divide-y divide-gray-200'
      ]
    },
    effects: {
      name: '效果',
      icon: '✨',
      examples: [
        'shadow-lg hover:shadow-xl',
        'opacity-75 hover:opacity-100',
        'transform hover:scale-105',
        'transition-all duration-300',
        'blur-sm hover:blur-none',
        'backdrop-blur-md bg-white/30'
      ]
    },
    responsive: {
      name: '响应式',
      icon: '📱',
      examples: [
        'text-sm md:text-base lg:text-lg',
        'hidden md:block lg:inline',
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        'p-2 md:p-4 lg:p-6',
        'w-full md:w-1/2 lg:w-1/3',
        'flex-col md:flex-row'
      ]
    },
    animation: {
      name: '动画',
      icon: '🎬',
      examples: ['animate-pulse', 'animate-bounce', 'animate-spin', 'animate-ping', 'hover:animate-pulse', 'transition-transform hover:rotate-6']
    }
  };

  // 预设模板
  const templates = {
    card: {
      name: '卡片',
      classes: 'bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto',
      content: '这是一个卡片组件'
    },
    button: {
      name: '按钮',
      classes: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200',
      content: '点击按钮'
    },
    badge: {
      name: '徽章',
      classes: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
      content: '新功能'
    },
    alert: {
      name: '提醒',
      classes: 'bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-700',
      content: '⚠️ 这是一个警告信息'
    },
    input: {
      name: '输入框',
      classes: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
      content: ''
    }
  };

  // 复制类名到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('已复制到剪贴板！');
    });
  };

  // 应用示例类名
  const applyExample = (classes: string) => {
    setCurrentClasses(classes);
  };

  // 应用模板
  const applyTemplate = (template: { classes: string; content: string }) => {
    setCurrentClasses(template.classes);
    setElementContent(template.content);
  };

  return (
    <div className="min-h-screen p-4">
      {/* 头部 */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">🎨 Tailwind CSS 实验室</h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">在这里实验和学习 Tailwind CSS 的各种属性，实时预览效果，快速掌握用法！</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：分类导航 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">📚 属性分类</h2>
            <div className="space-y-2">
              {Object.entries(categories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                    activeCategory === key ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* 快速模板 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">🚀 快速模板</h2>
            <div className="space-y-2">
              {Object.entries(templates).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => applyTemplate(template)}
                  className="w-full text-left px-4 py-2 rounded bg-green-100 hover:bg-green-200 text-green-800 transition-colors"
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 中间：预览区域 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">👀 实时预览</h2>

            {/* 元素类型选择 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">元素类型:</label>
              <select value={elementType} onChange={e => setElementType(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full">
                <option value="div">div</option>
                <option value="button">button</option>
                <option value="span">span</option>
                <option value="p">p</option>
                <option value="input">input</option>
                <option value="h1">h1</option>
                <option value="h2">h2</option>
                <option value="h3">h3</option>
              </select>
            </div>

            {/* 内容编辑 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">元素内容:</label>
              <input
                type="text"
                value={elementContent}
                onChange={e => setElementContent(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                placeholder="输入元素内容..."
              />
            </div>

            {/* 预览区域 */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 min-h-32 flex items-center justify-center">
              {React.createElement(
                elementType,
                {
                  className: currentClasses,
                  ...(elementType === 'input' ? { placeholder: elementContent || '输入框', value: '' } : {})
                },
                elementType !== 'input' ? elementContent : null
              )}
            </div>
          </div>

          {/* 当前类名显示 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">📋 当前类名</h3>
              <button
                onClick={() => copyToClipboard(currentClasses)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                复制
              </button>
            </div>
            <div className="bg-gray-100 rounded p-3 font-mono text-sm break-all">{currentClasses}</div>

            {/* 生成的代码 */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 mb-2">生成的 JSX:</h4>
              <div className="bg-gray-900 text-green-400 rounded p-3 font-mono text-sm overflow-x-auto">
                {`<${elementType} className="${currentClasses}"${elementType === 'input' ? ` placeholder="${elementContent}"` : ''}${
                  elementType === 'input' ? ' />' : `>\n  ${elementContent}\n</${elementType}>`
                }`}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：类名编辑器和示例 */}
        <div className="lg:col-span-1">
          {/* 类名编辑器 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">✏️ 类名编辑器</h2>
            <textarea
              value={currentClasses}
              onChange={e => setCurrentClasses(e.target.value)}
              className="w-full h-32 border border-gray-300 rounded p-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入 Tailwind CSS 类名..."
            />
            <div className="mt-2 text-xs text-gray-500">💡 提示：用空格分隔多个类名</div>
          </div>

          {/* 当前分类示例 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {categories[activeCategory]?.icon} {categories[activeCategory]?.name} 示例
            </h2>
            <div className="space-y-3">
              {categories[activeCategory]?.examples.map((example, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono flex-1 mr-2">{example}</code>
                    <button
                      onClick={() => applyExample(example)}
                      className="opacity-0 group-hover:opacity-100 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-all"
                    >
                      应用
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 底部说明 */}
      <div className="max-w-7xl mx-auto mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">🔥 使用技巧</h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• 点击左侧分类切换不同的属性类型</li>
          <li>• 在右侧示例中点击「应用」快速测试效果</li>
          <li>• 使用类名编辑器自由组合各种属性</li>
          <li>• 点击「复制」按钮将类名复制到剪贴板</li>
          <li>• 尝试组合多个不同分类的属性来创建复杂的样式</li>
          <li>• 使用快速模板作为起点，然后进行自定义修改</li>
        </ul>
      </div>
    </div>
  );
};

export default TailwindPlayground;
