'use client';

interface SocialShareProps {
  productName: string;
  productUrl: string;
}

export function SocialShare({ productName, productUrl }: SocialShareProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : productUrl;

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(productName);

    let shareLink = '';

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'pinterest':
        shareLink = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`;
        break;
      default:
        return;
    }

    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => handleShare('facebook')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-800 text-white hover:bg-blue-900 transition-colors"
        aria-label="Share on Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <span className="text-sm font-medium">Share</span>
      </button>
      <button
        onClick={() => handleShare('twitter')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition-colors"
        aria-label="Share on Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="text-sm font-medium">Tweet</span>
      </button>
      <button
        onClick={() => handleShare('pinterest')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
        aria-label="Share on Pinterest"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.871-1.878.093-.354.561-2.182.561-2.182.292.56 1.146 1.051 2.053 1.051 2.705 0 4.537-2.491 4.537-5.818 0-2.378-2.038-4.277-5.204-4.277-3.855 0-5.838 2.808-5.838 5.728 0 1.733.656 3.27 2.06 3.847.23.095.354.053.408-.145.039-.15.25-.975.329-1.34.107-.4.066-.54-.23-.895-.645-.76-1.056-1.748-1.056-3.144 0-4.024 2.91-7.72 7.576-7.72 3.97 0 6.884 2.894 6.884 6.762 0 3.947-2.48 7.112-6.041 7.112-1.18 0-2.293-.616-2.674-1.718l-.728 2.764c-.263 1.023-1.015 2.305-1.509 3.088C9.23 18.817 10.568 19 12 19c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
        <span className="text-sm font-medium">Pinterest</span>
      </button>
    </div>
  );
}

