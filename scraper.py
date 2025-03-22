
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time
import re
import json

def scrape_instagram_stats(username):
    url = f"https://www.instagram.com/{username}/"

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = 
webdriver.Chrome(service=Service(ChromeDriverManager().install()), 
options=options)

    try:
        driver.get(url)
        time.sleep(5)

        page_source = driver.page_source
        matches = 
re.findall(r"(\d{1,3}(?:,\d{3})*(?:\.\d+)?[MK]?)\s(?:Followers|Following|Posts)", 
page_source, re.IGNORECASE)

        if len(matches) >= 3:
            followers = matches[0]
            following = matches[1]
            posts = matches[2]
        else:
            followers, following, posts = "N/A", "N/A", "N/A"

        if "M" in followers and len(followers) == 2:
            followers = followers.replace("M", ".1M")

        try:
            bio_element = driver.find_element(By.XPATH, 
"//meta[@name='description']")
            bio_content = bio_element.get_attribute("content")
            bio = bio_content.split("-")[0].strip()
        except:
            bio = "N/A"

        try:
            profile_pic_element = driver.find_element(By.XPATH, 
"//meta[@property='og:image']")
            profile_pic_url = profile_pic_element.get_attribute("content")
        except:
            profile_pic_url = "N/A"

        likes_list = []
        comments_list = []

        try:
            post_elements = driver.find_elements(By.XPATH, 
"//article//a[contains(@href, '/p/')]")[:5]
            post_links = [post.get_attribute("href") for post in 
post_elements]

            for link in post_links:
                driver.get(link)
                time.sleep(3)

                try:
                    likes_element = driver.find_element(By.XPATH, 
"//meta[@property='og:description']")
                    likes_text = likes_element.get_attribute("content")
                    likes_match = 
re.search(r'(\d{1,3}(?:,\d{3})*(?:\.\d+)?[KM]?) Likes', likes_text)

                    if likes_match:
                        likes_value = likes_match.group(1)
                        if "K" in likes_value:
                            likes_value = float(likes_value.replace("K", 
"")) * 1_000
                        elif "M" in likes_value:
                            likes_value = float(likes_value.replace("M", 
"")) * 1_000_000
                        likes_list.append(likes_value)
                    else:
                        likes_list.append(0)
                except:
                    likes_list.append(0)

                try:
                    comments_match = 
re.search(r'(\d{1,3}(?:,\d{3})*(?:\.\d+)?[KM]?) Comments', likes_text)

                    if comments_match:
                        comments_value = comments_match.group(1)
                        if "K" in comments_value:
                            comments_value = 
float(comments_value.replace("K", "")) * 1_000
                        elif "M" in comments_value:
                            comments_value = 
float(comments_value.replace("M", "")) * 1_000_000
                        comments_list.append(comments_value)
                    else:
                        comments_list.append(0)
                except:
                    comments_list.append(0)
        except:
            pass

        avg_likes = sum(likes_list) / len(likes_list) if likes_list else 
"N/A"
        avg_comments = sum(comments_list) / len(comments_list) if 
comments_list else "N/A"

        try:
            if avg_likes != "N/A" and followers != "N/A":
                if "M" in followers:
                    follower_count = float(followers.replace("M", "")) * 
1_000_000
                elif "K" in followers:
                    follower_count = float(followers.replace("K", "")) * 
1_000
                else:
                    follower_count = float(followers.replace(",", ""))

                engagement_rate = round(((avg_likes + avg_comments) / 
follower_count) * 100, 2)
            else:
                engagement_rate = "N/A"
        except:
            engagement_rate = "N/A"

        driver.quit()

        return {
            "username": username,
            "followers": followers,
            "following": following,
            "posts": posts,
            "bio": bio,
            "profile_picture": profile_pic_url,
            "engagement_rate": f"{engagement_rate}%" if engagement_rate != 
"N/A" else "N/A",
            "average_likes": avg_likes,
            "average_comments": avg_comments
        }

    except Exception as e:
        driver.quit()
        return {"error": str(e)}

if __name__ == "__main__":
    print(json.dumps(scrape_instagram_stats("patriciabright"), indent=4))

