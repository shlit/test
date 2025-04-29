const sdk = new Appwrite();
sdk
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('6810c95f00202f795b6e'); // Your Project ID

// Fetch and display posts
function fetchPosts() {
  sdk.database.listDocuments('6810caeb00229f3cdb24').then(response => {
    const postsSection = document.getElementById('posts');
    postsSection.innerHTML = ''; // Clear previous posts
    response.documents.forEach(post => {
      const postElement = document.createElement('div');
      postElement.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
      postsSection.appendChild(postElement);
    });
  }).catch(error => {
    console.error('Error fetching posts:', error);
  });
}

// Add new post
document.getElementById('new-post-form').addEventListener('submit', async event => {
  event.preventDefault(); // Prevent default form submission
  const title = document.getElementById('post-title').value;
  const content = document.getElementById('post-content').value;

  try {
    await sdk.database.createDocument('6810caeb00229f3cdb24', {
      title: title,
      content: content,
      userId: 'example-user-id', // Add a user ID if needed
    });
    console.log('Post added successfully');
    fetchPosts(); // Refresh the list of posts
  } catch (error) {
    console.error('Error adding post:', error);
  }
});

// Initial fetch
fetchPosts();
