const axios = require("axios");

class BatchData {
  constructor(apiList, batchSize = 5) {
    this.apiList = apiList;
    this.batchSize = batchSize;
  }

  async fetchData(url) {
    const res = await axios.get(url);

    if (res.data?.data?.DATA) return res.data?.data?.DATA;

    if (res.data) return res.data;

    return [];
  }

  async processRandomItem(parentPort) {
    const tasks = this.apiList.map(async (url) => {
      try {
        let dataArray = await this.fetchData(url);

        // GET DATA FROM ROUTE
        if (url === "http://localhost:8000/twikit-x-cached") {
          dataArray = this.deduplicatePostsFromTwikit(dataArray);

          const extractedTitlesFromDataArray =
            this.extractFullTextAsTitles(dataArray);

          const titleDetails = await axios.post(
            "http://127.0.0.1:8000/analyze",
            extractedTitlesFromDataArray
          );

          parentPort.postMessage({
            event: "DATA_FROM_WORKER",
            data: {
              source: "twikit",
              data: dataArray,
              titleDetails: titleDetails.data,
            },
          });
        } else if (
          url === "http://localhost:6010/api/test/xposts-mock?source=x"
        ) {
          const extractedTitlesFromDataArray =
            this.extractFullTextAsTitlesXMock(dataArray);

          const titleDetails = await axios.post(
            "http://127.0.0.1:8000/analyze",
            extractedTitlesFromDataArray
          );

          parentPort.postMessage({
            event: "DATA_FROM_WORKER",
            data: {
              source: "xposts",
              data: dataArray,
              titleDetails: titleDetails.data,
            },
          });
        }
      } catch (err) {
        parentPort.postMessage(`Failed to fetch ${url}: ${err.message}`);
      }
    });

    await Promise.allSettled(tasks);
  }

  async processBatch(parentPort) {
    const tasks = this.apiList.map(async (url) => {
      try {
        const dataArray = await this.fetchData(url);
        const shuffled = dataArray.sort(() => 0.5 - Math.random());
        const batch = shuffled.slice(0, this.batchSize);
        parentPort.postMessage({ event: "DATA_FROM_WORKER", data: batch });
      } catch (err) {
        parentPort.postMessage(`Failed to fetch ${url}: ${err.message}`);
      }
    });

    await Promise.allSettled(tasks);
  }

  deduplicatePosts(posts) {
    const titleContentMap = new Map(); // (title+content) to post
    const contentMap = new Map(); // content to post ID to detect same content with diff titles
    const titleGroupMap = new Map(); // title to list of posts with different content

    const result = [];

    for (const post of posts) {
      const title = (post.title || "").trim();
      const content = post.content?.trim() ?? null;

      const titleKey = title.toLowerCase();
      const contentKey = content?.toLowerCase() ?? null;
      const uniqueKey = `${titleKey}::${contentKey}`;

      // 1. Skip exact duplicates
      if (titleContentMap.has(uniqueKey)) continue;

      // 2. Remove duplicates by same content (non-null) but different title
      if (contentKey && contentMap.has(contentKey)) continue;

      // Save to exact duplicate checker
      titleContentMap.set(uniqueKey, post);

      // Track content used
      if (contentKey) {
        contentMap.set(contentKey, post._id);
      }

      // 3. Group same title with different content
      if (!titleGroupMap.has(titleKey)) {
        titleGroupMap.set(titleKey, []);
      }

      const group = titleGroupMap.get(titleKey);

      // If content differs from what's already in group, push it
      if (
        !group.some(
          (p) => (p.content ?? "").trim().toLowerCase() === contentKey
        )
      ) {
        group.push(post);
      }
    }

    // Collect only unique groups
    for (const group of titleGroupMap.values()) {
      if (group.length === 1) {
        result.push(group[0]); // Only one post, just push it
      } else {
        result.push(...group); // Same title, different contents
      }
    }

    return result;
  }

  deduplicatePostsFromTwikit(posts) {
    const seen = new Set();
    const result = [];

    for (const post of posts) {
      const fullText = (post.full_text || "").trim();

      // Treat null/empty full_text as unique
      if (!fullText) {
        result.push(post);
        continue;
      }

      if (!seen.has(fullText)) {
        seen.add(fullText);
        result.push(post);
      }
    }

    return result;
  }

  extractFullTextAsTitles(posts) {
    const titles = posts
      .map((post) => post.full_text)
      .filter((text) => typeof text === "string" && text.trim() !== "");

    return { titles };
  }

  extractFullTextAsTitlesXMock(posts) {
    const titles = (posts || [])
      .map((item) => item.title)
      .filter((title) => typeof title === "string" && title.trim() !== "");

    return { titles };
  }
}

module.exports = BatchData;
