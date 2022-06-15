class PostsAndComments{
	constructor(elOfPost) {
		this.elOfPost = elOfPost;
		this.posts = [];
		this.comments = [];
	}
	
	async getPosts(url) {
		const response = await fetch(url);
		let json = await response.json();

  		try{
			if(response.ok) {
				this.posts = [];
				this.posts.push(json);
				this.getComments(`https://jsonplaceholder.typicode.com/posts/${json.id}/comments`)
			} else {
				 throw new Error('Error');
			  }
		} catch(err) {
			console.log(err);
			
		}
	}

	async getComments(url) {
		const response = await fetch(url);
		let json = await response.json();

		try{
			if(response.ok) {
				this.comments = json;
				this.renderComments(this.comments)
			} else{
				throw new Error('Error');
			}
		} catch(err) {
			console.log(err);
			
		}
	}

	renderPosts(posts = [], comments) {
		let postsItem = '';
		for(let el of posts) {
			if(!el) {
				return
			}
			postsItem += `<li class="post" data-postid="${el.id}"><h1 class="post-title">${el.title}</h1><p class="post-discription">${el.body}</p><h2 class="post-comments-title">Comments</h2><ul class="post__comments">${comments}</ul></li>`
			this.elOfPost.innerHTML = postsItem;
		}
		
	}

	renderComments(comments = []) {
		let commentsItem = '';
		for(let el of comments) {
			if(!el) {
				return
			}
			commentsItem += `<li class="comments-item" data-commentid="${el.id}"><p class="comment-author">Author: ${el.name}</p><p class="comment-text">Text: ${el.body}</p></li>`;
		}

		this.renderPosts(this.posts, commentsItem)
	}
}

const postsHtml = document.querySelector('.posts');
const postsAndCommenst = new PostsAndComments(postsHtml)

postsAndCommenst.getPosts('https://jsonplaceholder.typicode.com/posts/1')

const container = document.querySelector('.container');
let i = 1;

container.addEventListener('click', (event) => {
	if(event.target.classList.contains('prev-post')) {
		postsAndCommenst.getPosts(`https://jsonplaceholder.typicode.com/posts/${i === 1 ? i = 100 : --i}`)
		
	} else if(event.target.classList.contains('next-post')) {
		postsAndCommenst.getPosts(`https://jsonplaceholder.typicode.com/posts/${i === 100 ? i = 1 : ++i}`)
	}
})

console.log(1);
 
setTimeout(function () {
   console.log(2);
}, 100);
 
setTimeout(function () {
   console.log(3);
}, 0);
 
new Promise(function (resolve) {
   setTimeout(function () {
		resolve();
	}, 0)
}).then(() => {
   console.log(4);
});
 
console.log(5);
