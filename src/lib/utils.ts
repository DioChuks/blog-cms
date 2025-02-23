import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function cleanImageUrl(url: string, baseURL?: string): string | null {
  // If no URL provided, return null
  if (!url) return null;

  // Check if the URL is a base64 string
  if (url.startsWith('data:image/')) {
    return url;
  }

  // Handle regular URLs
  // Remove any quotes around the URL
  console.log('original url: ', url);
  let cleaned = decodeURIComponent(url);
  console.log('decoded url: ',cleaned);
  
  // Remove any trailing slashes
  cleaned = cleaned.replace(/\/+$/g, '');
  console.log('removed trailing slashes: ', cleaned);

  // Remove any leading or trailing quotes (if any)
  cleaned = cleaned.replace(/^["']+|["']+$/g, ''); // This removes both leading and trailing quotes
  console.log('removed leading/trailing quotes: ', cleaned);

  // Handle localhost URLs and relative paths
  if (cleaned.startsWith("http://localhost")) {
    // Remove localhost prefix
    cleaned = cleaned.replace(/http:\/\/localhost:\d+\/?/g, '');
    console.log('removed localhost prefix: ', cleaned);
    
    // Remove any leading quotes or slashes
    cleaned = cleaned.replace(/^["'/]+/, '');
    console.log('removed leading quotes or slashes: ', cleaned);
    
    // If baseURL provided, use it as prefix if the cleaned is a relative path
    if (baseURL && !cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
      cleaned = baseURL + (cleaned.startsWith('/') ? cleaned : '/' + cleaned);
      console.log('added baseURL: ', cleaned);
    }
  } else if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    // Handle relative URLs
    if (baseURL) {
      cleaned = baseURL + (cleaned.startsWith('/') ? cleaned : '/' + cleaned);
      console.log('added baseURL: ',cleaned);
    } else {
      cleaned = 'https://' + cleaned;
    }
  }

  // Ensure https for non-localhost URLs
  if (baseURL) {
    console.log('baseURL: ', baseURL);
    if (cleaned.startsWith(baseURL)) {
      console.log('ensure baseURL: ', baseURL);
      cleaned = cleaned.replace(/^http:\/\//, 'https://');
      console.log('ensure https: ', cleaned);
    }
  }

  // Ensure no trailing slash after the cleanup
  cleaned = cleaned.replace(/\/+$/, ''); // Again, ensure no trailing slash
  console.log('final cleaned url without trailing slash: ', cleaned);

  return cleaned;
}

export function extractThumbnailAndSlug(content: string) {
  // Create a DOM parser to parse HTML content
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  // Get the first image
  const firstImage = doc.querySelector("img");
  const thumbnail = firstImage ? cleanImageUrl(firstImage.src, window.location.origin) : null;

  // Get the first h1 element and convert it to a slug 
  const firstH1 = doc.querySelector("h1");
  const slug = firstH1?.textContent
    ? firstH1.textContent
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove non-alphanumeric characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Remove excess hyphens
    : null;

  return { thumbnail, slug };
}