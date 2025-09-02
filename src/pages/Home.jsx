import { useGet } from "../hooks/useApi";
import { useState, useMemo } from "react";

function Home() {
  // State for active tab and visible tabs
  const [activeTab, setActiveTab] = useState(0);
  const [visibleTabs, setVisibleTabs] = useState(5);

  // Fetch categories
  const {
    data: categories,
    isFetched: categoriesFetched,
    isError: categoriesError,
  } = useGet(["categories"], "categories", {
    staleTime: Infinity,
  });

  // Fetch posts
  const {
    data: posts,
    isFetched: postsFetched,
    isError: postsError,
  } = useGet(["posts"], "posts", {
    staleTime: 5 * 60 * 1000,
  });

  // Create tabs with categories that have posts
  const tabs = useMemo(() => {
    if (!categoriesFetched || !categories || !postsFetched || !posts) return [];

    // Create the "All" tab
    const allTab = {
      id: 0,
      label: "الكل",
      filter: () => true,
      categoryId: null,
    };

    // Filter categories to only include those with posts
    const categoryTabs = categories
      .map((category, index) => ({
        id: category.id || index + 1,
        label: category.title || `Category ${index + 1}`,
        filter: (post) => post.category_id === category.id,
        categoryId: category.id,
        postCount: posts.filter((post) => post.category_id === category.id)
          .length,
      }))
      .filter((tab) => tab.postCount > 0); // Only include tabs with posts

    // Return all tab plus filtered category tabs
    return [allTab, ...categoryTabs];
  }, [categories, categoriesFetched, posts, postsFetched]);

  // Filter posts based on active tab
  const filteredPosts = useMemo(() => {
    if (!postsFetched || !posts || tabs.length === 0) return [];

    const activeFilter = tabs[activeTab]?.filter;
    return activeFilter ? posts.filter(activeFilter) : [];
  }, [posts, postsFetched, tabs, activeTab]);

  // Handle loading more tabs
  const handleLoadMore = () => {
    setVisibleTabs((prev) => Math.min(prev + 5, tabs.length));
  };

  // Combined error state
  const hasError = categoriesError || postsError;

  if (hasError) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-red-600">
            Failed to load content. Please try again.
          </p>
        </div>
      </div>
    );
  }

  if (tabs.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">No categories available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      {/* Tabs Navigation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.slice(0, visibleTabs).map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-colors ${
                activeTab === index
                  ? "bg-[#b9a779] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-selected={activeTab === index}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {visibleTabs < tabs.length && (
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-[#b9a779] text-white rounded-lg text-sm md:text-base font-medium whitespace-nowrap hover:bg-[#a89668] transition-colors"
          >
            Load More
          </button>
        )}
      </div>

      <div
        className="bg-white p-4 md:p-6"
        role="tabpanel"
        aria-labelledby={`tab-${tabs[activeTab]?.id}`}
      >
        {filteredPosts.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            No posts found in this category.
          </p>
        ) : (
          <div className="flex flex-col gap-y-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="   hover:shadow-lg transition-shadow flex flex-col md:flex-row"
              >
                {post.image && (
                  <div className="sm:w-1/3 h-48 sm:h-auto overflow-hidden">
                    <img
                      src={`https://phplaravel-1483035-5810347.cloudwaysapps.com/storage/${post.image}`}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className={`p-2 px-4 ${post.image ? "md:w-2/3" : "w-full"}`}>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">
                    {post?.parts[0]?.title }
                  </h3>
                  <p className=" text-xs text-gray-600">
                    {post?.parts?.[0]?.description }
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
