class Cache {
  constructor() {
    this.cache = {};
  }

  // Add an item to the cache
  add(key, value) {
    this.cache[key] = value;
    console.log(`Added key: ${key} with value: ${value}`);
  }

  // Get an item from the cache
  get(key) {
    if (this.cache.hasOwnProperty(key)) {
      return this.cache[key];
    } else {
      return null;
    }
  }

  // Remove an item from the cache
  remove(key) {
    if (this.cache.hasOwnProperty(key)) {
      delete this.cache[key];
    }
  }

  // Clear the entire cache
  clear() {
    this.cache = {};
  }

  // Check if a key exists in the cache
  has(key) {
    return this.cache.hasOwnProperty(key);
  }
}

const cache = new Cache()
export default cache