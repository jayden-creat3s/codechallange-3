const posts = [];
let currentPostIndex = null;

const postListContainer = document.getElementById('post-list');
const postDetailContainer = document.getElementById('post-detail');
const createPostForm = document.getElementById('new-post-form');
const updatePostForm = document.getElementById('edit-post-form');
const cancelEditButton = document.getElementById('cancel-edit');
const imagePreview = document.createElement('img');

function displayPostList() {
    const ul = document.createElement('ul');
    posts.forEach((post, i) => {
        const item = document.createElement('li');
        item.textContent = `${post.title} (by ${post.author})`;
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => displayPostDetail(i)); // Ensure this calls the function correctly
        ul.appendChild(item);
    });
    postListContainer.innerHTML = '<h2>All Posts</h2>';
    postListContainer.appendChild(ul);
}

function displayPostDetail(index) {
    if (index < 0 || index >= posts.length) return; // Check for valid index
    currentPostIndex = index;
    const post = posts[index];
    postDetailContainer.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Author:</strong> ${post.author}</p>
        ${post.image ? `<img src="${post.image}" alt="Post image" style="max-width:200px;">` : ''}
        <p>${post.content}</p>
        <button id="edit-post-btn">Edit</button>
        <button id="delete-post-btn">Delete</button>
    `;
    document.getElementById('edit-post-btn').onclick = showUpdateForm;
    document.getElementById('delete-post-btn').onclick = deletePost;
}

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
    alert('Post added successfully!');
});

function showUpdateForm() {
    if (currentPostIndex === null) return;
    const post = posts[currentPostIndex];
    updatePostForm.classList.remove('hidden');
    updatePostForm.elements['title'].value = post.title;
    updatePostForm.elements['content'].value = post.content;
    updatePostForm.elements['image'].value = post.image; 
    updateImagePreview(post.image);
}

updatePostForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (currentPostIndex === null) return;
    posts[currentPostIndex].title = updatePostForm.elements['title'].value;
    posts[currentPostIndex].content = updatePostForm.elements['content'].value;
    posts[currentPostIndex].image = updatePostForm.elements['image'].value;
    updatePostForm.classList.add('hidden');
    displayPostList();
    displayPostDetail(currentPostIndex);
    alert('Post updated successfully!');
});

cancelEditButton.addEventListener('click', function() {
    updatePostForm.classList.add('hidden');
});

function deletePost() {
    if (currentPostIndex === null) return;
    posts.splice(currentPostIndex, 1);
    currentPostIndex = null;
    displayPostList();
    postDetailContainer.innerHTML = '<h2>Select a post to see details</h2>';
    alert('Post deleted successfully!');
}

function updateImagePreview(imageUrl) {
    if (imageUrl) {
        imagePreview.src = imageUrl;
        imagePreview.alt = "Image Preview";
        imagePreview.style.maxWidth = "200px";
        imagePreview.style.display = "block"; 
        updatePostForm.appendChild(imagePreview);
    } else {
        imagePreview.src = '';
        imagePreview.style.display = "none"; 
    }
}

createPostForm.elements['image'].addEventListener('input', function() {
    updateImagePreview(this.value);
});

updatePostForm.elements['image'].addEventListener('input', function() {
    updateImagePreview(this.value);
});

// Initial display of post list
displayPostList();
