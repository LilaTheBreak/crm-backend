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
    options.add_argument("--headless")  # Run in headless mode (no UI)
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    try:
        driver.get(url)
        time.sleep(5)  # Wait for page to load

        # ✅ Extract stats
        page_source = driver.page_source
        matches = re.findall(r"(\d{1,3}(?:,\d{3})*(?:\.\d+)?[MK]?)\s(?:Followers|Following|Posts)", page_source, re.IGNORECASE)

        followers = matches[0] if len(matches) > 0 else "N/A"
        following = matches[1] if len(matches) > 1 else "N/A"
        posts = matches[2] if len(matches) > 2 else "N/A"

        if "M" in followers and len(followers) == 2:
            followers = followers.replace("M", ".1M")

        # ✅ Extract bio
        try:
            bio_element = driver.find_element(By.XPATH, "//meta[@name='description']")
            bio_content = bio_element.get_attribute("content")
            bio = bio_content.split("-")[0].strip()
        except:
            bio = "N/A"

        # ✅ Extract profile pic
        try:
            profile_pic_element = driver.find_element(By.XPATH, "//meta[@property='og:image']")
            profile_pic_url = profile_pic_element.get_attribute("content")
        except:
            profile_pic_url = "N/A"

        # ✅ Likes & comments
        likes_list, comments_list = [], []

        try:
            posts_elements = driver.find_elements(By.XPATH, "//article//a[contains(@href, '/p/')]")[:5]
            post_links = [post.get_attribute("href") for post in posts_elements]

            for link in post_links:
                driver.get(link)
                time.sleep(3)

                try:
                    meta = driver.find_element(By.XPATH, "//meta[@property='og:description']")
                    content = meta.get_attribute("content")
                    likes_match = re.search(r'(\d{1,3}(?:,\d{3})*(?:\.\d+)?[KM]?) Likes', content)
                    comments_match = re.search(r'(\d{1,3}(?:,\d{3})*(?:\.\d+)?[KM]?) Comments', content)

                    def parse_metric(value):
                        if "K" in value:
                            return float(value.replace("K", "")) * 1_000
                        elif "M" in value:
                            return float(value.replace("M", "")) * 1_000_000
                        return float(value.replace(",", ""))

                    likes = parse_metric(likes_match.group(1)) if likes_match else 0
                    comments = parse_metric(comments_match.group(1)) if comments_match else 0

                    likes_list.append(likes)
                    comments_list.append(comments)

                except:
                    likes_list.append(0)
                    comments_list.append(0)
        except:
            pass

        avg_likes = sum(likes_list) / len(likes_list) if likes_list else "N/A"
        avg_comments = sum(comments_list) / len(comments_list) if comments_list else "N/A"

        try:
            if avg_likes != "N/A" and followers != "N/A":
                if "M" in followers:
                    follower_count = float(followers.replace("M", "")) * 1_000_000
                elif "K" in followers:
                    follower_count = float(followers.replace("K", "")) * 1_000
                else:
                    follower_count = float(followers.replace(",", ""))

                engagement = ((avg_likes + avg_comments) / follower_count) * 100
                engagement_rate = f"{round(engagement, 2)}%"
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
            "average_likes": avg_likes,
            "average_comments": avg_comments,
            "engagement_rate": engagement_rate
        }

    except Exception as e:
        driver.quit()
        return {"error": str(e)}

# ✅ Local test
if __name__ == "__main__":
    print(json.dumps(scrape_instagram_stats("patriciabright"), indent=2))
