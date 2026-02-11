'use client';

import { useState, useMemo } from 'react';
import { Tag, Sun, Moon, Copy, Check, Image, Link, Search, Share2, AtSign } from 'lucide-react';

interface MetaData {
  title: string;
  description: string;
  siteName: string;
  url: string;
  imageUrl: string;
  author: string;
  keywords: string;
  twitterHandle: string;
  type: 'website' | 'article' | 'product';
}

const defaultData: MetaData = {
  title: 'My Awesome Website',
  description: 'A compelling description of your website that will appear in search results and social media shares.',
  siteName: 'My Site',
  url: 'https://example.com',
  imageUrl: 'https://example.com/og-image.jpg',
  author: 'John Doe',
  keywords: 'web development, seo, meta tags',
  twitterHandle: '@myhandle',
  type: 'website',
};

export default function Home() {
  const [data, setData] = useState<MetaData>(defaultData);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'basic' | 'og' | 'twitter'>('all');
  const [darkMode, setDarkMode] = useState(true);

  const updateField = (field: keyof MetaData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const generatedCode = useMemo(() => {
    const basic = `<!-- Basic Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.title}</title>
<meta name="description" content="${data.description}">
<meta name="author" content="${data.author}">
<meta name="keywords" content="${data.keywords}">
<link rel="canonical" href="${data.url}">`;

    const og = `
<!-- Open Graph / Facebook -->
<meta property="og:type" content="${data.type}">
<meta property="og:url" content="${data.url}">
<meta property="og:title" content="${data.title}">
<meta property="og:description" content="${data.description}">
<meta property="og:image" content="${data.imageUrl}">
<meta property="og:site_name" content="${data.siteName}">`;

    const twitter = `
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${data.url}">
<meta name="twitter:title" content="${data.title}">
<meta name="twitter:description" content="${data.description}">
<meta name="twitter:image" content="${data.imageUrl}">
<meta name="twitter:creator" content="${data.twitterHandle}">`;

    switch (activeTab) {
      case 'basic': return basic;
      case 'og': return og.trim();
      case 'twitter': return twitter.trim();
      default: return basic + '\n' + og + '\n' + twitter;
    }
  }, [data, activeTab]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const titleLength = data.title.length;
  const descLength = data.description.length;

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      {/* Header */}
      <header className={`border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">SEO Meta Generator</h1>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Generate perfect meta tags instantly</p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'}`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div className={`rounded-xl p-4 sm:p-6 ${darkMode ? 'bg-zinc-900' : 'bg-white'} shadow-lg`}>
              <h2 className="text-lg font-semibold mb-4">Page Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Page Title
                    <span className={`ml-2 text-xs ${titleLength > 60 ? 'text-red-500' : titleLength > 50 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {titleLength}/60
                    </span>
                  </label>
                  <input
                    type="text"
                    value={data.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-zinc-800 border-zinc-700 focus:border-indigo-500' 
                        : 'bg-zinc-50 border-zinc-300 focus:border-indigo-500'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                    placeholder="Your page title"
                  />
                  {titleLength > 60 && (
                    <p className="text-xs text-red-500 mt-1">Title may be truncated in search results</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                    <span className={`ml-2 text-xs ${descLength > 160 ? 'text-red-500' : descLength > 140 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {descLength}/160
                    </span>
                  </label>
                  <textarea
                    value={data.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-zinc-800 border-zinc-700 focus:border-indigo-500' 
                        : 'bg-zinc-50 border-zinc-300 focus:border-indigo-500'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                    placeholder="A compelling description of your page"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Site Name</label>
                    <input
                      type="text"
                      value={data.siteName}
                      onChange={(e) => updateField('siteName', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-zinc-800 border-zinc-700 focus:border-indigo-500' 
                          : 'bg-zinc-50 border-zinc-300 focus:border-indigo-500'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                      placeholder="My Site"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Content Type</label>
                    <select
                      value={data.type}
                      onChange={(e) => updateField('type', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-zinc-800 border-zinc-700 focus:border-indigo-500' 
                          : 'bg-zinc-50 border-zinc-300 focus:border-indigo-500'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                    >
                      <option value="website">Website</option>
                      <option value="article">Article</option>
                      <option value="product">Product</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Page URL</label>
                  <input
                    type="url"
                    value={data.url}
                    onChange={(e) => updateField('url', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-zinc-800 border-zinc-700 focus:border-indigo-500' 
                        : 'bg-zinc-50 border-zinc-300 focus:border-indigo-500'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">OG Image URL</label>
                  <input
                    type="url"
                    value={data.imageUrl}
                    onChange={(e) => updateField('imageUrl', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-zinc-800 border-zinc-700 focus:border-indigo-500' 
                        : 'bg-zinc-50 border-zinc-300 focus:border-indigo-500'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                    placeholder="https://example.com/og-image.jpg"
                  />
                  <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Recommended: 1200x630px</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Author</label>
                    <input
                      type="text"
                      value={data.author}
                      onChange={(e) => updateField('author', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-zinc-800 border-zinc-700 focus:border-indigo-500' 
                          : 'bg-zinc-50 border-zinc-300 focus:border-indigo-500'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Twitter Handle</label>
                    <input
                      type="text"
                      value={data.twitterHandle}
                      onChange={(e) => updateField('twitterHandle', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-zinc-800 border-zinc-700 focus:border-indigo-500' 
                          : 'bg-zinc-50 border-zinc-300 focus:border-indigo-500'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                      placeholder="@myhandle"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Keywords</label>
                  <input
                    type="text"
                    value={data.keywords}
                    onChange={(e) => updateField('keywords', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-zinc-800 border-zinc-700 focus:border-indigo-500' 
                        : 'bg-zinc-50 border-zinc-300 focus:border-indigo-500'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                    placeholder="seo, meta tags, web development"
                  />
                  <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Comma-separated keywords</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            {/* Google Preview */}
            <div className={`rounded-xl p-4 sm:p-6 ${darkMode ? 'bg-zinc-900' : 'bg-white'} shadow-lg`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-500" />
                Google Preview
              </h2>
              <div className={`rounded-lg p-4 ${darkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
                <div className="text-sm text-green-600 truncate">{data.url}</div>
                <div className="text-lg sm:text-xl text-blue-600 hover:underline cursor-pointer truncate">{data.title || 'Page Title'}</div>
                <div className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} line-clamp-2`}>
                  {data.description || 'Page description will appear here...'}
                </div>
              </div>
            </div>

            {/* Open Graph Preview */}
            <div className={`rounded-xl p-4 sm:p-6 ${darkMode ? 'bg-zinc-900' : 'bg-white'} shadow-lg`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-blue-600" />
                Facebook / LinkedIn
              </h2>
              <div className={`rounded-lg overflow-hidden border ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
                <div className={`h-40 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'} flex items-center justify-center`}>
                  {data.imageUrl ? (
                    <span className={`text-sm px-4 text-center ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Image: {data.imageUrl}</span>
                  ) : (
                    <Image className={`w-12 h-12 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`} />
                  )}
                </div>
                <div className={`p-3 ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
                  <div className={`text-xs uppercase ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{new URL(data.url || 'https://example.com').hostname}</div>
                  <div className="font-semibold truncate">{data.title || 'Page Title'}</div>
                  <div className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} line-clamp-2`}>
                    {data.description || 'Description'}
                  </div>
                </div>
              </div>
            </div>

            {/* Twitter Preview */}
            <div className={`rounded-xl p-4 sm:p-6 ${darkMode ? 'bg-zinc-900' : 'bg-white'} shadow-lg`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AtSign className="w-5 h-5" />
                Twitter/X Card
              </h2>
              <div className={`rounded-xl overflow-hidden border ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
                <div className={`h-40 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'} flex items-center justify-center`}>
                  {data.imageUrl ? (
                    <span className={`text-sm px-4 text-center ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Image: {data.imageUrl}</span>
                  ) : (
                    <Image className={`w-12 h-12 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`} />
                  )}
                </div>
                <div className={`p-3 ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
                  <div className="font-semibold truncate">{data.title || 'Page Title'}</div>
                  <div className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} line-clamp-2`}>
                    {data.description || 'Description'}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'} flex items-center gap-1 mt-1`}>
                    <Link className="w-3 h-3" />
                    {new URL(data.url || 'https://example.com').hostname}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Code */}
        <div className={`mt-6 sm:mt-8 rounded-xl p-4 sm:p-6 ${darkMode ? 'bg-zinc-900' : 'bg-white'} shadow-lg`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold">Generated Meta Tags</h2>
            <div className="flex flex-wrap items-center gap-2">
              <div className={`flex rounded-lg overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                {(['all', 'basic', 'og', 'twitter'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-indigo-600 text-white'
                        : darkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {tab === 'all' ? 'All' : tab === 'basic' ? 'Basic' : tab === 'og' ? 'OG' : 'Twitter'}
                  </button>
                ))}
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
          <pre className={`rounded-lg p-4 overflow-x-auto text-xs sm:text-sm ${darkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
            <code className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>{generatedCode}</code>
          </pre>
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t mt-12 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
            Built by Gaspi &bull; SEO Meta Generator
          </p>
        </div>
      </footer>
    </div>
  );
}
