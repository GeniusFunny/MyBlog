var showArticle = (function(){
	function showArticleNode(source){
		var artcle = document.createElement('div');	//文章
		var title = document.createElement('h3');	//文章标题
		var info = document.createElement('div');	//文章信息
		var infoTime = document.createElement('span');
		var infoTimeMore = document.createElement('span');

		var infoTimeIcon = document.createElement('i');
		var infoViews = document.createElement('span');
		var infoCatolog = document.createElement('span');
		var infoCatologIcon = document.createElement('i');
		var infoAuthorMore  = document.createElement('a');
		var infoCatologMore = document.createElement('a');


		var infoAuthor = document.createElement('span');
		var content = document.createElement('div');
		var hr = document.createElement('hr');
		let showAuthorUrl =  "http://blog.helloyzy.cn/users/" + source.user_id;
		let showTagUrl = "http://blog.helloyzy.cn/tags/" + source.tag_id;

		infoCatologIcon.classList.add('fa','fa-fw','fa-tags');
		title.innerHTML = source.name;
		title.classList.add('centerPosition');
		artcle.appendChild(title);

		infoCatologMore.innerHTML = sessionStorage.getItem('tagName') || 'fuckError';
		infoAuthorMore.innerHTML = sessionStorage.getItem('author') || 'fuckError';
		infoViews.innerHTML =  "&emsp;" + "阅读量:" + sessionStorage.getItem('view');
		infoCatolog.appendChild(infoCatologIcon);
		infoCatolog.appendChild(infoCatologMore);

		infoCatologMore.addEventListener('click',function(){
			sessionStorage.setItem('showTagUrl','http://blog.helloyzy.cn/tags/' + source.tag_id);
			location.href = "showTag.html";
		});

		infoAuthor.innerHTML = "&emsp;" + "作者: ";
		infoAuthor.appendChild(infoAuthorMore);
		infoAuthorMore.addEventListener('click',function(){
			sessionStorage.setItem('showAuthorUrl',showAuthorUrl);
			location.href = "showAuthor.html";
			//将作者id存在sessition中，点击后加载作者信息
		});
		infoAuthorMore.classList.add('info');
		infoCatologMore.classList.add('info');
		infoTimeMore.innerHTML = source.created_at + "&emsp;";
		infoTimeIcon.classList.add('fa','fa-calendar-o');
		infoTime.appendChild(infoTimeIcon);
		infoTime.appendChild(infoTimeMore);

		info.classList.add('centerPosition');
		info.appendChild(infoTime);
		info.appendChild(infoViews);
		info.appendChild(infoCatolog);
		info.appendChild(infoAuthor);
		info.appendChild(infoViews);

		//将md转为html
		var converter = new showdown.Converter();
		var contentBody = converter.makeHtml(source.md_content);
		content.innerHTML = contentBody;
		

		artcle.appendChild(title);
		artcle.appendChild(info);
		artcle.appendChild(hr);
		artcle.appendChild(content);

		document.getElementById('showArticle').appendChild(artcle);	
	}

	return function(o){
		var source = JSON.parse(o.responseText);
		showArticleNode(source);
	}		
})();