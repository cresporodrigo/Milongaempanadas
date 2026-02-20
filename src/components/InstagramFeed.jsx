import { getAssetPath } from '../config'

const InstagramFeed = () => {
  const instagramPosts = [
    {
      url: 'https://www.instagram.com/p/DJm9XxvhLiN/',
      image: getAssetPath('images/instagram/post1.jpg'),
      type: 'post'
    },
    {
      url: 'https://www.instagram.com/p/DH6iI9EBPkq/',
      image: getAssetPath('images/instagram/post2.jpg'),
      type: 'post'
    },
    {
      url: 'https://www.instagram.com/p/DIMnwyThmAf/',
      image: getAssetPath('images/instagram/post3.jpg'),
      type: 'post'
    },
    {
      url: 'https://www.instagram.com/p/DIeuPu5zLiY/',
      image: getAssetPath('images/instagram/post4.jpg'),
      type: 'post'
    },
    {
      url: 'https://www.instagram.com/p/DG6QpDwS5kl/',
      image: getAssetPath('images/instagram/post5.jpg'),
      type: 'post'
    },
    {
      url: 'https://www.instagram.com/p/DGgcjocy1HQ/',
      image: getAssetPath('images/instagram/post6.jpg'),
      type: 'post'
    }
  ]

  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="heading-lg text-primary-dark mb-3">
            Instagram Milonga Empanadas
          </h2>
          <p className="text-body text-gray-600 mb-6">
            Follow us on Instagram for the latest updates and mouthwatering photos
          </p>
          <a
            href="https://instagram.com/milongaempanada"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 transition-colors font-semibold"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>@milongaempanada</span>
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {instagramPosts.map((post, index) => (
            <a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-lg aspect-square"
            >
              {/* Instagram Image */}
              <img
                src={post.image}
                alt={`Instagram ${post.type}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Hover Overlay con Instagram Icon */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-pink-600/0 to-orange-600/0 group-hover:from-purple-600/80 group-hover:via-pink-600/80 group-hover:to-orange-600/80 transition-all duration-300 flex items-center justify-center">
                <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300 text-center">
                  <svg
                    className="w-16 h-16 text-white mx-auto mb-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <p className="text-white font-semibold text-sm">
                    {post.type === 'reel' ? 'Ver Reel' : 'Ver en Instagram'}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InstagramFeed
