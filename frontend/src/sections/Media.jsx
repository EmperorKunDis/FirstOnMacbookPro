import React, { useState, useEffect } from 'react';

const Media = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('all');

  const mediaCategories = {
    all: 'All Media',
    events: 'Events',
    battles: 'Battles',
    members: 'Members',
    screenshots: 'Screenshots'
  };

  useEffect(() => {
    const loadImages = async () => {
      const imageFiles = [];
      
      for (let i = 1; i <= 63; i++) {
        try {
          const img = new Image();
          img.src = `/profiles/${i}.png`;
          img.onload = () => {
            imageFiles.push({
              id: i,
              src: `/profiles/${i}.png`,
              title: `Member ${i}`,
              category: 'members'
            });
            if (imageFiles.length <= 20) {
              setImages([...imageFiles]);
            }
          };
          img.onerror = () => {
            const jpgImg = new Image();
            jpgImg.src = `/profiles/${i}.jpg`;
            jpgImg.onload = () => {
              imageFiles.push({
                id: i,
                src: `/profiles/${i}.jpg`,
                title: `Member ${i}`,
                category: 'members'
              });
              if (imageFiles.length <= 20) {
                setImages([...imageFiles]);
              }
            };
          };
        } catch (error) {
          console.error(`Error loading image ${i}:`, error);
        }
      }

      const staticImages = [
        {
          id: 'bg1',
          src: '/backgrounds/Leadership.png',
          title: 'Leadership Background',
          category: 'screenshots'
        },
        {
          id: 'bg2',
          src: '/backgrounds/SpaceMap.png',
          title: 'Space Map',
          category: 'screenshots'
        },
        {
          id: 'logo',
          src: '/LogoSVCI (1).png',
          title: 'SVCI Logo',
          category: 'screenshots'
        }
      ];

      setImages(prev => [...prev, ...staticImages]);
    };

    loadImages();
  }, []);

  const filteredImages = currentCategory === 'all' 
    ? images 
    : images.filter(img => img.category === currentCategory);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(/backgrounds/Media.png)` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8 font-unifraktur">
          Media Gallery
        </h1>

        <div className="flex justify-center mb-8 flex-wrap gap-2">
          {Object.entries(mediaCategories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCurrentCategory(key)}
              className={`px-4 py-2 rounded-lg font-unifraktur transition-colors ${
                currentCategory === key
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="bg-white/10 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
              onClick={() => openModal(image)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="p-3">
                <h3 className="text-white font-unifraktur text-sm text-center">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center text-white mt-8">
            <p className="text-xl font-unifraktur">No media found in this category</p>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 z-10"
            >
              ×
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="text-center mt-4">
              <h3 className="text-white text-xl font-unifraktur">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Media;
