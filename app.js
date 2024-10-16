document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('Year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
});

document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu-button');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuIcon = document.getElementById('menu-icon');
    let navBarOpen = false;

    menuButton.addEventListener('click', () => {
        navBarOpen = !navBarOpen;
        if (navBarOpen) {
            menuOverlay.classList.remove('hidden');
            menuIcon.innerHTML = `
                <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            `;
        } else {
            menuOverlay.classList.add('hidden');
            menuIcon.innerHTML = `
                <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            `;
        }
    });
});

  document.addEventListener("DOMContentLoaded", function () {
    const postId = "your-post-id"; // A unique ID for the blog post, maybe the filename or some slug

    const likeButton = document.getElementById("like");
    const likeCountElement = document.getElementById("likeCount");

    const commentInput = document.getElementById("commentInput");
    const submitComment = document.getElementById("submitComment");
    const commentList = document.getElementById("commentList");

    // Fetch like count from Firestore
    db.collection("posts").doc(postId).get().then((doc) => {
      if (doc.exists) {
        likeCountElement.textContent = doc.data().likeCount || 0;
      } else {
        // If no likeCount exists yet, initialize it
        db.collection("posts").doc(postId).set({ likeCount: 0 });
      }
    });

    // Like functionality
    likeButton.addEventListener("click", function () {
      db.collection("posts").doc(postId).get().then((doc) => {
        let likeCount = doc.data().likeCount || 0;

        likeCount++;
        db.collection("posts").doc(postId).update({ likeCount });

        likeCountElement.textContent = likeCount;
      });
    });

    // Fetch existing comments
    db.collection("posts").doc(postId).collection("comments").orderBy("timestamp").onSnapshot((snapshot) => {
      commentList.innerHTML = "";
      snapshot.forEach((doc) => {
        const li = document.createElement("li");
        li.textContent = doc.data().text;
        li.classList.add("border-b", "border-gray-300", "py-2");
        commentList.appendChild(li);
      });
    });

    // Submit comment functionality
    submitComment.addEventListener("click", function () {
      const newComment = commentInput.value;
      if (newComment) {
        db.collection("posts").doc(postId).collection("comments").add({
          text: newComment,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        commentInput.value = "";
      }
    });
  });
