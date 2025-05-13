import asyncio
import os
from twikit import Client

class TwitterBot:
    def __init__(self, username, email, password, cookies_file='cookies.json', locale='en-US'):
        self.username = username
        self.email = email
        self.password = password
        self.cookies_file = cookies_file
        self.client = Client(locale)

    async def login(self):
        # If cookies file exists, try to load it
        if os.path.exists(self.cookies_file):
            try:
                self.client.load_cookies(self.cookies_file)
                print("Logged in using existing cookies.")
                return
            except Exception as e:
                print(f"Failed to load cookies, logging in manually: {e}")
        
        # Fallback to full login if cookies not available or failed
        await self.client.login(
            auth_info_1=self.username,
            auth_info_2=self.email,
            password=self.password,
            cookies_file=self.cookies_file
        )
        print("Logged in and saved cookies.")

    async def search(self, query, filter_type='Latest'):
        tweets = await self.client.search_tweet(query, filter_type)
        return tweets

    async def run(self, query, filter_type='Latest'):
        await self.login()
        return await self.search(query, filter_type)

# Optional: utility to create a default bot
def create_default_bot():
    return TwitterBot(
        username='3000Annihi23293',
        email='alok.kumar.kr.ak@gmail.com',
        password='Alokkumar@123456'
    )

