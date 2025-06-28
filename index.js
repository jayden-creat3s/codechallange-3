// In-memory storage for posts
const posts = [];
let currentPostIndex = null;

// DOM references
const postListContainer = document.getElementById('post-list');
const postDetailContainer = document.getElementById('post-detail');
const createPostForm = document.getElementById('new-post-form');
const updatePostForm = document.getElementById('edit-post-form');
const cancelEditButton = document.getElementById('cancel-edit');

// Render the list of posts
function displayPostList() {
    const ul = document.createElement('ul');
    posts.forEach((post, i) => {
        const item = document.createElement('li');
        item.textContent = `${post.title} (by ${post.author})`;
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => displayPostDetail(i));
        ul.appendChild(item);
    });
    postListContainer.innerHTML = '<h2>All Posts</h2>';
    postListContainer.appendChild(ul);
}

// Show details for a specific post
function displayPostDetail(index) {
    currentPostIndex = index;
    const post = posts[index];
    postDetailContainer.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Author:</strong> ${post.author}</p>
        ${post.image ? `<img src="${post.image}" alt="Post image" style="max-width:200px;">` : ''}
        <p>${post.content}</p>
        <button id="edit-post-btn">Edit</button>
    `;
    document.getElementById('edit-post-btn').onclick = showUpdateForm;
}

// Handle new post creation
createPostForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const data = new FormData(createPostForm);
    const post = {
        title: data.get('title'),
        author: data.get('author'),
        image: data.get('image'),
        content: data.get('content')
    };
    posts.push(post);
    createPostForm.reset();
    displayPostList();
    postDetailContainer.innerHTML = '<h2>Select a post to see details</h2>';
});

// Show the edit form with current post data
function showUpdateForm() {
    if (currentPostIndex === null) return;
    const post = posts[currentPostIndex];
    updatePostForm.classList.remove('hidden');
    updatePostForm.elements['title'].value = post.title;
    updatePostForm.elements['content'].value = post.content;
}

// Handle post update
updatePostForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (currentPostIndex === null) return;
    posts[currentPostIndex].title = updatePostForm.elements['title'].value;
    posts[currentPostIndex].content = updatePostForm.elements['content'].value;
    updatePostForm.classList.add('hidden');
    displayPostList();
    displayPostDetail(currentPostIndex);
});

// Cancel editing
cancelEditButton.addEventListener('click', function() {
    updatePostForm.classList.add('hidden');
});

// Initial render
displayPostList();
