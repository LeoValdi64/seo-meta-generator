'use client';

import { useState, useMemo } from 'react';

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
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">SEO Meta Generator</h1>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Generate perfect meta tags instantly</p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'}`}
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-zinc-900' : 'bg-white'} shadow-lg`}>
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

                <div className="grid grid-cols-2 gap-4">
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

                <div className="grid grid-cols-2 gap-4">
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
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-zinc-900' : 'bg-white'} shadow-lg`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google Preview
              </h2>
              <div className={`rounded-lg p-4 ${darkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
                <div className="text-sm text-green-600 truncate">{data.url}</div>
                <div className="text-xl text-blue-600 hover:underline cursor-pointer truncate">{data.title || 'Page Title'}</div>
                <div className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} line-clamp-2`}>
                  {data.description || 'Page description will appear here...'}
                </div>
              </div>
            </div>

            {/* Open Graph Preview */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-zinc-900' : 'bg-white'} shadow-lg`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook / LinkedIn
              </h2>
              <div className={`rounded-lg overflow-hidden border ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
                <div className={`h-40 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'} flex items-center justify-center`}>
                  {data.imageUrl ? (
                    <span className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Image: {data.imageUrl}</span>
                  ) : (
                    <svg className={`w-12 h-12 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
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
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-zinc-900' : 'bg-white'} shadow-lg`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Twitter/X Card
              </h2>
              <div className={`rounded-xl overflow-hidden border ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
                <div className={`h-40 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'} flex items-center justify-center`}>
                  {data.imageUrl ? (
                    <span className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Image: {data.imageUrl}</span>
                  ) : (
                    <svg className={`w-12 h-12 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <div className={`p-3 ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
                  <div className="font-semibold truncate">{data.title || 'Page Title'}</div>
                  <div className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} line-clamp-2`}>
                    {data.description || 'Description'}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'} flex items-center gap-1 mt-1`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    {new URL(data.url || 'https://example.com').hostname}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Code */}
        <div className={`mt-8 rounded-xl p-6 ${darkMode ? 'bg-zinc-900' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Generated Meta Tags</h2>
            <div className="flex items-center gap-2">
              <div className={`flex rounded-lg overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                {(['all', 'basic', 'og', 'twitter'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-sm font-medium transition-colors ${
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
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Code
                  </>
                )}
              </button>
            </div>
          </div>
          <pre className={`rounded-lg p-4 overflow-x-auto text-sm ${darkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
            <code className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>{generatedCode}</code>
          </pre>
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t mt-12 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
            Built with 🦝 by Gaspi • SEO Meta Generator
          </p>
        </div>
      </footer>
    </div>
  );
}
