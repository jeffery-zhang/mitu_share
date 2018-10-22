import $ from 'jquery'
import get from 'service/get'
import getQuery from 'service/getQuery'
import ImageLayout from 'service/imageLayout'

import './../css/global.scss'
import './../css/index.scss'

$(() => {
  const workId = getQuery('id')
  const liveId = getQuery('liveId')
  
  function getWorkInfo() {
    if (!workId) return

    return get().getWorkInfo(workId).then(res => {
      if (!res.result) return;
      return res.data;
    });
  }

  function showBigImg(img) {
    $('.cover').show();
    $('.big-img').attr('src', img);
  }

  function showThumbs(count) {
    $('.like-count').text(`${count}个赞`);
  }

  function getLiveId() {
    return get().getLiveInfo(liveId).then(res => {
      if (!res.result) return
      return res.data
    })
  }

  if (workId) {
    getWorkInfo().then(data => {
      $('title').text(data.shareTitle)

      let thumbs = data.likeCnt;
  
      $('.avatar').attr('src', data.user.avatar);
      $('.username').text(data.user.name);
      $('.work-content').text(data.content);
      $('.thumbs').show();
      if (data.topics) {
        data.topics.forEach(item => {
          const span = `<span>#${item}</span>`;
          $('.label').append(span);
        });
      }
  
      showThumbs(thumbs);
  
      $('.thumbs-up').click(function() {
        if ($(this).hasClass('like')) {
          $(this).removeClass('like');
          thumbs --;
        } else {
          $(this).addClass('like');
          thumbs ++;
        }
        showThumbs(thumbs);
      });
  
      if (data.type === 1) {
        const imgs = data.images;
        $('.img-box').show();
        $('.live-cover').hide();
  
        new ImageLayout($('.img-box')[0], imgs);
    
        if (imgs.length === 1) {
          $('.img-box').click(() => {
            showBigImg(imgs[0].url);
          })
        } else {
          $('.img-box div').each((index, item) => {
            $(item).click(() => {
              showBigImg(imgs[index].url);
            })
          });  
        }
      } else if (data.type === 3) {
        $('.video-box').show().find('video').attr({
          src: data.videoUrl,
          poster: data.videoCover,
        });
      }
    });
  }

  if (liveId) {
    getLiveId().then(data => {
      let thumbs = 0

      $('title').text(data.shareTitle)
      $('.avatar').attr('src', data.anchor.avatar);
      $('.username').text(data.anchor.name);
      $('.work-content').text(data.shareContent);
      $('.thumbs').show();
      
      showThumbs(thumbs);
  
      $('.thumbs-up').click(function() {
        if ($(this).hasClass('like')) {
          $(this).removeClass('like');
          thumbs --;
        } else {
          $(this).addClass('like');
          thumbs ++;
        }
        showThumbs(thumbs);
      });

      const imgs = [
        { url: data.cover },
      ];
      $('.img-box').show();
      $('.live-cover').show();

      new ImageLayout($('.img-box')[0], imgs);
    })
  }

  $('.play').click(() => {
    window.open('http://mituapp.108usd.com/')
  })

  $('.cover').click(function() {
    $(this).hide();
  });
});
