import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import './../css/bootstrap.css'
import './../css/gist.css'
import './../css/github.css'
import './../css/index.css'

window.showMarkdown = (percentEncodedMarkdown, enableImage = true, playButtonImageURL) => {

  if (!percentEncodedMarkdown) {
    return
  }

  const markdownText = decodeURIComponent(percentEncodedMarkdown)

  let markdown = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    highlight: function(code){
        return hljs.highlightAuto(code).value;
    }
  })

  if (!enableImage) {
    markdown = markdown.disable('image')
  }

  markdown.use(emoji)

  let html = markdown.render(markdownText)

  document.getElementById('contents').innerHTML = html

  let tables = document.querySelectorAll('table')

  tables.forEach((table) => {
    table.classList.add('table')
  })

  let codes = document.querySelectorAll('pre code')

  codes.forEach((code) => {
    hljs.highlightBlock(code)
  })

  addPlayButton(playButtonImageURL)
}


function addPlayButton(playButtonImageURL) {
	var videos = document.querySelectorAll('[title ^= "pryanikyVideo-"]');
	videos.forEach.position = "relative";

	for (var i = 0; i < videos.length; ++i) {
		var playButtonDiv = document.createElement('img');
  		playButtonDiv.src = playButtonImageURL
  		playButtonDiv.style.position = "absolute";
  		playButtonDiv.style.left = 0
  		playButtonDiv.style.right = 0
  		playButtonDiv.style.top = 0
  		playButtonDiv.style.bottom = 0
  		playButtonDiv.style.margin = "auto"

      videos[i].style.position = "relative";
      videos[i].appendChild(playButtonDiv);
	}
}

