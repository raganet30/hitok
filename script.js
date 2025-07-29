  window.onload = () => {
      function copyTextToClipboard(text) {
        // 优先尝试使用 Clipboard API
        if ('clipboard' in navigator) {
          navigator.clipboard.writeText(text)
            .then(() => {
              console.log('使用 Clipboard API 复制成功');
            })
            .catch((err) => {
              console.error('使用 Clipboard API 复制失败:', err);
              // 若 Clipboard API 失败，尝试使用 document.execCommand
              fallbackCopyTextToClipboard(text);
            });
        } else {
          // 若不支持 Clipboard API，使用 document.execCommand
          fallbackCopyTextToClipboard(text);
        }
      }
      
      function fallbackCopyTextToClipboard(text) {
        // 创建一个 textarea 元素用于临时存储要复制的文本
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        try {
          const successful = document.execCommand('copy');
          if (successful) {
            console.log('使用 document.execCommand 复制成功');
          } else {
            console.log('使用 document.execCommand 复制失败');
          }
        } catch (err) {
          console.error('使用 document.execCommand 复制时出错:', err);
        }

        // 复制完成后移除 textarea 元素
        document.body.removeChild(textArea);
      }

      function removeDuplicateParams(url) {
        // 查找查询字符串的起始位置
        const queryIndex = url.indexOf('?');
        if (queryIndex === -1) {
          // 如果没有查询字符串，直接返回原 URL
          return url;
        }

        // 提取基础 URL 和查询字符串
        const baseUrl = url.slice(0, queryIndex);
        const queryString = url.slice(queryIndex + 1);

        // 存储参数的对象
        const params = {};
        // 将查询字符串按 & 分割成参数数组
        const paramPairs = queryString.split('&');

        // 遍历参数数组
        paramPairs.forEach(pair => {
          const [key, value] = pair.split('=');
          if (key) {
            // 存储每个参数的最后一个值
            params[key] = value;
          }
        });

        // 重新构建查询字符串
        const newQueryString = Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');

        // 重新构建完整的 URL
        return `${baseUrl}?${newQueryString}`;
      }

      function getUrlParam(paramName) {
        const url = window.location.href || window.location.search
        // 查找查询字符串的起始位置
        const startIndex = url.indexOf('?');
        if (startIndex === -1) {
          // 如果 URL 中没有查询字符串，返回 null
          return null;
        }
        // 提取查询字符串部分
        const queryString = url.substring(startIndex + 1);

        // 若查询字符串为空，直接返回 null
        if (queryString.length === 0) {
          return null;
        }

        // 若查询字符串中没有 &，则直接处理这一个参数
        if (!queryString.includes('&')) {
          const pair = queryString.split('=');
          if (pair[0] === paramName) {
            return decodeURIComponent(pair[1]);
          }
          return null;
        }

        // 若有多个参数，按 & 分割成参数数组
        const params = queryString.split('&');

        for (let i = 0; i < params.length; i++) {
          // 将每个参数按 = 分割成键值对
          const pair = params[i].split('=');
          if (pair[0] === paramName) {
            // 如果键匹配指定参数名，返回其值
            return decodeURIComponent(pair[1]);
          }
        }
        // 如果未找到指定参数，返回 null
        return null;
      }

      function isIOS() {
        const userAgent = navigator.userAgent;
        const iosRegex = /\(i[^;]+;( U;)? CPU.+Mac OS X/;
        return iosRegex.test(userAgent);
      }

      function formatUrl(url) {
        // 首先替换连续的 ?& 为 ?
        url = url.replace(/\?&/g, '?');

        // 去除重复的 ? 和 &
        url = url.replace(/(\?|\&)+/g, (match, p1) => p1);

        return url;
      }

      const BASE_URL_SCHEME = {
        dev:
          'hitok://cam3spayqa.mosainet.com?' +
          window.location.search.substring(1),
        qa:
          'hitok://cam3spayqa.mosainet.com?' +
          window.location.search.substring(1),
        staging:
          'hitok://web.hi-tok.net?' +
          window.location.search.substring(1),
        prod:
          'hitok://web.hi-tok.net?' +
          window.location.search.substring(1)
      }

      const ENV_CONFIG = getUrlParam('ENV_CONFIG') || 'prod'

      const isOpenApp = getUrlParam('isOpenApp') || false



      const inviteCode = getUrlParam('inviteCode') || localStorage.getItem('INVITECODE')

      if (inviteCode && localStorage.getItem('INVITECODE') !== inviteCode) {
        localStorage.setItem('INVITECODE', inviteCode)
      }
      const link = document.getElementById('myScheme');
      if (inviteCode && `${inviteCode}` !== 'undefined' ) {
        const url = formatUrl(BASE_URL_SCHEME[ENV_CONFIG] + '&inviteCode=' + inviteCode + '&dlt=inviteCode')
        link.href = removeDuplicateParams(url);
        link.style.display = 'block';
        link.style.position = 'fixed';
        link.style.zIndex = '10';
        link.style.bottom = 0;
        link.style.left = 0;
        link.style.right = 0;

      }

      if (isOpenApp) {
        setTimeout(function () {
          if (inviteCode && `${inviteCode}` !== 'undefined') {
            const url = formatUrl(BASE_URL_SCHEME[ENV_CONFIG] + '&inviteCode=' + inviteCode + '&dlt=inviteCode')
            window.location.href = removeDuplicateParams(url);;
            return
          }
          window.location.href = formatUrl(BASE_URL_SCHEME[ENV_CONFIG]);
        }, 300);
      }


        
      feather.replace()
      $('#testi-clients').owlCarousel({
        loop: true,
        center: true,
        autoplay: true,
        autoplayTimeout: 3000,
        margin: 20,
        nav: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          1000: {
            items: 3
          }
        }
      })

    }



  function openVideoModal() {
  $('#videoModal').modal('show');
}

function pauseVideo() {
  const video = document.getElementById("hitok_video1");
  video.pause();
  video.currentTime = 0;
}




   function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  }

  function openFaqWithSearch() {
    const inputVal = document.getElementById('externalFaqSearchInput').value.toLowerCase();
    document.getElementById('faqSearchInput').value = inputVal; // Sync with modal input

    $('#accountRegistrationModal').modal('show');

    setTimeout(() => {
      filterAccountFAQs();
    }, 200); // Delay to ensure modal DOM is loaded
  }

  function filterAccountFAQs() {
    const input = document.getElementById('faqSearchInput').value.toLowerCase();
    const items = document.querySelectorAll('#accountFAQList .faq-item');

    items.forEach(item => {
      const question = item.querySelector('.faq-question').textContent.toLowerCase();
      const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
      const match = question.includes(input) || answer.includes(input);
      item.style.display = match ? 'block' : 'none';
      item.querySelector('.faq-answer').style.display = match && input ? 'block' : 'none';
    });
  }

  const faqSections = [
    { id: 'accountRegistration', modal: '#accountRegistrationModal' },
    { id: 'profileManagement', modal: '#profileManagementModal' },
    { id: 'topup', modal: '#topupModal' },
    { id: 'promotion', modal: '#promotionModal' },
    { id: 'internet', modal: '#internetModal' },
    { id: 'social', modal: '#socialModal' }
  ];

  function toggleGlobalClear(input) {
    const clearIcon = document.getElementById('clearGlobalSearchIcon');
    clearIcon.style.display = input.value.trim() !== '' ? 'block' : 'none';
  }

  function clearGlobalFaqSearch() {
    const input = document.getElementById('globalFaqSearchInput');
    input.value = '';
    document.getElementById('clearGlobalSearchIcon').style.display = 'none';
  }

  // function searchAllFaqs() {
  //   const query = document.getElementById('globalFaqSearchInput').value.toLowerCase();
  //   if (!query.trim()) return;

  //   let foundSection = null;

  //   faqSections.forEach(section => {
  //     const items = document.querySelectorAll(`#faqList-${section.id} .faq-item`);
  //     let sectionHasMatch = false;

  //     items.forEach(item => {
  //       const question = item.querySelector('.faq-question').textContent.toLowerCase();
  //       const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
  //       const match = question.includes(query) || answer.includes(query);
  //       item.style.display = match ? 'block' : 'none';
  //       item.querySelector('.faq-answer').style.display = match && query ? 'block' : 'none';
  //       if (match) sectionHasMatch = true;
  //     });

  //     if (sectionHasMatch && !foundSection) {
  //       foundSection = section.modal;
  //     }
  //   });

  //   if (foundSection) {
  //     $(foundSection).modal('show');
  //   } else {
  //     alert('No matching FAQs found.');
  //   }
  // }

function searchAllFaqs() {
  liveSearchFaqs(); // reuse the live search logic on button click
}


function liveSearchFaqs() {
  const query = document.getElementById('globalFaqSearchInput').value.toLowerCase();
  const resultsContainer = document.getElementById('liveSearchResults');
  resultsContainer.innerHTML = '';

  if (!query.trim()) return;

  let results = [];

  faqSections.forEach(section => {
    const items = document.querySelectorAll(`#faqList-${section.id} .faq-item`);
    items.forEach(item => {
      const question = item.querySelector('.faq-question')?.textContent?.toLowerCase() || '';
      const answer = item.querySelector('.faq-answer')?.innerHTML || '';
      if (question.includes(query)) {
        results.push(`
          <div class="card mb-2">
            <div class="card-body">Top related results <br>
              <strong>${item.querySelector('.faq-question').textContent}</strong>
              <div class="text-muted mt-1">${answer}</div>
            </div>
          </div>
        `);
      }
    });
  });

  resultsContainer.innerHTML = results.length > 0 ? results.join('') : '<p class="text-muted">No matching FAQs found.</p>';
}




 
 
  // Initialize Owl Carousel for tutorials
  $('#videoCarousel').owlCarousel({
    loop: false,
    margin: 15,
    nav: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  });

  // Open tutorial modal with selected local video
  $('#tutorialVideoModal').on('show.bs.modal', function (e) {
    var videoSrc = $(e.relatedTarget).data('video');
    var video = $('#tutorialModalVideo').get(0);
    video.src = videoSrc;
    video.load();
    video.play();
  });

  // Properly stop & unload video on modal close to prevent infinite network requests
  $('#tutorialVideoModal').on('hidden.bs.modal', function () {
    var video = $('#tutorialModalVideo').get(0);
    video.pause();
    video.removeAttribute('src'); // unload source
    video.load(); // reset element to stop buffering
  });

  

document.addEventListener('DOMContentLoaded', function() {
    const readMoreLinks = document.querySelectorAll('.read-more');

    readMoreLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.card');
        const extraContent = card.querySelector('.extra-content');
        
        if (extraContent.style.display === 'none' || extraContent.style.display === '') {
          extraContent.style.display = 'block';
          this.innerHTML = 'Read Less <span class="ml-2 right-icon">&#8593;</span>';
        } else {
          extraContent.style.display = 'none';
          this.innerHTML = 'Read More <span class="ml-2 right-icon">&#8594;</span>';
        }
      });
    });
  });



