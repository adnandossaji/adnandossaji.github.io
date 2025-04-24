---
title: "Creating a Website for Free with GitHub Pages, Babel, and React"
author: "Adnan Dossaji"
description: "In this guide, I'll walk you through how I crafted my own website, entirely for free, utilizing GitHub Pages and a basic React DOM CDN static app."
pubDate: "Jun 24 2023"
heroImage: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
---

Hello there! Adnan here. In today's rapidly advancing digital era, carving out your own personal space on the web is increasingly important. The best part? You don't need to shell out a fortune to do so. In this guide, I'll walk you through how I crafted my own website, entirely for free, utilizing GitHub Pages and a basic React DOM CDN static app. So, buckle up and let's dive in!

## What You'll Need

Before we start, you'll need a GitHub account. If you don't have one, head over to GitHub and sign up—it's free. Also, a basic understanding of HTML and JavaScript will be beneficial, but not mandatory, as I'll be explaining everything step by step.

## Step 1: Setting Up Your GitHub Repository

First and foremost, we need to create a new repository in GitHub. For GitHub Pages to host your site, your repository name needs to adhere to a particular pattern: `{username}.github.io`. Make sure you replace `{username}` with your actual GitHub username.

## Step 2: Creating Your React App

Next up is creating your website. We'll be using React, a potent JavaScript library, known for its versatility in building user interfaces—perfect for crafting static websites. For this project, I utilized the React DOM CDN to include React in the project, bypassing the need for Node.js or npm.

Here's a basic example of a React app to get you started:

```jsx
<div id="root"></div>
<script type="text/babel">
class Home extends React.Components {
    render() {
        return (
            <div className="ui container">
                    <h2 className="ui header">Welcome to my website!</h2>
                    <p>I'm Adnan Dossaji, and I am just getting started on my website. Come back soon!</p>
            </div>
        );
    }
}
ReactDOM.render(<Home />, document.getElementById('root'));
</script>
```

## Step 3: Pushing Your App to GitHub

Now that you've developed your React app, the final step is to push it to your GitHub repository. Don't worry; it's easier than it sounds. Once you've done that, GitHub Pages will work its magic, automatically deploying your site and making it accessible at {username}.github.io.

## Adapting My Website

Fancy using my website as a stepping stone for your own? Head over to my [GitHub page](https://github.com/adnandossaji/adnandossaji.github.io) and fork the repository. Once you've forked it, you're free to tweak, modify, and tailor it as per your preference. The sky's the limit!

And there you have it! With a few easy steps, you've now created your own website, entirely for free, thanks to GitHub Pages and React. Remember, this is just a basic framework—feel free to go wild with customization, and make your corner of the internet truly your own. Until next time, happy coding! 