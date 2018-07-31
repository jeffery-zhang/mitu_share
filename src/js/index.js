import $ from 'jquery'
import get from 'service/get'
import getQuery from 'service/getQuery'
import ImageLayout from 'service/imageLayout'

import './../css/global.scss'
import './../css/index.scss'

$(() => {
  function getWorkInfo() {
    const params = {
      workId: getQuery('id'),
    };

    return get().getWorkInfo(params).then(res => {
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

  getWorkInfo().then(data => {
    console.log(data);
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
      })
    }
  });
    
  $('.cover').click(function() {
    $(this).hide();
  });
});
