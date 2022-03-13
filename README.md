# Little Jira Plugin Beta

## About
Our Jira server instance at work is often very slow to work with and it causes frustration for me and my co-workers. This is the main reason for this browser plugin. Little Jira Plugin is insanely fast.

## What does it do?
Little Jira Plugin Beta gives you an extra navigation bar in the top of all Jira pages. From there you can search and open issues in a tiny injected SPA made with Vue. It gives you a dashboard as well where you can see the listed issues matching the JQL query that you define in the Extension settings tab.

#### Little Jira Plugin running on top of Jira
![image](https://github.com/fuzzypawzz/little-jira-plugin/blob/master/Little-jira-plugin-beta.png)

## Extension setup
1. Load the extension in Chrome or Firefox.
2. You should see the extension icon next to your search bar, or where you usually find your extensions.
3. Click the icon and click on "Settings" to go to the extension settings tab.
4. Type your Jira Server url.
5. Add JQL for your dashboard.
6. Save your changes.
7. Navigate to your Jira website. The extension should now load in the top of the page. Remember that this extension only works when you're logged in to Jira.

## Project setup
Pull latest from the repository and run:
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize Vue configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
