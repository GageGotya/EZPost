import { ScheduledPost } from './types';

// Use browser's localStorage for scheduled posts
export const storage = {
  getScheduledPosts(): ScheduledPost[] {
    if (typeof window === 'undefined') return [];
    const posts = localStorage.getItem('scheduledPosts');
    return posts ? JSON.parse(posts) : [];
  },

  saveScheduledPost(post: ScheduledPost) {
    if (typeof window === 'undefined') return;
    const posts = this.getScheduledPosts();
    posts.push(post);
    localStorage.setItem('scheduledPosts', JSON.stringify(posts));
  },

  updatePostStatus(postId: string, status: ScheduledPost['status']) {
    if (typeof window === 'undefined') return;
    const posts = this.getScheduledPosts();
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, status } : post
    );
    localStorage.setItem('scheduledPosts', JSON.stringify(updatedPosts));
  },

  removePost(postId: string) {
    if (typeof window === 'undefined') return;
    const posts = this.getScheduledPosts();
    const updatedPosts = posts.filter(post => post.id !== postId);
    localStorage.setItem('scheduledPosts', JSON.stringify(updatedPosts));
  }
}; 