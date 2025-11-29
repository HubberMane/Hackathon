const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const buildUrl = (path) => `${API_BASE_URL}${path}`;

const parseJson = async (response) => {
  if (response.status === 204) return null;
  return response.json();
};

const request = async (path, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(buildUrl(path), { ...options, headers });

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return parseJson(response);
};

const safeRequest = async (path, options) => {
  try {
    const data = await request(path, options);
    return { data, error: null };
  } catch (error) {
    console.error(`[api] ${options?.method || 'GET'} ${path} failed`, error);
    return { data: null, error };
  }
};

export const fetchBlogs = () => safeRequest('/api/blogs');

export const fetchBlog = (id) => safeRequest(`/api/blogs/${id}`);

export const fetchForumPosts = (query = '') => {
  const suffix = query ? `?${query}` : '';
  return safeRequest(`/api/forum/posts${suffix}`);
};

export const fetchForumPost = (id) => safeRequest(`/api/forum/posts/${id}`);

export const fetchForumComments = (id) => safeRequest(`/api/forum/posts/${id}/comments`);

export const createForumPost = (payload) =>
  safeRequest('/api/forum/posts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const fetchFacilities = () => safeRequest('/api/facilities');
