
    $(document).ready(function () {
      // Initialize carousels
      $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        responsive: {
          0: { items: 1 },
          768: { items: 2 },
          992: { items: 3 }
        }
      });

      // Update active nav link on scroll
      window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');

        // Reset all nav links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Find current section and activate corresponding nav link
        sections.forEach(current => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 80; // Adjust for navbar height
          const sectionId = current.getAttribute('id');

          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            const navLink = document.querySelector(`.navbar-nav a[href="#${sectionId}"]`);
            if (navLink) {
              navLink.classList.add('active');
            }
          }
        });


      });

      // Smooth scrolling for all nav links
      document.querySelectorAll('.navbar-nav a.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
          if (this.hash) {
            e.preventDefault();
            document.querySelector(this.hash).scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
      });

      // Initialize tutorial carousel
      const tutorialCarousel = $('#videoCarousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        responsive: {
          0: { items: 1 },
          576: { items: 2 },
          768: { items: 3 },
          992: { items: 4 }
        }
      });

      // Set video thumbnails to first frame
      $('.video-thumbnail video').each(function () {
        this.currentTime = 1;
        $(this).on('loadeddata', function () {
          $(this).show();
        });
      });

      // Handle video click to open modal
      $('.tutorial-card').click(function () {
        const videoSrc = $(this).find('video').attr('src');
        const videoTitle = $(this).find('.card-body h6').text();
        const videoCategory = $(this).find('.category-badge').text();
        const videoDuration = $(this).find('.duration-badge').text();

        $('#tutorialModalVideo').attr('src', videoSrc)[0].load();
        $('#videoTitle').text(videoTitle);
        $('#videoCategory').text(videoCategory);
        $('#videoDuration').text(videoDuration);
        $('#tutorialVideoModal').modal('show');
      });

      // Reset video when modal closes
      $('#tutorialVideoModal').on('hidden.bs.modal', function () {
        $('#tutorialModalVideo').attr('src', '')[0].pause();
      });

      // Filter functionality
      $('.filter-buttons button').click(function () {
        const filter = $(this).data('filter');
        $('.filter-buttons button').removeClass('active');
        $(this).addClass('active');

        if (filter === 'all') {
          $('.tutorial-card').show();
        } else {
          $('.tutorial-card').hide();
          $(`.tutorial-card[data-categories*="${filter}"]`).show();
        }

        tutorialCarousel.trigger('refresh.owl.carousel');
      });

      // Search functionality
      $('#tutorialSearch').on('keyup', function () {
        const searchTerm = $(this).val().toLowerCase();

        $('.tutorial-card').each(function () {
          const cardText = $(this).text().toLowerCase();
          $(this).toggle(cardText.includes(searchTerm));
        });

        tutorialCarousel.trigger('refresh.owl.carousel');
      });

      // Mask names functionality
      function maskSameIdH6(id) {
        document.querySelectorAll(`#${id}`).forEach(h6 => {
          const masked = h6.textContent
            .split(' ')
            .map(word => {
              if (word.length <= 2) return word;
              return word[0] + '*'.repeat(word.length - 2) + word[word.length - 1];
            })
            .join(' ');
          h6.textContent = masked;
        });
      }
      maskSameIdH6('maskedName');
    });

    // Open video modal for demo video
    function openVideoModal() {
      const video = document.getElementById('modalVideo');
      video.src = 'static/videos/hitok_video1.mp4';
      video.load();

      $('#videoModal').on('hidden.bs.modal', function () {
        video.pause();
        video.currentTime = 0;
      });

      $('#videoModal').modal('show');
    }
