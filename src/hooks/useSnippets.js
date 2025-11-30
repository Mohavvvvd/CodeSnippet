import { useState, useEffect, useCallback } from 'react';
import { auth } from '../firebase';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/snippets';

export const useSnippets = (user) => {
  const [snippets, setSnippets] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAuthToken = async () => {
    if (user) {
      return await user.getIdToken();
    }
    return null;
  };

  const fetchSnippets = useCallback(async (filters = {}) => {
    if (!user) {
      setSnippets([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const token = await getAuthToken();
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '9',
        ...filters
      });

      // Remove undefined or empty filter values
      Array.from(params.entries()).forEach(([key, value]) => {
        if (!value || value === 'undefined' || value === 'null') {
          params.delete(key);
        }
      });

      const response = await fetch(`${API_BASE}?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setSnippets(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
        setCurrentPage(data.pagination?.page || 1);
      } else {
        throw new Error(data.message || 'Failed to fetch snippets');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Error connecting to server.');
      setSnippets([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, user]);

  const fetchTags = async () => {
    if (!user) {
      setAllTags([]);
      return;
    }

    try {
      const token = await getAuthToken();
      const response = await fetch(`${API_BASE}/tags`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch tags');
      
      const data = await response.json();
      if (data.success) {
        setAllTags(data.data.map(t => t.name));
      } else {
        setAllTags([]);
      }
    } catch (err) {
      console.error('Error fetching tags:', err);
      setAllTags([]);
    }
  };

  const deleteSnippet = async (id) => {
    try {
      const token = await getAuthToken();
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete snippet');
      
      const data = await response.json();
      if (data.success) {
       
        setSnippets(prev => prev.filter(snippet => snippet._id !== id));
        fetchTags(); // Refresh tags as deletion might affect tag counts
        return { success: true, message: 'Snippet deleted successfully!' };
      } else {
        throw new Error(data.message || 'Failed to delete snippet');
      }
    } catch (err) {
      console.error('Error deleting snippet:', err);
      return { success: false, error: err.message || 'Failed to delete snippet' };
    }
  };

  const toggleFavorite = async (id, currentStatus) => {
    try {
      const token = await getAuthToken();
      const response = await fetch(`${API_BASE}/${id}/favorite`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        // Update the snippets state with the new favorite status
        setSnippets(prev => prev.map(s => 
          s._id === id ? { ...s, isFavorited: data.data.favorited } : s
        ));
        return { 
          success: true, 
          favorited: data.data.favorited,
          message: data.data.favorited ? 'Added to favorites!' : 'Removed from favorites!'
        };
      } else {
        throw new Error(data.message || 'Failed to toggle favorite');
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      return { 
        success: false, 
        error: err.message || 'Failed to update favorite status' 
      };
    }
  };

  const createSnippet = async (snippetData) => {
    try {
      const token = await getAuthToken();
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(snippetData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        // Refetch snippets to get the updated list with proper ordering
        fetchSnippets();
        fetchTags();
        return { success: true, data: data.data, message: 'Snippet created successfully!' };
      } else {
        throw new Error(data.message || 'Failed to create snippet');
      }
    } catch (err) {
      console.error('Error creating snippet:', err);
      return { success: false, error: err.message || 'Failed to create snippet' };
    }
  };

  const updateSnippet = async (id, snippetData) => {
    try {
      const token = await getAuthToken();
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(snippetData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        // Update the snippet in local state
        setSnippets(prev => prev.map(s => 
          s._id === id ? { ...s, ...snippetData } : s
        ));
        fetchTags(); // Refresh tags as they might have changed
        return { success: true, data: data.data, message: 'Snippet updated successfully!' };
      } else {
        throw new Error(data.message || 'Failed to update snippet');
      }
    } catch (err) {
      console.error('Error updating snippet:', err);
      return { success: false, error: err.message || 'Failed to update snippet' };
    }
  };

  // Refresh snippets when user changes
  useEffect(() => {
    if (user) {
      fetchSnippets();
      fetchTags();
    } else {
      setSnippets([]);
      setAllTags([]);
      setCurrentPage(1);
      setTotalPages(1);
    }
  }, [user]);

  // Refresh snippets when currentPage changes
  useEffect(() => {
    if (user) {
      fetchSnippets();
    }
  }, [currentPage, user]);

  return {
    snippets,
    allTags,
    isLoading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    fetchSnippets,
    fetchTags,
    deleteSnippet,
    toggleFavorite,
    createSnippet,
    updateSnippet,
    setError
  };
};