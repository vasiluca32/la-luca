export function calculateReadTime(text) {
  const wordsPerMinute = 200;
  const textStripped = text.replace(/<[^>]+>/g, ''); // remove HTML tags
  const wordCount = textStripped.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}
