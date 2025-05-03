const catchAsync = require("../utils/catchAsync")
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

exports.getTopDisasterTweets = catchAsync(async (req, res, next) => {
    // const { username } = req.params;
    // const maxTweets = parseInt(req.query.max_tweets) || 10;
    // const username = 'Top_Disaster'
    // const maxTweets = 10

    // // Get user ID from username
    // const user = await client.v2.userByUsername(username);
    // if (!user.data) {
    //     return res.status(404).json({ error: 'User not found' });
    // }

    // const userId = user.data.id;

    // // Fetch user's tweets
    // const tweets = await client.v2.userTimeline(userId, {
    //     max_results: Math.min(maxTweets, 100),
    //     'tweet.fields': ['created_at', 'text', 'public_metrics', "media_metadata"],
    // });

    // const tweetList = [];
    // for await (const tweet of tweets) {
    //     tweetList.push({
    //         id: tweet.id,
    //         text: tweet.text,
    //         created_at: tweet.created_at,
    //         likes: tweet.public_metrics.like_count,
    //         retweets: tweet.public_metrics.retweet_count,
    //     });
    // }

    // console.log(tweetList)

    // res.json({ username, tweets: tweetList });
    res.send({})
});
