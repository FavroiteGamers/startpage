/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"EH8QNLFx2qQ6YiY4","label":"Entertainment","bookmarks":[{"id":"NyW2dRMU4R5uBSWC","label":"YouTube","url":"https://www.youtube.com"},{"id":"gPlTCWdfMN1wSJqP","label":"YouTube Music","url":"https://www.music.youtube.com"},{"id":"LuOkzsBjAQLr1MCQ","label":"Plex","url":"https://www.plex.tv"},{"id":"EDyLbBanMo7kHI39","label":"YouTube TV","url":"https://www.tv.youtube.com"}]},{"id":"PverqDzLIIdDbjpQ","label":"Games","bookmarks":[{"id":"pS3HtUX3QkOFvIFX","label":"Steam","url":"https://www.store.steampowered"},{"id":"MbMJsN1nsZtEmk0o","label":"Epic Games","url":"https://www.epicgames.com"},{"id":"nYY5OW3WWXD9KlCu","label":"Itch.io","url":"https://www.itch.io"},{"id":"1DgIeFmvdw5wnsoD","label":"Playstation","url":"https://www.playstation.com"}]},{"id":"xnCPBHH5594agJBi","label":"Technology","bookmarks":[{"id":"fos2bCtBL49umACw","label":"Apple","url":"https://www.apple.com"},{"id":"8HY218zmpmTYvcLU","label":"Microsoft","url":"https://www.microsoft.com"},{"id":"SnX5W3hKriUqOgsS","label":"Wired","url":"https://www.wired.com"},{"id":"oK8VZnp5JcFi7Ole","label":"Hackaday","url":"https://www.hackaday.io"}]},{"id":"JDHo9CKmxPDcv9t1","label":"Utilities","bookmarks":[{"id":"ZK7dYQuTry0u4alX","label":"Gmail","url":"https://www.gmail.com "},{"id":"nDB1vR3jNYgb9O1n","label":"Proton Mail","url":"https://www.mail.proton.me"},{"id":"r9fbt9jZFdT4BL60","label":"Discord","url":"https://www.discord.gg"},{"id":"Cxm5WtAAlOGpHEOA","label":"Github","url":"https://www.github.com"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
