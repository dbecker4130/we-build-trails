'use strict';

require('./_banner.scss');

module.exports = {
  template: require('./banner.html'),
  controller: ['$log', BannerController],
  controllerAs: 'bannerCtrl'
};

function BannerController($log) {
  $log.debug('bannerCtrl()');

  function circularText(txt, radius, classIndex) {
    txt= txt.split(''),
    classIndex = document.getElementsByClassName('circTxt')[classIndex];

    var deg = 90 / txt.length,
      origin = -45;

    txt.forEach((ea) => {
      ea = `<p style='height: ${radius}%;
                      position: absolute;
                      transform: rotate(${origin}deg);
                      transform-origin: 0 10vw'>${ea}</p>`;
      classIndex.innerHTML += ea;
      origin += deg;
    });
  }

  function inverseCircle(txt, radius, classIndex) {
    txt= txt.split(''),
    classIndex = document.getElementsByClassName('bottomTxt')[classIndex];

    var deg = -95 / txt.length,
      origin = 45;

    txt.forEach((ea) => {
      ea = `<p style='height: ${radius}%;
                      position: absolute;
                      transform: rotate(${origin}deg);
                      transform-origin: 0 -10vw'>${ea}</p>`;
      classIndex.innerHTML += ea;
      origin += deg;
    });
  }

  circularText('THE TRAILS BLOG', 200, 0);
  inverseCircle('SCOOP, PACK, SMEAR, RIDE', 200, 0);
}
