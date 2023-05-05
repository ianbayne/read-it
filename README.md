# read-it

ReadIt (pronounced as in "Have you read it?") is a browser extension providing highlighting of new comments for the popular news aggregation and discussion site [Reddit](https://www.reddit.com). In its current incarnation, ReadIt is only available as a Google Chrome extension and only functions when accessing the older version of Reddit, https://old.reddit.com.

## Usage

### Installation

As of this writing, ReadIt is not available on the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions). It can, however, be installed in developer mode by doing the following:

1. `git clone` this repository to your local machine.
2. Install all dependencies and build the extension by running `yarn install && yarn build`.
3. Follow the directions [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) for loading an unpacked extension.

### How to use ReadIt

Navigate your browser to any Reddit thread; i.e., those pages with URLs starting https://old.reddit.com/r/<name-of-subreddit>/comments/... Upon doing so click the extension's icon in your browser. If this is your first time visiting that thread, all comments are new for you and thus all comments will be highlighted. For future visits (including refreshes of the page), only comments posted in the last 15 minutes from your current local time will be highlighted as new.
